import Publicacion from "../models/publicacion.model.js";
import axios from "axios";
import { isValidObjectId } from "mongoose";

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
  const {obra: {id}} = data;

  let obraApi;
  try {
    obraApi = await axios.get("https://api.artic.edu/api/v1/artworks/" + id);
  } catch (err) {
    if (err.response?.status === 404) {
      const error = new Error("La obra no existe en la API");
      error.status = 404;
      error.details = { id };
      throw error;
    }
    throw err;
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
