import { crearOfertaService } from "../services/oferta.services.js";

export const crearOferta = async (req, res) => {
  const { publicacionId } = req.params;
  const { monto } = req.body;
  const usuarioId = req.user.id;
  const nuevaOferta = await crearOfertaService(monto, usuarioId, publicacionId);
  res
    .status(201)
    .json({ mensaje: "Oferta creada exitosamente", oferta: nuevaOferta });
};
