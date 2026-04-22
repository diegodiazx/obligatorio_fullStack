import { isValidObjectId } from "mongoose";
import TipoObra from "../models/tipoObra.model.js";
import Publicacion from "../models/publicacion.model.js";

export const obtenerTiposObraService = async () => {
        const tiposObra = await TipoObra.find();
        if(tiposObra.length === 0) {
            const error = new Error("No se encontraron tipos de obra");
            error.status = 404;
            throw error;
        }
        return tiposObra;
}

export const obtenerTipoObraPorIdService = async (id) => {
    if(!isValidObjectId(id)) {
        const error = new Error("ID con formato inválido");
        error.status = 400;
        error.details = { id: id };
        throw error;
    }

    const tipoObra = await TipoObra.findById(id);
    if(!tipoObra) {
        const error = new Error("No se encontró el tipo de obra");
        error.status = 404;
        error.details = { id: id };
        throw error;
    }
        return tipoObra;
    }

export const crearTipoObraService = async (data) => {
    const nuevoTipoObra = new TipoObra(data);
    return await nuevoTipoObra.save();
}

export const eliminarTipoObraService = async (id) => {
    if(!isValidObjectId(id)) {
        const error = new Error("ID con formato inválido");
        error.status = 400;
        error.details = { id: id };
        throw error;
    }

    const publicacionesAsociadas = await Publicacion.find({ tipoObra: id });
    if(publicacionesAsociadas.length > 0) {
        const error = new Error("No se puede eliminar el tipo de obra porque tiene publicaciones asociadas");
        error.status = 400;
        error.details = { id: id, publicacionesAsociadas: publicacionesAsociadas.map(pub => pub._id) };
        throw error;
    }

    const tipoObraEliminada = await TipoObra.findByIdAndDelete(id);
    if(!tipoObraEliminada) {
        const error = new Error("No se encontró el tipo de obra a eliminar");
        error.status = 404;
        error.details = { id: id };
        throw error;
    }

    return tipoObraEliminada;

}

export const modificarTipoObraService = async (id, datosActualizados) => {
    if(!isValidObjectId(id)) {
        const error = new Error("ID con formato inválido");
        error.status = 400;
        error.details = { id: id };
        throw error;
    }

    const tipoObraModificada = await TipoObra.findByIdAndUpdate(id, datosActualizados, { returnDocument: "after" });
    if(!tipoObraModificada) {
        const error = new Error("No se encontró el tipo de obra a modificar");
        error.status = 404;
        error.details = { id: id };
        throw error;
    }

    return tipoObraModificada;
}
