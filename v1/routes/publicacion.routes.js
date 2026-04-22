import express from "express";
import {
    getPublicaciones,
    crearPublicacion,
    getPublicacionPorId,
    modificarPublicacion,
    eliminarPublicacion
} from "../controllers/publicacion.controllers.js";

const router = express.Router( {mergeParams: true} );

router.get("/", getPublicaciones);
router.get("/:id", getPublicacionPorId);
router.post("/", crearPublicacion);
router.put("/:id", modificarPublicacion);
router.delete("/:id", eliminarPublicacion);

export default router;