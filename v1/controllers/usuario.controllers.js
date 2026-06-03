import {
  actualizarPlanPremiumService,
  obtenerUsuarioPorIdService,
} from "../services/usuario.services.js";

export const actualizarPlanPremium = async (req, res) => {
  const usuarioActualizado = await actualizarPlanPremiumService(req.user.id);
  res.status(200).json({
    mensaje: "Plan actualizado a premium",
    usuario: usuarioActualizado,
  });
};

export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuario = await obtenerUsuarioPorIdService(id);
  res.status(200).json({ mensaje: "Usuario encontrado", usuario });
};
