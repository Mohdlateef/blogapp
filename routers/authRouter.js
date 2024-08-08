const express=require("express");
const { registerControler, loginControler,logoutController } = require("../controllers/authController");
const isAuth = require("../middlewares/authmiddleware");

const authRouter=express.Router();


authRouter
.post("/register",registerControler)
.post("/login",loginControler)
.post("/logout",isAuth,logoutController)
module.exports=authRouter;