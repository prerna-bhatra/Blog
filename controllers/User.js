const User=require('../models/User.js')
const User2=require('../models/User2.js')
const FingerPrintModel=require('../models/FingerPrint.js')
const jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
const { conformsTo, isArray } = require('lodash');
const { on } = require('../models/User.js');

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


//searching in multiple collection
exports.signup2=(req,res)=>
{
	console.log("SIGNUP HFGHDVBJH ")
	const users=new User2(req.body);
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

//1:1 scanning for searching
exports.SearchByUser=(req,res)=>
{
	const fields=["name","email"]
	// const projectArr=["name"]
	const projectionObj ={"name":1}
	// projectionObj._id=0;
	console.log("PROJECTIONHGHDVBS",projectionObj)
	console.log("body",req.body)
	console.log(req.body.search)
	const searchString=req.body.search
	console.log("SEARCH STRING",searchString)
	try {
		let TempArr = [] 
		for(var i = 0; i< fields.length; i++){
			console.log("FIELDS",fields[i])
			let a=fields[i];
			console.log("A",a)
			TempArr.push({ [a]: { '$regex':'.*'+searchString+'.*' } });
		}
		console.log(TempArr);
		User.find( {  

			"$or":TempArr
	   },
	   projectionObj
	   ,
		(err,data)=>
		{
			if(err)
			{
				console.log('ERROR', err);
			}
			console.log("DATA LEN",data)
		res.json({
			data
		})
	   })
	   .explain()		
	} catch (error) {
		console.log("ERROR IN CATCH",error)
		
	}
}

//search from multiple collection 
exports.SearchByUser2=async(req,res)=>
{
	let d1,d2;
	const fields=["name","email"]
	// const projectArr=["name"]
	const projectionObj ={"name":1}
	// projectionObj._id=0;
	console.log("PROJECTIONHGHDVBS",projectionObj)
	console.log("body",req.body)
	console.log(req.body.search)
	const searchString=req.body.search
	console.log("SEARCH STRING",searchString)
	

	try {
		let TempArr = [] 
		for(var i = 0; i< fields.length; i++){
			console.log("FIELDS",fields[i])
			let a=fields[i];
			console.log("A",a)
			TempArr.push({ [a]: { '$regex':'.*'+searchString+'.*' } });
		}
		console.log("TEMPARR 1",TempArr);
		console.log("USER MODEL",User)
		
		
		try {
			await User.find( {  
				"$or":TempArr
		   },
		   projectionObj
		   ,
			(err,data)=>
			{
				console.log(err,'erorr check with data',data)
				if(err)
				{
					console.log('ERROR 1', err);
				}
				console.log("DATA LEN",data)
					d1=data
					console.log("D1 IN 1",d1)
		   })
		//    .explain()
			
		} catch (error) {
			console.log("CATCH ERR IN QUEERY 1",er)
			throw new Error(error);
		}

	let TempArr2 = [] 
		for(var i = 0; i< fields.length; i++){
			console.log("FIELDS 22",fields[i])
			let a=fields[i];
			console.log("A 2",a)
			TempArr2.push({ [a]: { '$regex':'.*'+searchString+'.*' } });
		}
		console.log(TempArr2);
		console.log("USER MODEL 2",User2)
		await User2.find( {  

			"$or":TempArr2
	   },
	   projectionObj
	   ,
		(err,data)=>
		{
			if(err)
			{
				console.log('ERROR 2', err);
			}
			console.log("D1 in 2",d1,isArray(d1))
				d2=data
				console.log("D2",d2,typeof(d2))
				const a=[...d1,...d2]
				console.log("aaa",a)
				res.json({
					a
				})
				
	   })	//    .explain()	
		
	} catch (error) {
		throw new Error(error);
	}
		
}




///unionwith

// User.aggregate(
// 	[
// 	{ name: { '$regex':'.*'+searchString+'.*' } }
//    ,
// 	{ $project: { name: 1, _id: 0 } }
// 	,
// 	{
// 		$unionWith: {
// 			coll: 'User2',
// 			"pipeline":[
// 				{
// 					$project: { name: 1, _id: 0 }
// 				}
// 			]
// 		}

// 	}
// ]
// ,(err,data)=>
// {
// 	if(err)
// 	{
// 		console.log("ERR",err)
// 	}
// 	console.log("DATSTVDVNBD",data)

// })	
