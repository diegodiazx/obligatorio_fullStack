import {
  obtenerPublicacionesService,
  crearPublicacionService,
  obtenerPublicacionPorIdService,
  modificarPublicacionService,
  eliminarPublicacionService,
  misPublicacionesService,
  finalizarPublicacionService,
} from "../services/publicacion.services.js";

export const obtenerPublicaciones = async (req, res) => {
  const { page, limit } = req.query;
  const filtro = {};
  if (req.query.estado) filtro.estado = req.query.estado;
  if (req.query.tipoObra) filtro.tipoObra = req.query.tipoObra;
  if (req.query.titulo)
    filtro["obra.titulo"] = {
      $regex: req.query.titulo,
      $options: "i",
    };
  if (req.query.artista)
    filtro["obra.artista"] = {
      $regex: req.query.artista,
      $options: "i",
    };

  const resultado = await obtenerPublicacionesService({
    filtro,
    page,
    limit,
  });
  res.status(200).json({ mensaje: "Publicaciones obtenidas exitosamente", data: resultado.publicaciones, paginas: resultado.paginas, page: resultado.page, limit: resultado.limit });
};

export const obtenerPublicacionPorId = async (req, res) => {
  const { id } = req.params;
  const publicacion = await obtenerPublicacionPorIdService(id);
  res.status(200).json({ mensaje: "Publicación obtenida exitosamente", data: publicacion });
};

export const misPublicaciones = async (req, res) => {
  const usuarioId = req.user.id;
  const publicaciones = await misPublicacionesService(usuarioId);
  res.status(200).json({
    mensaje: "Publicaciones obtenidas exitosamente",
    data: publicaciones,
  });
};

export const crearPublicacion = async (req, res) => {
  const nuevaPublicacion = await crearPublicacionService(
    req.validatedBody,
    req.user.id,
  );

  res.status(201).json({
    mensaje: "Publicación creada exitosamente",
    data: nuevaPublicacion,
  });
};

export const modificarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionModificada = await modificarPublicacionService(
    id,
    req.validatedBody,
    req.user.id
  );
  res.status(200).json({
    mensaje: "Publicación modificada exitosamente",
    data: publicacionModificada,
  });
};

export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionEliminada = await eliminarPublicacionService(id, req.user.id);
  res.status(200).json({
    mensaje: "Publicación eliminada exitosamente",
    data: publicacionEliminada,
  });
};

export const finalizarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionFinalizada = await finalizarPublicacionService(id, req.user.id);
  res.status(200).json({
    mensaje: "Publicación finalizada exitosamente",
    data: publicacionFinalizada,
  });
};
