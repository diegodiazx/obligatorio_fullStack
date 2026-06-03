import express from "express";
import { actualizarPlanPremium, obtenerUsuarioPorId } from "../controllers/usuario.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/:id", obtenerUsuarioPorId);
router.patch("/plan/premium", actualizarPlanPremium);

export default router;
