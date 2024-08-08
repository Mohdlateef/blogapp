const bcrypt=require("bcrypt")
const User = require("../models/userModel");
const {userValidation}=require("../utils/authUtils")
const { connection } = require("mongoose");

const registerControler=async(req,res)=>{
    // console.log(req.body)
    const {name,email,username,password}=req.body;
   
    // Datavalidation
    try { 
    const userData=    await userValidation({email,username,password})

    }catch(error)
    {
        // console.log(error)
     return res.send({
        status:400,
        error:error
     })
    }
//    store Data in DB
const obj=new User({name,email,username,password})
try{
const userDb=await obj.registerUser()

return res.send({
    status:201,
    message:"user register sucessfully",
    data:userDb,
})
} catch(error){
res.send({
    status:400,
    message:"internal server error",
    error:error,
})
}

}



// login
const loginControler=async(req,res)=>{
 const {loginId,password}=req.body;
  console.log(loginId);
//  find user in db
const userDb=await User.findUserWithLoginId({loginId});

// compare password
const isMatch=await bcrypt.compare(password,userDb.password)
if(!isMatch){
    return res.send({
        status:400,
        message:"incorrect password"
    });}
    console.log(req.session,58);

    req.session.isAuth=true;
    req.session.User={
        userId:userDb._id,
        username:userDb.name,
        email:userDb.email,

    }
return res.send({
    status:200,
    message:"login secuessfully",
    data:userDb,
})
}

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
  



module.exports={registerControler,loginControler,logoutController}