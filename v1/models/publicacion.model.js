import mongoose from "mongoose";

 const publicacionSchema = new mongoose.Schema(
    {
        obra: {
            id: {
                type: String,
                required: true
            },
            titulo: {
                type: String,
                required: true
            },
            artista: {
                type: String,
                required: true
            },
            urlImagen:{
                type: String,
            }
        },
        fechaPublicacion: {
            type: Date,
            required: true,
            default: Date.now

        },
        precioBase: {
            type: Number,
            required: true
        },
        historialOfertas:[{
            usuario: {
                type: mongoose.Schema.Types.ObjectId, ref: "Usuario",
                required: true}
            ,
            monto: {
                type: Number,
                required: true
            },
            fechaOferta: {
                type: Date,
                required: true
            }
        }],
        donacion: {
            type: Boolean,
            required: true,
            default: false
        },
        tipoObra: {
            type: mongoose.Schema.Types.ObjectId, ref: "TipoObra"
        },
        estado:{
            type: String,
            enum: ["activa", "finalizada", "cancelada", "pausada"],
            default: "pausada",
            required: true
        },
        ganador: {
            type: mongoose.Schema.Types.ObjectId, ref: "Usuario",
        }
    });

export default mongoose.model("Publicacion", publicacionSchema, "publicaciones");
