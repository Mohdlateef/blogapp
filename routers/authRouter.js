const express=require("express");
const { registerControler, loginControler } = require("../controllers/authController");

const authRouter=express.Router();


authRouter
.post("/register",registerControler)
.post("/login",loginControler)
module.exports=authRouter;