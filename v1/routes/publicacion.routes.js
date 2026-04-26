import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import {
  crearPublicacionSchema,
  modificarPublicacionSchema,
} from "../validators/publicacion.validators.js";
import {
  obtenerPublicaciones,
  crearPublicacion,
  obtenerPublicacionPorId,
  modificarPublicacion,
  eliminarPublicacion,
  finalizarPublicacion,
} from "../controllers/publicacion.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerPublicaciones);
router.get("/:id", obtenerPublicacionPorId);
router.post(
  "/",
  validateBodyMiddleware(crearPublicacionSchema),
  crearPublicacion,
);
router.put(
  "/:id",
  validateBodyMiddleware(modificarPublicacionSchema),
  modificarPublicacion,
);
router.delete("/:id", eliminarPublicacion);
router.patch("/:id/finalizar", finalizarPublicacion);

export default router;
