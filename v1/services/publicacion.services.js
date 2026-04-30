import Publicacion from "../models/publicacion.model.js";
import Usuario from "../models/usuario.model.js";
import Oferta from "../models/oferta.model.js";
import TipoObra from "../models/tipoObra.model.js";
import axios from "axios";
import { isValidObjectId } from "mongoose";
import { generarBiografiaService } from "./ai.services.js";

export const obtenerPublicacionesService = async ({ filtro, page, limit }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 3;
  const skip = (page - 1) * limit;
  const cantidadPublicaciones = await Publicacion.countDocuments(filtro);
  //cant de paginas totales
  const paginas = Math.ceil(cantidadPublicaciones / limit);
  console.log("FILTRO:", filtro);
  const publicaciones = await Publicacion.find(filtro)
    .populate("tipoObra")
    .populate("ganador", "nombre email")
    .populate("vendedor", "nombre email")
    .populate("ultimaOferta")
    .skip(skip)
    .limit(limit);

  if (publicaciones.length === 0) {
    const error = new Error("No se encontraron publicaciones");
    error.status = 404;
    throw error;
  }
  return { publicaciones, paginas, page, limit };
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
    .populate("vendedor", "nombre email")
    .populate("ultimaOferta", "monto usuario");
  if (!publicacion) {
    const error = new Error("No se encontró la publicación");
    error.status = 404;
    throw error;
  }
  return publicacion;
};

export const misPublicacionesService = async (usuarioId, page, limit) => {
  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }

  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    const error = new Error("No se encontró el usuario");
    error.status = 404;
    error.details = { id: usuarioId };
    throw error;
  }

  page = Number(page) || 1;
  limit = Number(limit) || 3;
  const skip = (page - 1) * limit;

  if (usuario.rol === "vendedor") {
    const publicaciones = await Publicacion.find({ vendedor: usuarioId })
      .populate("tipoObra")
      .populate("ganador", "nombre email")
      .populate("vendedor", "nombre email")
      .populate("ultimaOferta", "monto usuario")
      .skip(skip)
      .limit(limit);
    const cantidadPublicaciones = publicaciones.length;
    //cant de paginas totales
    const paginas = Math.ceil(cantidadPublicaciones / limit);
    return { publicaciones, paginas, page, limit };
  } else if (usuario.rol === "comprador") {
    const publicacionesIds = await Oferta.distinct("publicacion", {
      usuario: usuarioId,
    });
    const publicaciones = await Publicacion.find({
      _id: { $in: publicacionesIds },
    })
      .populate("tipoObra")
      .populate("ganador", "nombre email")
      .skip(skip)
      .limit(limit);
    const cantidadPublicaciones = publicaciones.length;
    //cant de paginas totales
    const paginas = Math.ceil(cantidadPublicaciones / limit);
    return { publicaciones, paginas, page, limit };
  } else {
    //?? esto no deberia pasar porque el rol lo validamos en el registro, pero por las dudas
    const error = new Error("Rol de usuario no válido");
    error.status = 400;
    throw error;
  }
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

  const tipoObra = await TipoObra.findById(data.tipoObra);
  if (!tipoObra) {
    const error = new Error("No se encontró el tipo de obra especificado");
    error.status = 404;
    error.details = { id: data.tipoObra };
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

export const eliminarPublicacionService = async (id, usuarioId) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    error.details = { id: id };
    throw error;
  }

  const publicacionAEliminar = await Publicacion.findById(id);
  if (!publicacionAEliminar) {
    const error = new Error("No se encontró la publicación a eliminar");
    error.status = 404;
    error.details = { id: id };
    throw error;
  }

  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }
  if (publicacionAEliminar.vendedor.toString() !== usuarioId) {
    const error = new Error(
      "La publicación solo puede ser eliminada por su vendedor",
    );
    error.status = 403;
    throw error;
  }

  await Publicacion.deleteOne({ _id: id });

  //eliminamos todas las ofertas relacionadas a esa publicacion
  await Oferta.deleteMany({ publicacion: id });

  return publicacionAEliminar;
};

export const modificarPublicacionService = async (
  id,
  dataActualizada,
  usuarioId,
) => {
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

  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }
  if (publicacionAModificar.vendedor.toString() !== usuarioId) {
    const error = new Error(
      "La publicación solo puede ser modificada por su vendedor",
    );
    error.status = 403;
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

export const finalizarPublicacionService = async (id, usuarioId) => {
  if (!isValidObjectId(id)) {
    const error = new Error("ID con formato inválido");
    error.status = 400;
    error.details = { id: id };
    throw error;
  }

  const publicacion = await Publicacion.findById(id).populate(
    "ultimaOferta",
    "monto usuario",
  );

  if (!publicacion) {
    const error = new Error("No se encontró la publicación a finalizar");
    error.status = 404;
    throw error;
  }

  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }
  if (publicacion.vendedor.toString() !== usuarioId) {
    const error = new Error(
      "La publicación solo puede ser finalizada por su vendedor",
    );
    error.status = 403;
    throw error;
  }

  if (publicacion.estado !== "activa") {
    const error = new Error("Solo se pueden finalizar publicaciones activas");
    error.status = 400;
    throw error;
  }

  const ofertaGanadora = publicacion.ultimaOferta
    ? publicacion.ultimaOferta
    : null;

  publicacion.estado = ofertaGanadora ? "finalizada" : "cancelada";
  publicacion.ganador = ofertaGanadora ? ofertaGanadora.usuario : null;

  await publicacion.save();
  return await publicacion.populate("ganador", "nombre email");
};
