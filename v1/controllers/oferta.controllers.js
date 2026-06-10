import {
  crearOfertaService,
  obtenerOfertasPorPublicacionService,
  obtenerMiOfertaPorPublicacionService,
  obtenerMisOfertasService,
} from "../services/oferta.services.js";

export const crearOferta = async (req, res) => {
  const { publicacionId } = req.params;
  const { monto } = req.body;
  const usuarioId = req.user.id;
  const nuevaOferta = await crearOfertaService(monto, usuarioId, publicacionId);
  res
    .status(201)
    .json({ mensaje: "Oferta creada exitosamente", oferta: nuevaOferta });
};

export const obtenerOfertasPorPublicacion = async (req, res) => {
  const { publicacionId } = req.params;
  const ofertas = await obtenerOfertasPorPublicacionService(publicacionId);
  res.status(200).json({ mensaje: "Ofertas obtenidas exitosamente", ofertas });
};

export const obtenerMiOfertaPorPublicacion = async (req, res) => {
  const { publicacionId } = req.params;
  const usuarioId = req.user.id;
  const oferta = await obtenerMiOfertaPorPublicacionService(
    publicacionId,
    usuarioId,
  );
  res.status(200).json({ mensaje: "Oferta obtenida exitosamente", oferta });
};

export const obtenerMisOfertas = async (req, res) => {
  const usuarioId = req.user.id;
  const ofertas = await obtenerMisOfertasService(usuarioId);
  res
    .status(200)
    .json({ mensaje: "Mis ofertas obtenidas exitosamente", ofertas });
};
