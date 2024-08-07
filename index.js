const express=require("express");
const authRouter = require("./routers/authRouter");

// ENV CONFIGRATION
require("dotenv").config();

const db=require("./db");
const app=express();

// globalmiddlewares
app.use(express.json())
app.use('/auth',authRouter)

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