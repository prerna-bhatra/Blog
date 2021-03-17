const mongoose=require("mongoose");

const BlogSchema=new mongoose.Schema({
	UserId:
	{
		type:Object,
     require:true
    }
    ,
    SaveMode:
    {
        type:Number,
        require:true
    }
    ,
    UserName:
    {
      type:String,
      //  require:true
    },
    ViewStats:
    {
       // "fingerPrint":
       // {
       //  "type": String,
       //  "value": []
       // },
       //  "dateonview":
       //  {
       //  "type":Number,
       //  "value":[]
       //   }
       type:[]
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
    PublicComment:
    {
      type:Number,
      default:0
    },
    PrivateComment:
    {
      type:Number,
      default:0
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



