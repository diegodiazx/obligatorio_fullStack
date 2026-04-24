import express from "express";
import { validateBodyMiddleware } from "../middlewares/validate.middleware.js";
import {
  crearPublicacionSchema,
  modificarPublicacionSchema,
} from "../schemas/publicacion.schema.js";
import {
  obtenerPublicaciones,
  crearPublicacion,
  obtenerPublicacionPorId,
  modificarPublicacion,
  eliminarPublicacion,
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

export default router;
