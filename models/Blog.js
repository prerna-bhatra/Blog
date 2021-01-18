const mongoose=require("mongoose");

const BlogSchema=new mongoose.Schema({
	UserId:
	{
		type:Object
    }
    ,
    SaveMode:
    {
        type:Number
    }
    ,
    UserName:
    {
      type:String
    }
    ,
    BlogHeading:
    {
        type:String,
        required:true
    },
    BlogContent:
    {
       type:String,
        required:true
      //  required:true
    },
    BlogImg:
    {
       data: Buffer,
        contentType: String
    },
    DraftId:
    {
        //this will be saved after we publish the draft
          type:String
    }

},
{
	timestamps:true
}
);

module.exports=mongoose.model("Blogs",BlogSchema);



