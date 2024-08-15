const express = require("express");
const isAuth = require("../middlewares/authmiddleware");

const {
  registerControler,
  loginControler,
  logoutController,
  logoutFromAllController,
} = require("../controllers/authcontroller");

const authRouter = express.Router();


authRouter
  .post("/register", registerControler)
  .post("/login", loginControler)
  .post("/logout", isAuth, logoutController)
  .post("/logout-from-all", isAuth, logoutFromAllController);
module.exports = authRouter;
