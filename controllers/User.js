const User=require('../models/User.js')
const FingerPrintModel=require('../models/FingerPrint.js')
const jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
const { conformsTo } = require('lodash');

exports.signup=(req,res)=>
{
	console.log("SIGNUP HFGHDVBJH ")
	const users=new User(req.body);
	console.log("USRE",users)
	users.save((err,user)=>
	{
		if(err)
		{
			return res.status(400).json({
				err
			})
		}
		
		console.log("saving ")
		 res.json({
			user
		})
	})

    console.log("INSERT",req.body);
    // const {email}=req.body;
    // User.findOne({email},(err,user)=>
	// {
	// 	console.log("HEY INSERT  ")
    //     if(user)
    //     {
    //         const Error="email already exists"
    //         console.log("email already exists")
    //         return res.status(400).json({
    //            Error
    //         })
    //     }
    //     else{
    //         const users=new User(req.body);
	// 		// / || req.body.email===undefined || req.body.password===undefined
    //         if(req.body.name===undefined)
    //         {
    //                 console.log("all fields are required")
    //         }
    //         else{
    //             users.save((err,user)=>
    //         {
    //             if(err)
    //             {
    //                 return res.status(400).json({
    //                     err
    //                 })
    //             }
                
    //             console.log("saving ")
    //              res.json({
    //                 user
    //             })
    //         })
    //         }    
    //     }

	// })
   
};




exports.signin=(req,res)=>
{
	//find the user on email

	const {email,password}=req.body;
	console.log(email,password)
	User.findOne({email},(err,user)=>
	{
		console.log(err)
		console.log(user)
		if(err || !user)
		{
			return res.status(400).json({err:'email not exist'});
		}
			if(!user.authenticate(password))
			{
				return res.status(401).json(
				{
					error:'email and password not matching'
				});
			}

		//generate a toekn
		const payLoad={_id:user._id,name:user.name,email:user.email}
		const token=jwt.sign({payLoad:payLoad},process.env.JWT_SECRET)
		//persist the token as 't' in cookie with expiry date

		res.cookie('t',token,{expire:new Date()+9999})
		const fingerprint=req.params.fingerprint;

		FingerPrintModel.findOneAndUpdate({FingerPrintField:fingerprint}, {
						  				$set: {FingerPrintField: fingerprint,isUser:1}}, 
						  				{new: true, upsert: true},function (err,data)
						  				{
						  					console.log("vgxvhgdv")
						  				const {_id,name,email,role,address,contact}=user
										return res.json({token,user:{_id,email,name,role}});
						  				}	
						  				)
		console.log("LET'S TRY")
		//return response
		

	})
}


exports.userById=(req,res,next,id)=>
{
	User.findById(id).exec((err,user)=>
	{
		if(err || !user)
		{
			return res.status(400).json({
				error:'User not found'
			})
		}
		req.profile=user;
		next();
	})
}



exports.signout=(req,res)=>
{
		const fingerprint=req.params.fingerprint;

		FingerPrintModel.findOneAndUpdate({FingerPrintField:fingerprint}, {
						  				$set: {isUser:0}}, 
						  				{new: true, upsert: true},function (err,data)
						  				{
						  					console.log("vgxvhgdv")
										res.json({message:"Signout success"});
						  				}	
						  				)

}


exports.SearchByUser=(req,res)=>
{
	//const HashTag=new Blog(fields)
	console.log("body",req.body)
	console.log(req.body.search)
	const searchString=req.body.search
	User.find( {  
		 "$or": [
        { name: { '$regex':searchString } },
        { email: { '$regex': searchString } }
    ]
   }
   ,{name:1,email:1,_id:0},
	(err,data)=>
	{
		if(err)
		{
			console.log('WEEE', err);
		}
		// console.log("DATA LEN",data)
	res.json({
		data
	})
   })
//    .explain()
   
}


//import
