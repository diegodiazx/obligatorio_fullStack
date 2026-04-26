import express from "express";
import { actualizarPlanPremium } from "../controllers/usuario.controllers.js";

const router = express.Router({ mergeParams: true });

router.patch("/plan/premium", actualizarPlanPremium);

export default router;
