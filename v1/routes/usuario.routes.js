import express from "express";
import { accessMiddleware } from "../middlewares/access.middleware.js";
import {
  actualizarPlanPremium,
  obtenerUsuarioPorId,
} from "../controllers/usuario.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/:id", obtenerUsuarioPorId);
router.patch(
  "/plan/premium",
  accessMiddleware(["vendedor"]),
  actualizarPlanPremium,
);

export default router;
