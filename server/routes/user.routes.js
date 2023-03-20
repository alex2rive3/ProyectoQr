const User = require("../controller/user.controller");
const Qr = require("../controller/qr.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
    //Rutas para Manipulacion de Usuarios
    app.post("/api/register", User.register);
    app.post("/api/login", User.login);
    app.get("/api/users", User.getAll);
    app.post("/api/user", User.getUserEmail);
    app.get("/api/salir", User.logout);
    app.get("/api/getUser/:id", User.getUser);
    app.put("/api/update/:id", User.update);
    app.delete("/api/deleteUsers/:id", User.delete);

    //Rutas para control de QR
    app.get("/api/qr", Qr.getAll);
    app.post("/api/guardar", authenticate, Qr.guardar);

    //Rutas creada por Derlis
    app.post("/api/checkUser", User.checkUser);
};
