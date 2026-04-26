import mongoose from "mongoose";

const publicacionSchema = new mongoose.Schema({
  obra: {
    id: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    artista: {
      type: String,
      required: true,
    },
    imagenId: {
      type: String,
    },
  },
  fechaPublicacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  precioBase: {
    type: Number,
    required: true,
  },
  donacion: {
    type: Boolean,
    required: true,
    default: false,
  },
  tipoObra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoObra",
    required: true, //?
  },
  estado: {
    type: String,
    //el estado cancelado es para cuando no se quiere perder el registro de la publicación y sus ofertas
    //pero ya no se quiere que esté activa ni pausada, asi no tiene por que eliminarla completamente
    enum: ["activa", "finalizada", "cancelada", "pausada"],
    default: "pausada",
    required: true,
  },
  ganador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true, //?
  },
});

export default mongoose.model(
  "Publicacion",
  publicacionSchema,
  "publicaciones",
);
