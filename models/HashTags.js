const mongoose=require("mongoose");

const HashTagSchema=new mongoose.Schema({
	hashtags:
	{
		type:String,
		require:true
    }

},
{
	timestamps:true
}
);


module.exports=mongoose.model("HashTag",HashTagSchema);
