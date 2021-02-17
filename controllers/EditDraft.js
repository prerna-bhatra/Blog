const EditedDraftModel=require('../models/EditDraft.js')
const Blog=require('../models/Blog.js')
var formidable = require('formidable');
const lodash= require('lodash');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var moment=require('moment')
const {ObjectID} = require('mongodb');
exports.EditDraft=(req,res)=>
{
	//console.log(req.body)
		const blogid=req.params.blogId
		const user=req.profile
		//console.log(user)
		//console.log(blogid)
		EditedDraftModel.find({BlogId:blogid},(err,data)=>
		{
			if(err)
			{
				//console.log(err)
				return res.status(400).json({
				error:'Blog not in draft'
			   })
						
			
			}
			//console.log(data.length)

			if(data.length>0)
			{
				//console.log(data)
				//console.log(Array.isArray(data))
				const datesArray=[]
				const MajorArray=[]
				const BuildArray=[]
				data.forEach(copydata)
				function  copydata(item,index)
				{
					datesArray[index]=data[index].createdAt
					MajorArray[index]=data[index].major
					BuildArray[index]=data[index].build
				}
				console.log(BuildArray)
				var maxDate=new Date(Math.max.apply(null,datesArray)).toDateString();
				var TodayDate = new Date().toDateString();

				//console.log(maxDate,TodayDate)
				if(maxDate===TodayDate)
				{
					//console.log("yes") major will be same if date is same and build will be chnage everytime
					const LastVersion=Math.max(...MajorArray)
					const NewVersion=LastVersion;
					const NewBuild=BuildArray[BuildArray.length-1]
					//console.log(NewVersion)
					let form=new formidable.IncomingForm()
			 form.keepExtensions=true
			form.parse(req,(err,fields,files)=>
			{
				if(err)
				{
					return res.status(400).json({
						error:'Image could not be uploaded'
					})
				}
				let editdraft=new EditedDraftModel(fields)
				//console.log(editdraft)
				//console.log("files",files)
				if(files.EditedImg!==undefined)
				{
					console.log("user wants to chnage image")
					editdraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					editdraft.EditedImg.contentType=files.EditedImg.type
					editdraft.BlogId=blogid;
					editdraft.UserId=user._id;
					editdraft.UserName=user.name
					editdraft.major=NewVersion
					editdraft.build=NewBuild+1
					console.log("and here should be fiinal data ")	
						
						editdraft.save((err,data)=>
					{
						//console.log(err)
						if(err)
						{
							return res.status(400).json({
								error:"draft not created"
							})
						}
						console.log("final data is saving or not ",data)
						res.json(data)
					})

				}
				else
				{
					console.log("User Not selected input image")
					const id = new ObjectID(editdraft.DummyId);
					console.log(id)
					EditedDraftModel.findById(id).exec((err,data)=>
					{
						if(err || !data)
						{
							return res.status(400).json({
								error:"Draft not found"	
							})
						}
						console.log("DummyIddata",data)
						editdraft.EditedImg.contentType = 'image/png';
						console.log('BUFF OR BLUFF', data.EditedImg.data)
						console.log(Buffer.isBuffer(data.EditedImg.data))
				
						editdraft.EditedImg.data = data.EditedImg.data; // Object.assign(editdraft.EditedImg,data.EditedImg)
						console.log("LETS CHECK IF EditDraft IMAGE IS CHANGING")
						console.log(editdraft.EditedImg);
						console.log('LETS BE HONEST2');
						console.log(editdraft);
						//editdraft.EditedImg={...data.EditedImg}
						//req.data=data
						//next()
						console.log("here we are seting key of editdraft model field")
						editdraft.BlogId=blogid;
						editdraft.UserId=user._id;
						editdraft.UserName=user.name
						editdraft.version=NewVersion
					console.log("and here should be fiinal data ")	
				
				editdraft.save((err,data)=>
			{
				//console.log(err)
				if(err)
				{
					return res.status(400).json({
						error:"draft not created"
					})
				}
				console.log("final data is saving or not ",data)
				res.json(data)
			})
					})

				}
					//console.log(EditedDraftModel)

			})	



				}
				else
				{
					console.log('date chnage')
						const LastVersion=Math.max(...MajorArray)
						const NewVersion=LastVersion+1;

						//console.log(NewVersion)
						let form=new formidable.IncomingForm()
			 form.keepExtensions=true
			form.parse(req,(err,fields,files)=>
			{
				if(err)
				{
					return res.status(400).json({
						error:'Image could not be uploaded'
					})
				}
				let editdraft=new EditedDraftModel(fields)
				//console.log(editdraft)
				//console.log("files",files)
				if(files.EditedImg!==undefined)
				{
					editdraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					editdraft.EditedImg.contentType=files.EditedImg.type
					editdraft.BlogId=blogid;
						editdraft.UserId=user._id;
						editdraft.UserName=user.name
						editdraft.major=NewVersion
						editdraft.build=0
						// editdraft.version=NewVersion
					console.log("and here should be fiinal data ")	
				
				editdraft.save((err,data)=>
			{
				//console.log(err)
				if(err)
				{
					return res.status(400).json({
						error:"draft not created"
					})
				}
				// console.log("final data is saving or not ",data)
				res.json(data)
			})

				}
				else
					{
							console.log("User Not selected input image")
					const id = new ObjectID(editdraft.DummyId);
					console.log(id)
					EditedDraftModel.findById(id).exec((err,data)=>
					{
						if(err || !data)
						{
							return res.status(400).json({
								error:"Draft not found"	
							})
						}
						console.log("DummyIddata",data)
						editdraft.EditedImg = Object.assign(editdraft.EditedImg,data.EditedImg)
						//editdraft.EditedImg={...data.EditedImg}
						//req.data=data
						//next()
						editdraft.BlogId=blogid;
						editdraft.UserId=user._id;
						editdraft.UserName=user.name
						editdraft.build=0
						console.log('LETS BE HONEST');
						console.log(editdraft);
							editdraft.save((err,data)=>
			{
				//console.log(err)
				if(err)
				{
					return res.status(400).json({
						error:"draft not created"
					})
				}
				res.json(data)
			})
					})
					}
							//console.log(EditedDraftModel)
						
			
			})	


				}
			}
			else
			{
				console.log("Updating First Time")
				let form=new formidable.IncomingForm()
			 form.keepExtensions=true
			form.parse(req,(err,fields,files)=>
			{
				if(err)
				{
					return res.status(400).json({
						error:'Image could not be uploaded'
					})
				}
				let editdraft=new EditedDraftModel(fields)
				//console.log(editdraft)
				//console.log("files",files)
				if(files.EditedImg!==undefined)
				{
					editdraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					editdraft.EditedImg.contentType=files.EditedImg.type

				}
					//console.log(EditedDraftModel)
						editdraft.BlogId=blogid;
						editdraft.UserId=user._id;
						editdraft.UserName=user.name
				editdraft.save((err,data)=>
			{
				//console.log(err)
				if(err)
				{
					return res.status(400).json({
						error:"draft not created"
					})
				}
				res.json(data)
			})
			})	
			}

		})

}


