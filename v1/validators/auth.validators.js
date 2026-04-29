import Joi from "joi";

export const registroSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser una cadena de texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe ser un correo electrónico válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "La contraseña debe ser una cadena de texto",
    "string.empty": "La contraseña no puede estar vacía",
    "string.min": "La contraseña debe tener al menos {#limit} caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
  confirmedPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Las contraseñas deben coincidir",
    }),
  nombreCompleto: Joi.object({
    nombre: Joi.string().max(50).required().messages({
      "string.base": "El nombre debe ser una cadena de texto",
      "string.empty": "El nombre no puede estar vacío",
      "string.max": "El nombre no puede exceder los {#limit} caracteres",
      "any.required": "El nombre es obligatorio",
    }),
    apellido: Joi.string().max(50).required().messages({
      "string.base": "El apellido debe ser una cadena de texto",
      "string.empty": "El apellido no puede estar vacío",
      "string.max": "El apellido no puede exceder los {#limit} caracteres",
      "any.required": "El apellido es obligatorio",
    }),
  })
    .required()
    .messages({
      "any.required": "El nombre completo es obligatorio",
    }),
  rol: Joi.string().valid("vendedor", "comprador").required().messages({
    "string.base": "El rol debe ser una cadena de texto",
    "string.empty": "El rol no puede estar vacío",
    "any.only": "El rol debe ser 'vendedor' o 'comprador'",
    "any.required": "El rol es obligatorio",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser una cadena de texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe ser un correo electrónico válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "La contraseña debe ser una cadena de texto",
    "string.empty": "La contraseña no puede estar vacía",
    "string.min": "La contraseña debe tener al menos {#limit} caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
});
