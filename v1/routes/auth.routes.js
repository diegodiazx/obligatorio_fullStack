import express from "express";
import {
    ingresarUsuario,
    registrarUsuario
    
} from "../controllers/auth.controllers.js";
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js";
import { loginSchema, registroSchema } from "../validators/auth.validators.js";

const router = express.Router( {mergeParams: true} );

router.post("/login", validateBodyMiddleware(loginSchema), ingresarUsuario);
router.post("/registro", validateBodyMiddleware(registroSchema), registrarUsuario);

export default router;

