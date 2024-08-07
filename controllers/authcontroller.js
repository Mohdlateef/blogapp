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




const loginControler=async(req,res)=>{
 const {loginId,password}=req.body;

//  find user in db
const userDb=await User.findUserWithLoginId({loginId});

// compare password
const isMatch=bcrypt.compare(password,userDb.password)
if(!isMatch){
    return res.send({
        status:400,
        message:"incorrect password"
    });

}
}



module.exports={registerControler,loginControler}