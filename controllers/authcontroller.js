const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { userValidation } = require("../utils/authUtils");
const { connection } = require("mongoose");
const mongoose = require("mongoose");

const registerControler = async (req, res) => {

  const { name, email, username, password } = req.body;


  // Datavalidation
  try {
    const userData = await userValidation({ email, username, password });

  } catch (error) {
          return res.send({
          status: 400,
          error: error,
    });
  }


  //    store Data in DB
  const obj = new User({ name, email, username, password });
  try {
       const userDb = await obj.registerUser();

    return res.send({
        status: 201,
        message: "user register sucessfully",
        data: userDb,
    });

  } catch (error) {
     res.send({
        status: 400,
        message: "internal server error",
        error: error,
    });
  }
};

// login
const loginControler = async (req, res) => {
  const { loginId, password } = req.body;


  //  find user in db
  try {
    const userDb = await User.findUserWithLoginId({ loginId });
    const isMatch = await bcrypt.compare(password, userDb.password);
    if (!isMatch) {
       return res.send({
         status: 400,
         message: "incorrect password",
      });
    }

    req.session.isAuth = true;
     req.session.User = {
       userId: userDb._id,
       username: userDb.name,
       email: userDb.email,
    };

    return res.send({
      status: 200,
      message: "login secuessfully",
      data: userDb,
    });


  } catch (error) {
    res.send({
      status: 400,
      error: error,
    });
  }

 
};



// logout
const logoutController = async (req, res) => {

  req.session.destroy((err) => {
      if (err)
       return res.send({
         status: 400,
         message: "Logout unsuccessfull",
      });
    else
       return res.send({
        status: 200,
        message: "Logout successfull",
      });
  });
};

// logoutfromallDevices
const logoutFromAllController = async (req, res) => {

   const userId = req.session.User.userId;
   const sessionSchema = new mongoose.Schema(
    {
      _id: String,
    },
    {
      strict: false,
    }
  );
  const sessionModel = mongoose.model("session", sessionSchema);

  // delete all entries of user from DB
  try {
     const deleteDb = await sessionModel.deleteMany({
      "session.User.userId": userId,
    });
 
    return res
      .status(200)
      .json(`Logout from ${deleteDb.deletedCount} devices successfull`);


  } catch (error) {
      return res.status(500).json(error);
  }
};


module.exports = {
  registerControler,
  loginControler,
  logoutController,
  logoutFromAllController,
};