//publish draft 

exports.PublishDraft=(req,res)=>
{
	const blogid=req.params.blogId
	const user=req.profile
	const drefatId=req.params.EditDraftId
	let form=new formidable.IncomingForm()
	console.log("formdata",form)
	form.keepExtensions=true
	form.parse(req,(err,fields,files)=>
			{
				if(err)
				{
					return res.status(400).json({
						error:'Image could not be uploaded'
					})
				}
				let publishDraft=new Blog(fields)
				console.log("new fields",publishDraft)
				console.log("DrfatId",req.params.EditDraftId)
				if(files.BlogImg===undefined)
				{
					//it means user is not  changing none of the data then we will update only saveMode  and make it public 
					//but here  may be two condition one is that user may update a draft or user may just publish the original blog
					//publishDraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					//publishDraft.EditedImg.contentType=files.EditedImg.type
					//for original blog we will just update the saveMode 
					//but for publishing draft we will find the blog by draftit in editdraftmodel and for that we will send draftid 
					//in params and if it will be 0 then original data is being pblished otherwise draftid will not be 0 and we will update it
						console.log("Image is not getting changed")
					if(req.params.EditDraftId==0)
					{
						//original blog publish
						console.log("Blog Id ",blogid)
						Blog.
						update(
					  {_id: blogid}, 
					  {$set: {'BlogHeading': publishDraft.BlogHeading,'BlogContent':publishDraft.BlogContent,'SaveMode':1}}, 
					  (req,res)=>
					  {
					  		if(err)
					  		{
					  			console.log(err)
					  		}
					  		console.log("after update",res)
					  })
					}
					else
					{

					EditedDraftModel.findById(req.params.EditDraftId).exec((err,data)=>
					{
						if(err || !data)
						{
							return res.status(400).json({
								error:"Draft not found"	
							})
						}
					console.log("Data from version",data)
					Blog.
						update(
					  {_id: blogid}, 
					  {$set: {'BlogHeading': publishDraft.BlogHeading,'BlogImg.data':data.EditedImg.data,'BlogImg.contentType':data.EditedImg.contentType,'BlogContent':publishDraft.BlogContent,'SaveMode':1}}, 
					  (req,res)=>
					  {
					  		if(err)
					  		{
					  			console.log(err)
					  		}
					  		console.log("after update",res)
					  })
					})
					}
					
				}
				else
				{	

					
					//it means user  wants to chnage image also
					console.log("user wants to chnage image along with other data other data may be may not be changed")
					Blog.
						update(
					  {_id: blogid}, 
					  {$set: {'BlogHeading': publishDraft.BlogHeading,'BlogImg.data':fs.readFileSync(files.BlogImg.path),'BlogImg.contentType':files.BlogImg.type,'BlogContent':publishDraft.BlogContent,'SaveMode':1}}, 
					  (req,res)=>
					  {
					  		if(err)
					  		{
					  			console.log(err)
					  		}
					  		console.log("after update",res)
					  })
					

				}
						
					})	

			
}



