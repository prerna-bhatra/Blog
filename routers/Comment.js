const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {comment,ReadComment,MyComments}=require('../controllers/comments');

router.post("/comment/:userId",comment)
router.get("/MyComments/:userId",MyComments)
router.get("/comments",ReadComment)

router.param('userId',userById)
module.exports=router;
