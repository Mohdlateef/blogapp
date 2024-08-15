const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// one way
// const usermodle=mongoose.model("user",userSchema);
// module.exports=usermodle;
// other way
module.exports = mongoose.model("user", userSchema);
