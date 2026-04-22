import express from "express";
import {
    getPublicaciones,
    createPublicacion,
    getPublicacionPorId,
    modificarPublicacion,
    deletePublicacion
} from "../controllers/publicacion.controllers.js";

const router = express.Router( {mergeParams: true} );

router.get("/", getPublicaciones);
router.get("/:id", getPublicacionPorId);
router.post("/", createPublicacion);
router.put("/:id", modificarPublicacion);
router.delete("/:id", deletePublicacion);

export default router;