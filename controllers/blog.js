const Blog=require('../models/Blog.js')
var formidable = require('formidable');
const lodash= require('lodash');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

exports.createBlog=(req,res)=>
{
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
		let blog=new Blog(fields)
		console.log(blog)
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
