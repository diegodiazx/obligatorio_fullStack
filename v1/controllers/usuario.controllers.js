import { actualizarPlanPremiumService } from "../services/usuario.services.js";

export const actualizarPlanPremium = async (req, res) => {
  const usuarioActualizado = await actualizarPlanPremiumService(req.user.id);
  res.status(200).json({
    mensaje: "Plan actualizado a premium",
    usuario: usuarioActualizado,
  });
};
