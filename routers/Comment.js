const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {comment,ReadComment,MyComments}=require('../controllers/comments');
const {BlogById}=require('../controllers/blog')

router.post("/comment/:userId/:blogId",comment)
router.get("/MyComments/:userId/:blogId",MyComments)
router.get("/comments/:blogId",ReadComment)

router.param('userId',userById)
router.param("blogId",BlogById)
module.exports=router;

