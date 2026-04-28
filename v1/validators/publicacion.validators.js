import Joi from "joi";

export const crearPublicacionSchema = Joi.object({
  obra: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "El ID de la obra debe ser una cadena de texto",
      "string.empty": "El ID de la obra no puede estar vacío",
      "any.required": "El ID de la obra es obligatorio",
    }),
  })
    .required()
    .messages({
      "object.base": "La obra debe ser un objeto",
      "object.empty": "La obra no puede estar vacía",
      "any.required": "La obra es obligatoria",
    }),
  precioBase: Joi.number().positive().required().messages({
    "number.base": "El precio base debe ser un número",
    "number.positive": "El precio base debe ser un número positivo",
    "number.empty": "El precio base no puede estar vacío",
    "any.required": "El precio base es obligatorio",
  }),
  donacion: Joi.boolean().required().messages({
    "boolean.base": "El campo de donación debe ser un valor booleano",
    "boolean.empty": "El campo de donación no puede estar vacío",
    "any.required": "El campo de donación es obligatorio",
  }),
  tipoObra: Joi.string().required().messages({
    "string.base": "El tipo de obra debe ser una cadena de texto",
    "string.empty": "El tipo de obra no puede estar vacío",
    "any.required": "El tipo de obra es obligatorio",

  }),
  estado: Joi.string().valid("activa", "pausada").required().messages({
    "string.base": "El estado debe ser una cadena de texto",
    "string.empty": "El estado no puede estar vacío",
    "any.only": "El estado debe ser 'activa' o 'pausada'",
    "any.required": "El estado es obligatorio",
  }),
});

export const modificarPublicacionSchema = Joi.object({
  donacion: Joi.boolean().messages({
    "boolean.base": "El campo de donación debe ser un valor booleano",
    "boolean.empty": "El campo de donación no puede estar vacío",
  }),
  //formato de ObjectId de MongoDB: 24 caracteres hexadecimales
  tipoObra: Joi.string().hex().length(24).messages({
    "string.base": "El tipo de obra debe ser una cadena de texto",
    "string.empty": "El tipo de obra no puede estar vacío",
  }),
  estado: Joi.string()
    .valid("activa", "pausada", "cancelada", "finalizada")
    .messages({
      "string.base": "El estado debe ser una cadena de texto",
      "string.empty": "El estado no puede estar vacío",
      "any.only":
        "El estado debe ser 'activa', 'pausada', 'cancelada' o 'finalizada'",
    }),
});
