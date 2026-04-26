import express from "express";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { actualizarPlanPremium } from "../controllers/usuario.controllers.js";

const router = express.Router({ mergeParams: true });

router.patch("/plan/premium", authorizationMiddleware, actualizarPlanPremium);

export default router;
