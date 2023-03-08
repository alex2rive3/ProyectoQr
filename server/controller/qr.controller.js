const { Qr } = require("../model/qr.model");
module.exports.guardar = (req, res) => {
    console.log(req.body)
    const qr = new Qr(req.body);
    qr.save()
        .then(() => {
            res.json({ msg: "Registro Correcta" });
        })
        .catch(err => res.json(err));
};
module.exports.getAll = async (req, res) => {
    const result = await Qr.find({})
    res.json(result)
}