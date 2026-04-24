import Publicacion from "../models/publicacion.model.js";
import axios from "axios";

export const obtenerPublicacionesService = async () => {
  const publicaciones = await Publicacion.find()
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
    .populate("ganador", "nombre email");
  if (!publicacion) {
    const error = new Error("No se encontró la publicación");
    error.status = 404;
    throw error;
  }
  return publicacion;
};

export const crearPublicacionService = async (data) => {
  const {
    obra: { id },
  } = data;
  const obraApi = await axios.get(
    "https://api.artic.edu/api/v1/artworks/" + id,
  );

  data.obra.titulo = obraApi.data.data.title;
  data.obra.artista = obraApi.data.data.artist_title;
  data.obra.imagenId = obraApi.data.data.image_id;

  const nuevaPublicacion = new Publicacion(data);

  return await nuevaPublicacion.save();
};

/* para acceder a la info de lo que traermos de la api, hacemos .data.
los campos son title, artist_title, classification_title, image_id,  iiif_url dentro
de config.
*/

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

  const publicacionModificada = await Publicacion.findByIdAndUpdate(
    id,
    dataActualizada,
    { returnDocument: "after" },
  );
  if (!publicacionModificada) {
    const error = new Error("No se encontró la publicación a modificar");
    error.status = 404;
    error.details = { id: id };
    throw error;
  }

  return publicacionModificada;
};
