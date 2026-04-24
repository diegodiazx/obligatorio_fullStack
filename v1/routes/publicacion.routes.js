import express from "express";

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
router.post("/", crearPublicacion);
router.put("/:id", modificarPublicacion);
router.delete("/:id", eliminarPublicacion);

export default router;
