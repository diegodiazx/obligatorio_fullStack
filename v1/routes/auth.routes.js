import express from "express";
import {
    ingresarUsuario,
    registrarUsuario
    
} from "../controllers/auth.controllers.js";

const router = express.Router( {mergeParams: true} );

router.post("/login", ingresarUsuario);
router.post("/registro", registrarUsuario);

export default router;

