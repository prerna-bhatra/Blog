const express=require("express");
const router=express.Router();

const {signup,signin,signout,SearchByUser,signup2,SearchByUser2}=require('../controllers/User');

router.post("/signup",signup)
router.post("/signup2",signup2)
router.post("/signin/:fingerprint",signin)
router.post("/SearchByUser",SearchByUser)
router.post("/SearchByUser2",SearchByUser2)
router.get("/signout/:fingerprint",signout)

module.exports=router;
