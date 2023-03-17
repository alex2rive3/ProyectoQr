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
