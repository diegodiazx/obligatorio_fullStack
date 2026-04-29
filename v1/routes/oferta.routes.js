import express from "express";
import { crearOferta, obtenerOfertasPorPublicacion } from "../controllers/oferta.controllers.js";
import { crearOfertaSchema } from "../validators/oferta.validators.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { accessMiddleware } from "../middlewares/access.middleware.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/publicacion/:publicacionId",
  accessMiddleware(["comprador"]),
  validateBodyMiddleware(crearOfertaSchema),
  crearOferta,
);
router.get(
  "/publicacion/:publicacionId", 
  obtenerOfertasPorPublicacion);

export default router;
