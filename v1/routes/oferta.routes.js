import express from "express";
import {
  crearOferta,
  obtenerOfertasPorPublicacion,
  obtenerMiOfertaPorPublicacion,
} from "../controllers/oferta.controllers.js";
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
router.get("/publicacion/:publicacionId", obtenerOfertasPorPublicacion);
router.get(
  "/mi-oferta/publicacion/:publicacionId",
  accessMiddleware(["comprador"]),
  obtenerMiOfertaPorPublicacion,
);

export default router;
