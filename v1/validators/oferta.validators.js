import Joi from "joi";

export const crearOfertaSchema = Joi.object({
  monto: Joi.number().positive().required().messages({
    "number.base": "El monto debe ser un número",
    "number.positive": "El monto debe ser un número positivo",
    "number.empty": "El monto no puede estar vacío",
    "any.required": "El monto es obligatorio",
  }),
});
