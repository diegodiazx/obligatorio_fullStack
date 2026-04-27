import express from "express";
import { subirImagen } from "../controllers/uploads.controllers.js";
import { subirImagenSchema } from "../validators/uploads.validators.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", validateBodyMiddleware(subirImagenSchema), subirImagen);

export default router;
