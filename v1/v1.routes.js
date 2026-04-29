import express from "express";
import { authorizationMiddleware } from "./middlewares/authorization.middleware.js";
import { accessMiddleware } from "./middlewares/access.middleware.js";
import tipoObraRouter from "./routes/tipoObra.routes.js";
import authRouter from "./routes/auth.routes.js";
import publicacionRouter from "./routes/publicacion.routes.js";
import usuarioRouter from "./routes/usuario.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import aiRouter from "./routes/ai.routes.js";
import ofertaRouter from "./routes/oferta.routes.js";

const router = express.Router({ mergeParams: true });

//rutas desprotegidas

router.use("/auth", authRouter);

router.use(authorizationMiddleware);

//rutas protegidas

router.use("/tipoObra", accessMiddleware(["vendedor"]), tipoObraRouter);
router.use("/publicacion", publicacionRouter);
router.use("/usuario", accessMiddleware(["vendedor"]), usuarioRouter);
router.use("/uploads", uploadsRouter);
router.use("/ai", aiRouter); //endpoint innecesario; solo llamamos lo de ai cuando creamos la publi
router.use("/oferta", ofertaRouter);

//router.use(accessMiddleware(['vendedor']));

export default router;
