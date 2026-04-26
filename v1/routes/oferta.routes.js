import express from "express";
import { crearOferta } from "../controllers/oferta.controllers.js";

const router = express.Router({ mergeParams: true });

router.post("/publicacion/:publicacionId", crearOferta);

export default router;
