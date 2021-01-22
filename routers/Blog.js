const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {createBlog,FetchPublicBlog,BlogById,photo,showdrafts,ReadBlogById,showTrendingBlog,SearchByHashTag,showNewBlog}=require('../controllers/blog')

//const {auth}=require('../middleware/Auth')

//post requests
router.post("/blog/:userId",createBlog)
router.post("/SearchByHashTag",SearchByHashTag)

//get requests

router.get("/ReadBlog/:blogId/:uniqueView",ReadBlogById)
router.get("/ShowTrendingBlog",showTrendingBlog)
router.get("/ShowNewBlog",showNewBlog)
router.get("/blogs",FetchPublicBlog)
router.get("/drafts/:userId",showdrafts)
router.get("/blogs/img/:blogId",photo)
router.param('userId',userById)
router.param("blogId",BlogById)
module.exports=router;