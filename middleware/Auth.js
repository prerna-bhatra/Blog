const jwt=require('jsonwebtoken')
const User=require('../models/User')


exports.auth=(req,res,next)=>
{
	const token=req.header('Authorization')
	console.log(token)
	next()

}