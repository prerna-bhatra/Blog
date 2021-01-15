const express=require("express");
const router=express.Router();

const {
	userById
}=require('../controllers/User');
const {EditDraft,FetchEditedDraft,EditDraftById,photo}=require('../controllers/EditDraft')
const {BlogById}=require('../controllers/blog')
//
router.post("/EditDraft/:userId/:blogId",EditDraft)
router.get("/EditDraftfetch/:userId/:blogId",FetchEditedDraft)
router.get("/EditDraftimg/:EditDraftId",photo)
router.param('EditDraftId',EditDraftById)
router.param('userId',userById)
router.param("blogId",BlogById)
module.exports=router;