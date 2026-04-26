import express from "express";
import { useGemini25Flash, getModels } from "../controllers/ai.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/models", getModels);
router.post("/", useGemini25Flash);

export default router;
