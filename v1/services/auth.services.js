import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (datosUsuario) => {
  const {
    email,
    password,
    nombreCompleto: { nombre, apellido },
    rol,
  } = datosUsuario;
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    const error = new Error("El email ya está registrado");
    error.status = 409;
    throw error;
  }

  const subscripcion = rol === "vendedor" ? "plus" : undefined; // Solo los vendedores pueden tener suscripción

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS),
  );
  const nuevoUsuario = new Usuario({
    email,
    password: hashedPassword,
    nombreCompleto: { nombre, apellido },
    rol,
    subscripcion,
  });
  await nuevoUsuario.save();

  return nuevoUsuario;
};

export const ingresarUsuarioService = async (email, password) => {
  //me fijo si existe el usuario con ese email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Email incorrecto");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compareSync(password, usuario.password);
  if (!valid) {
    const error = new Error("Contraseña incorrecta");
    error.status = 401;
    throw error;
  }
  //si el usuario existe y el password es correcto, genero un token con jwt
  //guardando la info del id, email y rol para poder chequear
  const token = jwt.sign(
    { id: usuario._id, email: usuario.email, rol: usuario.rol },
    process.env.SECRET_JWT,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: { id: usuario._id, email: usuario.email, rol: usuario.rol },
  };
};
