const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {createBlog,FetchPublicBlog,BlogById,photo,showdrafts,ReadBlogById,showTrendingBlog,SearchByHashTag}=require('../controllers/blog')


//post requests
router.post("/blog/:userId",createBlog)
router.post("/SearchByHashTag",SearchByHashTag)

//get requests

router.get("/ReadBlog/:blogId/:uniqueView",ReadBlogById)
router.get("/ShowTrendingBlog",showTrendingBlog)
router.get("/blogs",FetchPublicBlog)
router.get("/drafts/:userId",showdrafts)
router.get("/blogs/img/:blogId",photo)
router.param('userId',userById)
router.param("blogId",BlogById)
module.exports=router;