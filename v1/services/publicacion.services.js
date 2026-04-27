import Publicacion from "../models/publicacion.model.js";
import Usuario from "../models/usuario.model.js";
import Oferta from "../models/oferta.model.js";
import axios from "axios";
import { isValidObjectId } from "mongoose";
import { generarBiografiaService } from "./ai.services.js";

export const obtenerPublicacionesService = async ({ filtro }) => {
  const publicaciones = await Publicacion.find(filtro)
    .populate("tipoObra")
    .populate("ganador", "nombre email");
  if (publicaciones.length === 0) {
    const error = new Error("No se encontraron publicaciones");
    error.status = 404;
    throw error;
  }
  return publicaciones;
};

export const obtenerPublicacionPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    throw error;
  }

  const publicacion = await Publicacion.findById(id)
    .populate("tipoObra")
    .populate("ganador", "nombre email")
    .populate("vendedor", "nombre email");
  if (!publicacion) {
    const error = new Error("No se encontró la publicación");
    error.status = 404;
    throw error;
  }
  return publicacion;
};

export const crearPublicacionService = async (data, usuarioId) => {
  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }

  //necesario? siempre va a haber; esta logueado
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    const error = new Error("No se encontró el usuario");
    error.status = 404;
    error.details = { id: usuarioId };
    throw error;
  }

  const cantPublicacionesUsuario = await Publicacion.countDocuments({
    vendedor: usuarioId,
  });
  if (usuario.subscripcion !== "premium" && cantPublicacionesUsuario >= 4) {
    const error = new Error(
      "El usuario ha alcanzado el límite de publicaciones para su plan. Actualice a premium para publicar más obras.",
    );
    error.status = 403;
    throw error;
  }

  //tenemos que validar el id auqnue ya lo hagamos en el validator, porque si no, si el id no es valido,
  //se rompe todo antes de poder seguir
  const id = data?.obra?.id;

  if (!id) {
    const error = new Error("obra.id es requerido");
    error.status = 400;
    throw error;
  }

  const existePublicacionConObra = await Publicacion.exists({
    "obra.id": id,
    estado: { $in: ["activa", "finalizada", "pausada"] },
  });
  if (existePublicacionConObra) {
    const error = new Error(
      `Ya existe una publicación activa, finalizada o pausada para la obra con ID ${id}`,
    );
    error.status = 409;
    error.details = { id };
    throw error;
  }

  let obraApi;
  try {
    obraApi = await axios.get("https://api.artic.edu/api/v1/artworks/" + id);
  } catch (err) {
    const status = err.response?.status;

    if (status === 400) {
      const error = new Error(
        `El ID de la obra (${id}) no es válido. Debe ser un número entero.`,
      );
      error.status = 400;
      error.details = { id };
      throw error;
    }

    if (status === 404) {
      const error = new Error(`No se encontró ninguna obra con el ID ${id}.`);
      error.status = 404;
      error.details = { id };
      throw error;
    }
  }

  if (!obraApi.data?.data) {
    const error = new Error("La obra no existe en la API");
    error.status = 404;
    error.details = { id };
    throw error;
  }

  const obraApiData = obraApi.data.data;
  data.obra = {
    ...data.obra,
    titulo: obraApiData.title || "Sin titulo",
    artista: obraApiData.artist_title || "Artista desconocido",
    imagenId: obraApiData.image_id || undefined,
  };
  data.vendedor = usuarioId;

  const bio = await generarBiografiaService(
    data.obra.artista,
    data.obra.titulo,
  );
  data.obra.biografia = bio ? bio : null;
  const nuevaPublicacion = new Publicacion(data);

  return await nuevaPublicacion.save();
};

/* para acceder a la info de lo que traermos de la api, hacemos .data.
los campos son title, artist_title, classification_title, image_id,  iiif_url dentro
de config.
*/

//que pasa con las ofertas para una publicacion cuando la eliminamos?
//se eliminan tambien? de la coleccion
export const eliminarPublicacionService = async (id) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    error.details = { id: id };
    throw error;
  }

  const publicacionEliminada = await Publicacion.findByIdAndDelete(id);
  if (!publicacionEliminada) {
    const error = new Error("No se encontró la publicación a eliminar");
    error.status = 404;
    error.details = { id: id };
    throw error;
  }

  return publicacionEliminada;
};

export const modificarPublicacionService = async (id, dataActualizada) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    error.details = { id: id };
    throw error;
  }

  const publicacionAModificar = await Publicacion.findById(id);
  if (!publicacionAModificar) {
    const error = new Error("No se encontró la publicación a modificar");
    error.status = 404;
    error.details = { id: id };
    throw error;
  }
  if (
    publicacionAModificar.estado === "finalizada" ||
    publicacionAModificar.estado === "cancelada"
  ) {
    const error = new Error(
      "No se puede modificar una publicación finalizada o cancelada",
    );
    error.status = 400;
    throw error;
  }

  const publicacionModificada = await Publicacion.findByIdAndUpdate(
    id,
    dataActualizada,
    { returnDocument: "after" },
  );
  return publicacionModificada;
};

export const finalizarPublicacionService = async (id) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    error.details = { id: id };
    throw error;
  }
  //ordenamos las ofertas de forma descendente por el monto y tomamos la primera
  //es decir, la oferta con el monto mas alto, que es la ganadora
  const ofertas = await Oferta.find({ publicacion: id })
    .sort({ monto: -1 })
    .limit(1);
  const ofertaGanadora = ofertas[0];
  const publicacionFinalizada = await Publicacion.findByIdAndUpdate(
    id,
    {
      //si la publicacion no tuvo ninguna oferta en lugar de finalizarla la tomamos como cancelada
      estado: ofertaGanadora ? "finalizada" : "cancelada",
      ganador: ofertaGanadora ? ofertaGanadora.usuario : null,
    },
    { returnDocument: "after" },
  );
  return publicacionFinalizada.populate("ganador", "nombre email");
};
