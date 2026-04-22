import Joi from "joi";

export const tipoObraSchema = Joi.object({
    nombre: Joi.string().max(50).required().messages({
        "string.base": "El nombre debe ser una cadena de texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.max": "El nombre no puede exceder los {#limit} caracteres"
    }),
});