import Oferta from "../models/oferta.model.js";
import Usuario from "../models/usuario.model.js";
import { isValidObjectId } from "mongoose";
import Publicacion from "../models/publicacion.model.js";

export const crearOfertaService = async (monto, usuarioId, publicacionId) => {
  if (!isValidObjectId(usuarioId)) {
    const error = new Error("ID de usuario con formato inválido");
    error.status = 400;
    error.details = { id: usuarioId };
    throw error;
  }

  //siempre va a existir, esta logueado ??
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    const error = new Error("No se encontró el usuario");
    error.status = 404;
    throw error;
  }

  if (!isValidObjectId(publicacionId)) {
    const error = new Error("ID de publicación con formato inválido");
    error.status = 400;
    error.details = { id: publicacionId };
    throw error;
  }

  const publicacion = await Publicacion.findById(publicacionId);
  if (!publicacion) {
    const error = new Error("No se encontró la publicación");
    error.status = 404;
    throw error;
  }

  //solo se puede hacer una ofterta si la publicacion esta activa
  if (publicacion.estado !== "activa") {
    const error = new Error(
      "No se puede hacer una oferta en una publicación no activa",
    );
    error.status = 400;
    throw error;
  }
  const nuevaOferta = new Oferta({
    usuario: usuarioId,
    publicacion: publicacionId,
    monto: monto,
  });
  await nuevaOferta.save();
  return nuevaOferta;
};
