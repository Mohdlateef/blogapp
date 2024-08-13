const bcrypt = require("bcrypt");
const userSchema = require("../schemas/userSchema");
// const { response } = require("express");
 // registerUser

const User = class {
  name;
  email;
  username;
  password;
  constructor({ name, email, username, password }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }
 
  registerUser() {
    return new Promise(async (resolve, reject) => {
       
//    user exist
const userExist=await userSchema.findOne({$or: [{email:this.email},{username:this.username}],})
console.log(userExist ,21);
if(userExist&&userExist.email===this.email)
{
    reject("email is already exist")
}
if(userExist&&userExist.username===this.username)
{
    reject("username is already exist")
}
const hashPassword=await bcrypt.hash(this.password,Number(process.env.SALT))

      //    storedata
      const userObj = await userSchema({
        name: this.name,
        email: this.email,
        username: this.username,
        password: hashPassword,
      });

      try {
        // console.log(userObj,30)
        const user =await userObj.save();
        // console.log(userDb)
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  static findUserWithLoginId({loginId}){
  // console.log(loginId);
    return new Promise( async(resolve,reject)=>{
      try {
        const userDb=await userSchema.findOne({$or:[{email:loginId},{username:loginId}]})
       console.log(userDb,57);
        if(!userDb) reject("user not found please please regiter first")
        
          resolve(userDb);
      } catch (error) {
        reject(error)
        
      }
    })
  }
};


module.exports = User;
