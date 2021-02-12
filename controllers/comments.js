const Comment=require('../models/Comments.js')
const Blog=require('../models/Blog.js')

exports.comment=(req,res)=>
{
    console.log("reqbody",req.body);
    console.log("params",req.profile)
    console.log("blog id",req.params.blogId)
   req.body.UserId=req.profile._id
    const comment=new Comment(req.body)
   console.log("comment data",comment)
   //from params it search blog and user if they are valid then it will save comment 
    comment.save((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"comment not created"
			})
		}
		else
		{
		 if(comment. CommentPrivacy===1)
		 {
		 	Blog.findByIdAndUpdate(req.params.blogId,  {$inc: { PublicComment: 1}  }, 
                            function (err, docs) { 
				    if (err){ 
				        console.log(err) 
				    } 
				    else{ 
				        console.log("Updated blog  : ", docs); 
				        res.json(data)
				    } 
				}); 
		 	
		 }
		 else if(comment. CommentPrivacy===0)
			Blog.findByIdAndUpdate(req.params.blogId,  {$inc: { PrivateComment: 1}  }, 
                            function (err, docs) { 
				    if (err){ 
				        console.log(err) 
				    } 
				    else{ 
				        console.log("Updated blog  : ", docs); 
				        res.json(data)
				    } 
				}); 
		 	
		}
		
	})

    
};

exports.ReadComment=(req,res)=>
{  
	const blogId=req.params;
	console.log(blogId)
	Comment.find({BlogId:req.params.blogId,CommentPrivacy:1},(err,data)=>
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

	console.log(req.params.blogId)
	console.log(Userid)
	Comment.find({UserId:req.profile._id,BlogId:req.params.blogId},(err,data)=>
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










