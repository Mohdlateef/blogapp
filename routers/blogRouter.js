const express=require("express");
const { createBlogsController
     , getBlogsController} = require("../controllers/blogcontroller");




const blogrouter=express.Router();


blogrouter
.post("/createBlogs",createBlogsController)
.get("/getBlogs",getBlogsController);





module.exports=blogrouter;