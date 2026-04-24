import {
  obtenerPublicacionesService,
  crearPublicacionService,
  obtenerPublicacionPorIdService,
  modificarPublicacionService,
  eliminarPublicacionService,
} from "../services/publicacion.services.js";

export const obtenerPublicacionesService = async (req, res) => {
  const publicaciones = await obtenerPublicacionesService();
  res.status(200).json(publicaciones);
};

export const obtenerPublicacionPorId = async (req, res) => {
  const { id } = req.params;
  const publicacion = await obtenerPublicacionPorIdService(id);
  res.status(200).json(publicacion);
};

export const crearPublicacion = async (req, res) => {
  const nuevaPublicacion = await crearPublicacionService(req.validatedBody);
  res.status(201).json(nuevaPublicacion);
};

export const modificarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionModificada = await modificarPublicacionService(
    id,
    req.validatedBody,
  );
  res.status(200).json(publicacionModificada);
};

export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionEliminada = await eliminarPublicacionService(id);
  res.status(200).json(publicacionEliminada);
};
