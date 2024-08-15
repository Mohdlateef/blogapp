const{createBlogs
    ,getBlogs
     } =require("../models/blogmodel")


const createBlogsController=async(req,res)=>{
    const title=req.body.title;
    const textbody=req.body.textbody;
    const userId=req.session.User.userId;
    console.log(title)
    try {
        const blogsDb=await createBlogs({title,textbody,userId})
      
        return res.send({
            status:201,
            message:"blog create sucessfully",
            data:blogsDb,
        })
   
    } catch (error) {
        return res.send({
            status:500,
            message:"internal server error",
            error:error,
        })
    }

    
}

const getBlogsController=async (req,res)=>{
 const SKIP=Number(req.query.skip)||0;
 try {
    const blogsDb= await getBlogs({SKIP})

    if (blogsDb.length === 0)
        return res.send({
          status: 204,
          message: "No blog found",
        });
  
      return res.send({
        status: 200,
        message: "Read success",
        data: blogsDb,
      });
 } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
 }


module.exports={createBlogsController,getBlogsController}