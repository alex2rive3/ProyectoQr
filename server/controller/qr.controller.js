
const { Qr } = require("../model/qr.model");
module.exports.guardar = async (req, res) => {
    console.log(req.body)
    try {
        const result = await Qr.create(req.body)
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.getAll = async (req, res) => {
    const result = await Qr.find({}).populate("generadorID", { userName: 1 }).populate("lectorId", { userName: 1 })
    res.json(result)
}
