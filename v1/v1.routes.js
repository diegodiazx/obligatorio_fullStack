import express from "express";
import { authorizationMiddleware } from "./middlewares/authorization.middleware.js";
import { accessMiddleware } from "./middlewares/access.middleware.js";

const router = express.Router({ mergeParams: true });

//rutas desprotegidas

router.use(authorizationMiddleware);

//rutas protegidas

//router.use(accessMiddleware(['vendedor']));    

export default router;
