import express from "express";
import { authorizationMiddleware } from "./middlewares/authorization.middleware.js";
import { accessMiddleware } from "./middlewares/access.middleware.js";
import tipoObraRouter from "./routes/tipoObra.routes.js";
import authRouter from "./routes/auth.routes.js";
import publicacionRouter from "./routes/publicacion.routes.js";
import usuarioRouter from "./routes/usuario.routes.js";

const router = express.Router({ mergeParams: true });

//rutas desprotegidas

router.use("/auth", authRouter);

//router.use(authorizationMiddleware);

//rutas protegidas

router.use("/tipoObra", tipoObraRouter);
router.use("/publicacion", publicacionRouter);
router.use("/usuario", usuarioRouter);

//router.use(accessMiddleware(['vendedor']));

export default router;
