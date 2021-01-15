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
    },
    EditedHeading:
    {
        type:String
    },
    EditedImg:
    {

       data: Buffer,
        contentType: String
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

//updatedAt will be matched with today date then if dates are same then 1.0.11 ,1.0.12....
//if dates are not same then add 1 for example 2.0.11,...and so on
