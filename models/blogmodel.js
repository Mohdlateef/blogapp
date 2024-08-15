const { response } = require("express")
const{LIMIT}=require("../privateContants")
const blogschema=require("../schemas/blogschema")
const createBlogs=({title,textbody,userId})=>{
    
    return new Promise(async(resolve, reject) => {
        const blogObj=new blogschema({
            title,
            textbody,
            userId,
            creationDateTime:Date.now(),
        })
      try {
        const blogDb=await blogObj.save();
        resolve(blogDb);
      } catch (error) {
        reject(error);
      }
    })
}
const getBlogs=({SKIP})=>{
    return new Promise (async(resolve, reject) => {
        try {
            const blogsDb = await blogschema.aggregate([
              { $sort: { creationDateTime: -1 } },
              { $skip: SKIP },
              { $limit: LIMIT },
            ]);
      
            resolve(blogsDb);
          } catch (error) {
            reject(error);
          }
     
    })
}
const getMyBlogs=({SKIP,userId})=>{
  return new Promise(async (resolve,reject)=>{
   try {
    const myblogs= await blogschema.aggregate([
      { $match:{userId:userId},},
      { $sort:{creationDateTime:-1},},
      {$skip:SKIP},
      {$limit:LIMIT},
   
 ])
 resolve(myblogs)
   } catch (error) {
    reject(error)
   } 



  })
}


module.exports={createBlogs,getBlogs,getMyBlogs}