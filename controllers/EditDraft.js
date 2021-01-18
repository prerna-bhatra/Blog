const EditedDraftModel=require('../models/EditDraft.js')
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
				const VersionArray=[]
				data.forEach(copydata)
				function  copydata(item,index)
				{
					datesArray[index]=data[index].createdAt
					VersionArray[index]=data[index].version
				}
				//console.log(VersionArray)
				var maxDate=new Date(Math.max.apply(null,datesArray)).toDateString();
				var TodayDate = new Date().toDateString();

				//console.log(maxDate,TodayDate)
				if(maxDate===TodayDate)
				{
					//console.log("yes")
					const LastVersion=Math.max(...VersionArray)
					const NewVersion=LastVersion;
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
						const LastVersion=Math.max(...VersionArray)
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
				if(files.EditedImg)
				{
					editdraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					editdraft.EditedImg.contentType=files.EditedImg.type

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
						editdraft.version=NewVersion
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
				if(files.EditedImg)
				{
					editdraft.EditedImg.data=fs.readFileSync(files.EditedImg.path)
					editdraft.EditedImg.contentType=files.EditedImg.type

				}
					//console.log(EditedDraftModel)
						editdraft.BlogId=blogid;
						editdraft.UserId=user._id;
						editdraft.UserName=user.name
						editdraft.version=1
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
