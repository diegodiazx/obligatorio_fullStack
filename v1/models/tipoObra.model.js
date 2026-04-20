import mongoose from "mongoose";

const tipoObraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true}
    }
);
export default mongoose.model("TipoObra", tipoObraSchema, "tiposObra");