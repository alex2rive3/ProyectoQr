const { Qr } = require("../model/qr.model");
module.exports.guardar = async (req, res) => {
    console.log(req.body)
    try {
        const qr = await Qr.create(req.body)
        res.json(qr)
    } catch (error) {
        res.status(400).json(error)
    }
}
module.exports.getAll = async (req, res) => {
    const result = await Qr.find({})
    res.json(result)
}