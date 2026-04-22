import {
    registrarUsuarioService,
    ingresarUsuarioService,
} from "../services/auth.services.js";

export const registrarUsuario = async (req, res) => {
    const nuevoUsuario = await registrarUsuarioService(req.validatedBody);
    res.status(201).json({ mensaje: "Usuario registrado exitosamente", usuario: nuevoUsuario });
}

export const ingresarUsuario = async (req, res) => {
    const { email, password } = req.body;
    const resultado = await ingresarUsuarioService(email, password);
    res.status(200).json({ mensaje: "Ingreso exitoso", ...resultado });
}