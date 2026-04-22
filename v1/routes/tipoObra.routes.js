import express from "express";
import { 
    getTiposObra,
    createTipoObra,
    getTipoObraPorId,
    modificarTipoObra,
    deleteTipoObra
} from "../controllers/tipoObra.controllers.js";

const router = express.Router( {mergeParams: true} );

router.get("/", getTiposObra);
router.get("/:id", getTipoObraPorId);
router.post("/", createTipoObra);
router.put("/:id", modificarTipoObra);
router.delete("/:id", deleteTipoObra);

export default router;