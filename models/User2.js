const mongoose=require("mongoose");
const crypto=require('crypto');
const {v1:uuidv1}=require("uuid")

const userSchema=new mongoose.Schema({
	name:
	{
		type:String,
		require:true
	}
	,
	email:
	{
		type:String,
		require:true
	},
	profile:
	{
        //teacher
		type:String,
		require:true
	}

},
{
	timestamps:true
}
);


userSchema.index({name:1,email:1})


module.exports=mongoose.model('User2',userSchema);
