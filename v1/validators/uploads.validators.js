import Joi from "joi";

export const subirImagenSchema = Joi.object({
  imagen: Joi.string().uri().required().messages({
    "string.base": "La imagen debe ser una cadena de texto",
    "string.empty": "La imagen no puede estar vacía",
    "string.uri": "La imagen debe ser una URL válida",
    "any.required": "La imagen es obligatoria",
  }),
});
