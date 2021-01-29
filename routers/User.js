const express=require("express");
const router=express.Router();

const {signup,signin,signout}=require('../controllers/User');

router.post("/signup",signup)
router.post("/signin/:fingerprint",signin)
router.post("/signout/:fingerprint",signout)


module.exports=router;
