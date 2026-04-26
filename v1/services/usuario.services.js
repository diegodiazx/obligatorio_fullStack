import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.model.js";

export const actualizarPlanPremiumService = async (usuarioId) => {
  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato invalido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }

  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    const error = new Error("No se encontro el usuario");
    error.status = 404;
    error.details = { id: usuarioId };
    throw error;
  }

  //esto ya lo chequeamos en la ruta con el middleware de acceso; va igual o no?
  if (usuario.rol !== "vendedor") {
    const error = new Error("Solo los vendedores pueden cambiar su plan");
    error.status = 403;
    throw error;
  }

  if (usuario.subscripcion === "premium") {
    const error = new Error("El usuario ya tiene plan premium");
    error.status = 409;
    throw error;
  }

  usuario.subscripcion = "premium";
  await usuario.save();

  return {
    id: usuario._id,
    email: usuario.email,
    rol: usuario.rol,
    subscripcion: usuario.subscripcion,
  };
};
