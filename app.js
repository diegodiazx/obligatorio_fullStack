import express from "express";
import v1Router from "./v1/v1.routes.js";
//import dotenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./v1/config/db.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";

//dotenv.config();

//enseguida nos conectamos a la base de datos
connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "https://obligatorio2-fs.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando" });
});

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
