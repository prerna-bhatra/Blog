const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {createBlog}=require('../controllers/blog')

router.post("/blog/:userId",createBlog)

router.param('userId',userById)
module.exports=router;