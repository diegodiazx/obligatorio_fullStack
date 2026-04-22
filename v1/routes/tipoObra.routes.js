import express from "express";
import { 
    obtenerTiposObra,
    crearTipoObra,
    obtenerTipoObraPorId,
    modificarTipoObra,
    eliminarTipoObra
} from "../controllers/tipoObra.controllers.js";
import { tipoObraSchema } from "../validators/tipoObra.validators.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

const router = express.Router( {mergeParams: true} );

router.get("/", obtenerTiposObra);
router.get("/:id", obtenerTipoObraPorId);
router.post("/", validateBodyMiddleware(tipoObraSchema), crearTipoObra);
router.put("/:id", modificarTipoObra);
router.delete("/:id", eliminarTipoObra);

export default router;