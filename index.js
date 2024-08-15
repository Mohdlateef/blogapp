const express=require("express");
require("dotenv").config();
const session=require("express-session");
const mongoDbSession=require("connect-mongodb-session")(session);



// fileimporst
const db=require("./db");
const isAuth = require("./middlewares/authmiddleware");
const authRouter = require("./routers/authRouter");
const blogrouter = require("./routers/blogRouter");

//**constants */

// ENV CONFIGRATION
const app=express();

const Port=process.env.PORT;
const store=new mongoDbSession({
    uri:process.env.MONGO_URI,
    collection:"sessions"
})


// const { collection } = require("./schemas/userSchema");




// globalmiddlewares
app.use(express.json())

app.use(session({
    secret:process.env.SECRET,
    store:store,
    resave:false,
    saveUninitialized:false,
}))

app.use('/auth',authRouter)

app.use('/blog',isAuth,blogrouter)




// app.use({})
// app.post("/register",(req,res)=>{
//     return res.send("test")
// })


app.listen(Port,()=>{
    {
console.log(`localhost${Port}`);
    }
})