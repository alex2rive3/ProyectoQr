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

module.exports.countDiario = (req, res) => {
    const fechaInicio = new Date(); // fecha de inicio de la consulta
    const fechaFin = new Date(); // fecha de fin de la consulta
    //Seteamos las horas para hacer un contador diario
    fechaInicio.setHours(4, 30, 0, 0); //4:30 del dia
    fechaFin.setHours(23, 30, 0, 0);    //23:30 del mismo dia 

    Qr.countDocuments({
        createdAt: {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin)
        }
    }, (error, count) => {
        if (error) {
            res.json(error);
        } else {
            res.json(count);
        }
    });
}