const mongoose=require("mongoose");

const CommentsSchema=new mongoose.Schema({
	UserId:
	{
		type:Object,
		require:true
    }
    ,
    UserName:
    {
      type:String
    }
    ,
    CommentName:
    {
        type:String,
        required:true
    },
    HighlightTextYcordinator:
    {
        type:Number,
      //  required:true
    },
    HighlightTextRangeStartOffest:
    {
        type:Number,
       // required:true
    },
    HighlightTextRangeEndOffest:
    {
        type:Number,
       // required:true
    }


},
{
	timestamps:true
}
);

module.exports=mongoose.model("Comments",CommentsSchema);