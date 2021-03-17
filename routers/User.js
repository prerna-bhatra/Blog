const express=require("express");
const router=express.Router();

const {signup,signin,signout,SearchByUser}=require('../controllers/User');

router.post("/signup",signup)
router.post("/signin/:fingerprint",signin)
router.post("/SearchByUser",SearchByUser)
router.get("/signout/:fingerprint",signout)



module.exports=router;
