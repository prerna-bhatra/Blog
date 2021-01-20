const Blog=require('../models/Blog.js')
var formidable = require('formidable');
const lodash= require('lodash');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

exports.createBlog=(req,res)=>
{
	console.log(req.body)
	 let form=new formidable.IncomingForm()
	 //console.log(form)
	 //console.log(typeof(form))
	 form.keepExtensions=true
	form.parse(req,(err,fields,files)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:'Image could not be uploaded'
			})
		}
		let blog=new Blog(fields)
		//console.log(blog)
		console.log("files",files)
		if(files.BlogImg)
		{
			blog.BlogImg.data=fs.readFileSync(files.BlogImg.path)
			blog.BlogImg.contentType=files.BlogImg.type

		}
			console.log(blog)

		blog.save((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"Blog not created"
			})
		}
		res.json(data)
	})
	})	
    
}





exports.FetchPublicBlog=(req,res)=>
{
	Blog.find({SaveMode:1})
	.select("-BlogImg")
	.exec((err,data)=>
	{
		  if (err) {
                return res.status(400).json({
                    error: "Blogs not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
	}
	)


}


exports.BlogById=(req,res,next,id)=>
{
	Blog.findById(id).exec((err,data)=>
	{
		if(err || !data)
		{
			return res.status(400).json({
				error:"blog not found"	
			})
		}

		req.data=data
		next()
	})
}


exports.ReadBlogById=(req,res)=>
{

	const id=req.params.blogId;
	//it will be 0 if user has cookies set in device otherwise 1
	const uniqueView=req.params.uniqueView;
	console.log(id)

	Blog.findById(id).select("-BlogImg").exec((err,data)=>
	{
		if(err || !data)
		{
			return res.status(400).json({
				error:"blog not found"	
			})
		}
					if(uniqueView==1)
					{
							console.log(uniqueView)
							Blog.updateOne(
							{_id:id},
							{
									ViewCounts:data.ViewCounts+1
							},function(err,result)
							{
								console.log(result)
									  res.json({
							                data
							          		 });
							})
					}
					else
					{
							res.json({data});
					}
					
					//console.log(data)
					//console.log("user visiting first time so add a view on thee blog post")
					//console.log(id,typeof(userId))
					/*Blog.updateOne(
				    { _id: id },
				    { $addToSet: { viewedBy: [{'uniqueView':uniqueView}] } },
				    function(err, result) {
				      if (err) {
				        res.send(err);
				      } else {
				        //res.send(result);
						        res.json({
		                data
		           });
						      }
				    }
				  );
				  */
	})
	
}


//fetch blog images seprately
exports.photo=(req,res,next)=>{
		//set the contet type
		res.set('Contetnt-Type',req.data.BlogImg.contentType)
		console.log(req.data)
		return res.send(req.data.BlogImg.data)
	
	next()
}


//show top 6 posts(trending)
exports.showTrendingBlog=(req,res)=>
{
		 
		//show mostly viewed and if views are same then show latest created
		 	Blog.find().select("-BlogImg").sort({ViewCounts:-1 ,createdAt:-1}).limit(6).exec(
		 		function (err,result)
		 		{
		 			res.json({
		 					result
		 			})
		 		})
			// ProjectModel.find({projectName: 'name'}).sort({viewCount: -1}).limit(5).exec( 
			//     function(err, projects) {
			//         ...
			//     }
			// );

}


exports.showdrafts=(req,res)=>
{
	const Userid=(req.profile._id).toString()
	console.log(typeof(Userid))
	console.log(req.profile)

	Blog.find({SaveMode:0,UserId:Userid})
	.select("-BlogImg")
	.exec((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"blog not found"	
			})	
			
		}
		res.json({
                data
           });
	}
	)

}


/*
exports.UpdateViews=(req,res)=>
{

}

*/




