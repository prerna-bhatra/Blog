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
    },
    ViewCounts:
    {
        type:Number,
        default:0
    }
   /* viewedBy:
    {
        type : Array 
    }*/
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
    },
    hashTags: 
          {
            type:String
          }
            

},
{
	timestamps:true
}
);

BlogSchema.index({hashTags:'text'})

module.exports=mongoose.model("Blogs",BlogSchema);



