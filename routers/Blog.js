const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {createBlog,FetchPublicBlog,BlogById,photo,showdrafts,ReadBlogById}=require('../controllers/blog')


router.post("/blog/:userId",createBlog)
router.get("/ReadBlog/:blogId",ReadBlogById)
router.get("/blogs",FetchPublicBlog)
router.get("/drafts/:userId",showdrafts)
router.get("/blogs/img/:blogId",photo)
router.param('userId',userById)
router.param("blogId",BlogById)
module.exports=router;