const User=require('../models/User.js')
const jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt')

exports.signup=(req,res)=>
{
    console.log("reqbody",req.body);
    const {email}=req.body;
    User.findOne({email},(err,user)=>
	{
        if(user)
        {
            const Error="email already exists"
            console.log("email already exists")
            return res.status(400).json({
               Error
            })
        }
        else{
            const users=new User(req.body);
            if(req.body.name===undefined || req.body.email===undefined || req.body.password===undefined)
            {
                    console.log("all fields are required")
            }
            else{
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
            }    
        }

	})
   
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
		const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
		//persist the token as 't' in cookie with expiry date

		res.cookie('t',token,{expire:new Date()+9999})

		//return response
		const {_id,name,email,role,address,contact}=user
		return res.json({token,user:{_id,email,name,role}});

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
	
	res.json({message:"Signout success"});
}

