const { User } = require("../model/user.model");
const { Black_list } = require("../model/black_list");
const { White_list } = require("../model/white_list");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cron = require("node-cron");

//
cron.schedule("0 2 * * 1-5", async () => {
  try {
    // Obtener todos los usuarios
    const users = await User.find();

    // Agregar usuarios con permit "universitario" a la White_list
    for (const user of users) {
      if (user.permit === "universitario") {
        const whiteUser = new White_list({
          user_id: user._id,
          name: user.userName,
        });
        await whiteUser.save();
        console.log(
          `Se ha agregado el usuario ${user.userName} a la White_list`
        );
      }
    }

    // Vaciar la Black_list
    await Black_list.deleteMany({});
    console.log("Se ha vaciado la Black_list");
  } catch (error) {
    console.log(error);
  }
});

//Test para saber si se ejecuta correctamente, en este caso cada 3 segundos
// cron.schedule("*/3 * * * * *", () => {
//   console.log("Ejecutando tarea cada 3 segundos");
// });

module.exports.register = (req, res) => {
  const { userName, email, password, permit } = req.body;
  const confirmPassword = password;
  const user = new User({
    userName,
    email,
    password,
    permit,
    confirmPassword,
  });
  user
    .save()
    .then(() => {
      res.json({ msg: "success!", user: user });
    })
    .catch((err) => res.json(err));
};

module.exports.getAll = async (req, res) => {
  const getAll = await User.find({});
  res.json(getAll);
};
module.exports.delete = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.logout = (req, res) => {
  try {
    res.clearCookie("userToken");
    res.json({ msg: "Cerraste la Session Correctamnete" });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email: email });
    if (usuario === null) {
      return res.status(403).json({ msg: "Correo no encontrado" });
    }
    const isValid = await bcrypt.compare(password, usuario.password);
    if (isValid) {
      const secret = "clave sercret jwt";
      const newJWT = jwt.sign(
        {
          _id: usuario._id,
          usuario: usuario.userName,
          acceso: usuario.permit,
        },
        secret
      );
      res.cookie("userToken", newJWT, {
        httpOnly: true,
      });
      res.json({ msg: "Logueado Correctamente" });
    } else {
      return res.status(403).json({ msg: "Correo o contraseña Incorrecta" });
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

// Prueba para hacer la validación de White y Black List
module.exports.checkUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const blackUser = await Black_list.findOne({ user_id: user_id });
    if (blackUser) {
      // Si encontramos un usuario en la blacklist devolvemos false
      res.status(200).json({ pass: false });
    } else {
      // Ahora vemos si esta en el la white_list
      const whiteUser = await White_list.findOne({ user_id: user_id });
      if (whiteUser) {
        // Si encontramos
        // Le llavamos a la black_list
        const newBlackUser = new Black_list({ user_id: user_id });
        await newBlackUser.save();
        // Y le eliminamos de la white_list
        await White_list.findOneAndDelete({ user_id: user_id });
        // Devolvemos true porque estaba en la white_list
        res.status(200).json({ pass: true });
      } else {
        // Si no encontramos el usuarios ni el black_list ni en la white_list
        res.status(200).json({ pass: "Usuario no registrado en la DB" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.generador = async (req, res) => {
  const { guarda } = req.body;
  try {
    const secret = "boletoDescuentoFram";
    const newTokenQR = jwt.sign(
      {
        id: new Date(),
        guarda: guarda,
      },
      secret
    );
    res.json(newTokenQR);
  } catch (error) {
    return res.json({ msg: "Ha ocurrido algun error " });
  }
};
module.exports.buscarEmail = async (req, res) => {
  const { email } = req.body;
  const result = await User.findOne({ email: email });
  res.json(result);
};
module.exports.getUser = async (req, res) => {
  const { id } = req.body;
  const result = await User.findOne({ _id: id });
  res.json(result);
};
module.exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
