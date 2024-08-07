const mongoose=require("mongoose")

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected sucessfully")
}).catch((err)=>{
    console.log(err)
});