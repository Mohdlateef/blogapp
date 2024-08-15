const express = require("express");
const {
  createBlogsController,
  getBlogsController,
  getMyBlogsController,
} = require("../controllers/blogcontroller");

const blogrouter = express.Router();

blogrouter
  .post("/createBlogs", createBlogsController)
  .get("/getBlogs", getBlogsController)
  .get("/getMyBlogs", getMyBlogsController);

module.exports = blogrouter;
