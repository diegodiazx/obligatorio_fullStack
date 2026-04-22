import {
    obtenerTiposObraService,
    obtenerTipoObraPorIdService,
    crearTipoObraService,
    eliminarTipoObraService,
    modificarTipoObraService
} from "../services/tipoObra.services.js";

export const obtenerTiposObra = async (req, res) => {
    const tiposObra = await obtenerTiposObraService();
    res.status(200).json(tiposObra);
}

export const obtenerTipoObraPorId = async (req, res) => {
    const { id } = req.params;
    const tipoObra = await obtenerTipoObraPorIdService(id);
    res.status(200).json(tipoObra);
}

export const crearTipoObra = async (req, res) => {
    const data = req.validatedBody;
    const nuevoTipoObra = await crearTipoObraService(data);
    res.status(201).json( {mensaje: "Tipo de obra creado exitosamente", tipoObra: nuevoTipoObra} );
}

export const eliminarTipoObra = async (req, res) => {
    const { id } = req.params;
    const tipoObraEliminado = await eliminarTipoObraService(id);
    res.status(200).json( {mensaje: "Tipo de obra eliminado exitosamente", tipoObra: tipoObraEliminado} );
}

export const modificarTipoObra = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const tipoObraModificado = await modificarTipoObraService(id, data);
    res.status(200).json( {mensaje: "Tipo de obra modificado exitosamente", tipoObra: tipoObraModificado} );
}