const mongoose=require("mongoose");

const EditDeaftSchema=new mongoose.Schema({
	UserId:
	{
		type:Object,
		require:true
    }
    ,
    BlogId:
    {
       type:Object
    }
    ,
    UserName:
    {
      type:String
    }
    ,
    EditedContent:
    {
        type:String,
        required:true
    },
    version:
    {
        type:Number
    }

},
{
	timestamps:true
}
);

module.exports=mongoose.model("EditDraft",EditDeaftSchema);