import mongoose from "mongoose";

const ofertaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  publicacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicacion",
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fechaOferta: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Oferta", ofertaSchema);
