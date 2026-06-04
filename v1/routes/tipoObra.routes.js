import express from "express";
import {
  obtenerTiposObra,
  crearTipoObra,
  obtenerTipoObraPorId,
  modificarTipoObra,
  eliminarTipoObra,
} from "../controllers/tipoObra.controllers.js";
import { tipoObraSchema } from "../validators/tipoObra.validators.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerTiposObra);
router.get("/:id", obtenerTipoObraPorId);
router.post(
  "/",
  accessMiddleware(["vendedor"]),
  validateBodyMiddleware(tipoObraSchema),
  crearTipoObra,
);
router.put(
  "/:id",
  accessMiddleware(["vendedor"]),
  validateBodyMiddleware(tipoObraSchema),
  modificarTipoObra,
);
router.delete("/:id", accessMiddleware(["vendedor"]), eliminarTipoObra);

export default router;