exports.FetchEditedDraft=(req,res)=>
{

	const blogId=req.params.blogId;
	const user=req.profile
	//console.log(req.profile)
	EditedDraftModel.find({BlogId:blogId,UserId:user._id})
	.select("-EditedImg")
	.exec((err,data)=>
	{
		  if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
	}
	)
}



exports.EditDraftById=(req,res,next,id)=>
{
	console.log("if id is 0 it means original data is being published",id)
	if(id==0)
	{
		console.log("if condition")
		next()
	}
	else
	{
		console.log("else condition")

	EditedDraftModel.findById(id).exec((err,data)=>
	{
		if(err || !data)
		{
			return res.status(400).json({
				error:"Draft not found"	
			})
		}

		req.data=data
		next()
	})
	}
}


exports.ReadBlogById=(req,res)=>
{
	var id=req.params.blogId;
	//console.log(id)
Blog.findById(id).select("-BlogImg").exec((err,data)=>
	{
		if(err || !data)
		{
			return res.status(400).json({
				error:"blog not found"	
			})
		}

		res.json({
                data
           });
		
	})
	
}


//fetch blog images seprately
exports.photo=(req,res,next)=>{
		//set the contet type
		res.set('Contetnt-Type',req.data.EditedImg.contentType)
		//console.log(req.data)
		return res.send(req.data.EditedImg.data)
	
	next()
}


exports.showdrafts=(req,res)=>
{
	const Userid=(req.profile._id).toString()
	//console.log(typeof(Userid))
	//console.log(req.profile)

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


exports.DeleteDraft=(req,res)=>
{
		const Draftid=req.params.EditDraftId
		EditedDraftModel.remove({_id:Draftid},function(err,result){
			//console.log(result)
			if(err)
			{
				res.send({"Error":err})
			}

			res.send({"Success":"deleted"})

		})	
}
