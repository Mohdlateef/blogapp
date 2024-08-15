const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const blogSchema=new Schema({
    title:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    textbody:{
        type:String,
        require:true,
        trim:true,

    },
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
         ref: "user", //fk to user collections  
    },
    creationDateTime:{
        type:String,
        require:true,
    },
   
});

module.exports=mongoose.model("blog",blogSchema);