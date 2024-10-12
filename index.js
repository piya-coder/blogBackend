console.log("hello world");
const { log } = require("console");
const { connectDb } = require("./Database/dbConfig");
const blogModel = require("./model/Blog.model");
const express = require("express");
const application = express();

connectDb();
///================================middleware=======================///
application.use(express.json());
application.use(express.urlencoded({ extended : true }))
/// ========================  make routes ========================///
application.post("/create", async (req, res) => {
  try {
    const { title, description, authorName } = req.body;

    if (!title) {
      return res.status(400).json({
        data: null,
        success: false,
        error: true,
        message: " title is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        data: null,
        success: false,
        error: true,
        message: " title is required",
      });
    }
    if (!authorName) {
      return res.status(400).json({
        data: null,
        success: false,
        error: true,
        message: " title is required",
      });
    }
    ///=====================checking data is it already exits in database=======================
    const existTitle = await blogModel.find({ title: title });
    if (existTitle?.length > 0) {
      return res.status(200).json({
        data: null,
        success: true,
        error: false,
        message: `${title} already exist`,
      });
    }
    /// ===================data save into mongodbconnection=================================
    const aftersaving = await new blogModel({
      title: title,
      description: description,
      authorName: authorName,
    }).save();
    if (aftersaving) {
      return res.status(200).json({
        data: aftersaving,
        success: true,
        error: false,
        message: " title is send  successfully",
      });
    }
  } catch (error) {
    console.error(error);
  }
});
/// ============================= get all blog =====================================
application.get ("/getAllblog" , async (req, res ) => {
 try {
  const allBlog = await blogModel.find({});
  if(allBlog){
    res.status(200).json({
      data: allBlog,
      error: false,
      message: " title is send  successfully",
    });
  }

 } catch (error) {
  console.log(error);
  
 }
})
///=================================== update blog data ====================================
application.patch("/updateData/:id" , async (req, res ) => {
  try {
    const {id} = req.params;
    
    const { title , description , authorName } = req.body;

    // if(!title  || !description || !authorName){
    //   res.status(400).json({
    //     success : false,
    //     data : null,
    //     message : " all data missing "
    //   })
    // }
    const updateBlogData = await blogModel.findOneAndUpdate({ _id : id } , {
      ...( title && { title : title}),
      ...(description && {description : description}),
      ...(authorName && {authorName : authorName})

    } , {
      new : true
    });
    if(updateBlogData){
      res.status(200).json({
        data : updateBlogData,
        success : true,
        message : "updated data"
      })
       
      }
    console.log(updateBlogData);

    
  } catch (error) {
    console.log("error form update data" , error);
    
  }
});
  ///=========================== delete blog ========================== ///
  application.delete("/deleteBlog/:id" , async (req, res) =>{
    try { 
      const {id} = req.params
      console.log(id);
      const deleteBlogData = await blogModel.findOneAndDelete({ _id : id });
      res.status(200).json({
        success : true,
        data : deleteBlogData,
        message : " successfully deleted all data "
      })
         
    } catch (error) {
      console.log("delete blog error");
      
    }
  })
application.listen(4000, () => {
  console.log(`server running on port ${4000}`);
});
