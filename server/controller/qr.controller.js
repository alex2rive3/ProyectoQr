const { Qr } = require("../model/qr.model");
//Registramos el los datos del generador y del lector una base de datos 
module.exports.guardar = async (req, res) => {
    console.log(req.body)
    try {
        const result = await Qr.create(req.body)
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}
//controlador para obtener todos los Qr de la base de datos con el UserName del generador del Qr y del que leyo el mismo 
module.exports.getAll = async (req, res) => {
    const result = await Qr.find({}).populate("generadorId", { userName: 1 }).populate("lectorId", { userName: 1 })
    res.json(result)
}
