const { User } = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports.register = (req, res) => {
    const { userName, email, password, permit } = req.body
    const confirmPassword = password
    const user = new User({
        userName, email, password, permit, confirmPassword
    });
    user.save()
        .then(() => {
            res.json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
};

module.exports.getAll = async (req, res) => {
    const getAll = await User.find({})
    res.json(getAll)
}
module.exports.delete = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.deleteOne({ _id: req.params.id })
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports.logout = (req, res) => {
    try {
        res.clearCookie("userToken");
        res.json({ msg: "Cerraste la Session Correctamnete" });
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email: email })
        if (usuario === null) {
            return res.status(403).json({ msg: "Correo no encontrado" })
        }
        const isValid = await bcrypt.compare(password, usuario.password);
        if (isValid) {
            const secret = "clave sercret jwt"
            const newJWT = jwt.sign({
                _id: usuario._id,
                usuario: usuario.userName,
                acceso: usuario.permit
            }, secret)
            res.cookie("userToken", newJWT, {
                httpOnly: true
            })
            res.json({ msg: "Logueado Correctamente" })

        } else {
            return res.status(403).json({ msg: "Correo o contraseña Incorrecta" })
        }
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

module.exports.generador = async (req, res) => {
    const { guarda } = req.body
    try {
        const secret = "boletoDescuentoFram";
        const newTokenQR = jwt.sign({
            id: new Date(),
            guarda: guarda
        }, secret)
        res.json(newTokenQR);
    } catch (error) {
        return res.json({ msg: "Ha ocurrido algun error " })
    }
}
module.exports.buscarEmail = async (req, res) => {
    const { email } = req.body
    const result = await User.findOne({ email: email })
    res.json(result)
}
module.exports.getUser = async (req, res) => {
    const { id } = req.body
    const result = await User.findOne({ _id: id })
    res.json(result)
}
module.exports.update = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}