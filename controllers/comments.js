const Comment=require('../models/Comments.js')

exports.comment=(req,res)=>
{
    console.log("reqbody",req.body);
    console.log("params",req.profile)
   req.body.UserId=req.profile._id
    const comment=new Comment(req.body)
   // console.log(comment)
    comment.save((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"comment not created"
			})
		}
		res.json(data)
	})

    
};

exports.ReadComment=(req,res)=>
{  
	const CommentsArray=[]
Comment.find((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"no comments"
			})
		}
		res.json(data)
		
	})

    
};

exports.MyComments=(req,res)=>
{
	const Userid=req.profile
	console.log(Userid)
	Comment.find({UserId:req.profile._id},(err,data)=>
	{
		//console.log(res)
		if(err)
		{
			return res.status(400).json({
				error:"no comments"
			})
		}
		res.json(data)

	})
}










