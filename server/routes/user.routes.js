<<<<<<< HEAD
const User = require('../controller/user.controller');
const Qr = require('../controller/qr.controller');
const Prueba = require('../controller/prueba.controller')
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/register", User.register);
    app.post("/api/login", User.login);
    app.post("/api/generar", authenticate, User.generador);
    app.post("/api/guardar", authenticate, Qr.guardar);
    //app.post("/api/guardar", Qr.guardar);
    app.get("/api/users", User.getAll);
    app.get("/api/qr", Qr.getAll);
    app.get("/api/getUser/:id", User.getUser);
    app.get("/api/salir", User.logout);
    app.post("/api/user", User.buscarEmail);
    app.delete("/api/deleteUsers/:id", User.delete);
}
=======
const User = require("../controller/user.controller");
const Qr = require("../controller/qr.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/register", User.register);
  app.post("/api/login", User.login);
  app.post("/api/generar", authenticate, User.generador);
  app.post("/api/guardar", authenticate, Qr.guardar);
  app.get("/api/users", User.getAll);
  app.get("/api/getUser/:id", User.getUser);
  app.get("/api/salir", User.logout);
  app.post("/api/user", User.buscarEmail);
  app.delete("/api/deleteUsers/:id", User.delete);

  //Rutas creada por Derlis
  app.post("/api/checkUser", User.checkUser);
};
>>>>>>> 1ea9c919c793cf4c2f202fb49220fb552f62e9c5
