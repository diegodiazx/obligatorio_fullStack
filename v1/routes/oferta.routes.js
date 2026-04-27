import express from "express";
import { crearOferta } from "../controllers/oferta.controllers.js";
import { crearOfertaSchema } from "../validators/oferta.validators.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/publicacion/:publicacionId",
  validateBodyMiddleware(crearOfertaSchema),
  crearOferta,
);

export default router;
