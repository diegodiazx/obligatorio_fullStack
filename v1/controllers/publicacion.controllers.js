import {
  obtenerPublicacionesService,
  crearPublicacionService,
  obtenerPublicacionPorIdService,
  modificarPublicacionService,
  eliminarPublicacionService,
} from "../services/publicacion.services.js";

export const obtenerPublicaciones = async (req, res) => {
  const filtro = {};

  //?? no hay otra forma de filtrar sin tener que definir todo aca
  if (req.query.estado) filtro.estado = req.query.estado;
  // if (req.query.tipoObra) filtro["tipoObra._id"] = req.query.tipoObra;
  if (req.query.vendedor) filtro.vendedor = req.query.vendedor;
  if (req.query.titulo) filtro.titulo = req.query.titulo;
  if (req.query.artista) filtro.artista = req.query.artista;

  const publicaciones = await obtenerPublicacionesService({ filtro });
  res.status(200).json(publicaciones);
};

export const obtenerPublicacionPorId = async (req, res) => {
  const { id } = req.params;
  const publicacion = await obtenerPublicacionPorIdService(id);
  res.status(200).json(publicacion);
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
  );
  res.status(200).json({
    mensaje: "Publicación modificada exitosamente",
    data: publicacionModificada,
  });
};

export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacionEliminada = await eliminarPublicacionService(id);
  res.status(200).json({
    mensaje: "Publicación eliminada exitosamente",
    data: publicacionEliminada,
  });
};
