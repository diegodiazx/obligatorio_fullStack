import express from "express";
import { authorizationMiddleware } from "./middlewares/authorization.middleware.js";

const router = express.Router({ mergeParams: true });

//rutas desprotegidas

router.use(authorizationMiddleware);

//rutas protegidas

export default router;
