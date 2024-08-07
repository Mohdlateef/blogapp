const express=require("express");
const authRouter = require("./routers/authRouter");
const session=require("express-session");
const mongoDbSession=require("connect-mongodb-session")(session);

// fileimporst

const db=require("./db");
const { collection } = require("./schemas/userSchema");


//**constants */

// ENV CONFIGRATION
const app=express();
require("dotenv").config();
console.log(process.env.SECRET,"17")
const store=new mongoDbSession({
    uri:process.env.MONGO_URI,
    collection:"sessions"
})




// globalmiddlewares
app.use(express.json())
app.use('/auth',authRouter)
app.use(session({
    secret:process.env.SECRET,
    store:store,
    resave:false,
    saveUninitialized:false,
}))

// app.use({})
// app.post("/register",(req,res)=>{
//     return res.send("test")
// })

let Port=process.env.PORT;
app.listen(Port,()=>{
    {
console.log(`localhost${Port}`);
    }
})