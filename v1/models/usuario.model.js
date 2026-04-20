import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nombreCompleto: {
            nombre: {
                type: String,
                required: true
            },
            apellido: {
                type: String,
                required: true
            },
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            enum: ["vendedor", "comprador"],
            required: true
        },
        subscripcion:{
            type: String,
            enum: ["plus", "premium"]
        }
    }
);

export default mongoose.model("Usuario", usuarioSchema, "usuarios");