import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.model.js";

export const subirFotoPerfilService = async (usuarioId, urlFoto) => {
    if (!isValidObjectId(usuarioId)) {
        const error = new Error("ID de usuario inválido");
        error.status = 400;
        throw error;
    }
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        error.details = { usuarioId: usuarioId };
    throw error;
  }

  usuario.urlFotoPerfil = urlFoto;
  return await usuario.save();
};