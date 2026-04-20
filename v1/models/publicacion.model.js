import mongoose from "mongoose";

 const publicacionSchema = new mongoose.Schema(
    {
        obra: {
            id: {
                type: string,
                required: true
            },
            titulo: {
                type: string,
                required: true
            },
            artista: {
                type: string,
                required: true
            },
            urlImagen:{
                type: string,
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
            tipo: Boolean,
            required: true,
            default: false
        },
        tipoObra: {
            type: mongoose.Schema.Types.ObjectId, ref: "TipoObra",
            required: true //?
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