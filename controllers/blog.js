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
			//console.log(blog)
			console.log("blog",blog.hashTags)
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
	Blog.find({SaveMode:1}).select("-BlogImg").sort({ViewCounts:-1,createdAt:-1}).skip(6)
	.exec(
		 function (err,result)
		 {

		 res.json({
		 	result
		      })
		 })
}




//show recently Added Blogs


//search by hashtags
exports.SearchByHashTag=(req,res)=>
{
	//const HashTag=new Blog(fields)
	console.log("body",req.body)
	console.log(req.body.hashtag)
	//const 
	Blog.find({$text:{$search:req.body.hashtag}})
	.select("-BlogImg")
	.exec((err,data)=>
	{
		if(err)
		{
			console.log(err)
		}
		console.log(data)
		res.json({data})
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

		console.log("ReadBlogById function")
	const id=req.params.blogId;
	
	const fingerprint=req.params.fingerprint;
	console.log("fingerprint params update",fingerprint)


	Blog.findById(id).select("-BlogImg").exec((err,data)=>
	{

		if(err || !data)
		{
			return res.status(400).json({
				error:"blog not found"	
			})

		}	
					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
					var yyyy = today.getFullYear();
					today = mm + '/' + dd + '/' + yyyy;
					let Item=[]
					console.log("DATA AT 135",data)
					//console.log("ViewStats obj",typeof(JSON.parse(data.ViewStats[0])))
					 data.ViewStats.forEach(ConvertStringObj)	
					 console.log("138")
					 function ConvertStringObj(item,index)
					 {
					 	 Item[index]=data.ViewStats[index]
					 }
					 console.log("objArray",Item)
					 //console.log(JSON.parse(data.ViewStats[0]))
					 let flag= Item.find(flag=>flag.fingerPrint==fingerprint)
					 console.log("flag",flag)
					 let ViewStatsData={"fingerPrint":fingerprint,"dateonview":today}
					 console.log("ViewStatsData",ViewStatsData)
					 console.log("fingerPrint type",typeof(ViewStatsData.fingerPrint))
					 console.log("TESTING")
					 if(flag==undefined)
					 {
					 	console.log("not found")
					 	Blog.updateOne(
							{_id:id},
							{
								//ViewStats:ViewStatsData
								$addToSet:{ViewStats:ViewStatsData}
							}
							,function(err,result)
							{
								console.log(result)
									  res.json({
							                data
							          		 });
							})
					 }
					 else
					 {
					 	console.log("found")
					 		res.json({data});
					 }


					//console.log("fingerprint params",typeof(fingerprint))
					//let obj = objArray.find(obj => obj.id == 3);
					
					// if(uniqueView==1)
					// {
					// 		console.log(uniqueView)
					// 		Blog.updateOne(
					// 		{_id:id},
					// 		{
					// 				ViewCounts:data.ViewCounts+1
					// 		},function(err,result)
					// 		{
					// 			console.log(result)
					// 				  res.json({
					// 		                data
					// 		          		 });
					// 		})
					// }
					// else
					// {
					// 		res.json({data});
					// }			
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
		 	Blog.find({SaveMode:1}).select("-BlogImg").sort({ViewCounts:-1 ,createdAt:-1}).limit(6).exec(
		 		function (err,result)
		 		{
		 			res.json({
		 					result
		 			})
		 		})
		

}

exports.showNewBlog=(req,res)=>
{
		 
		//show mostly viewed and if views are same then show latest created
		 	Blog.find({SaveMode:1}).select("-BlogImg").sort({createdAt:-1}).limit(6).exec(
		 		function (err,result)
		 		{
		 			res.json({
		 					result
		 			})
		 		})
		

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

exports.showMyBlogs=(req,res)=>
{
	const Userid=(req.profile._id).toString()
	console.log(typeof(Userid))
	console.log(req.profile)

	Blog.find({SaveMode:1,UserId:Userid})
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




