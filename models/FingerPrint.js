const mongoose=require("mongoose");

const FingerPrintSchema=new mongoose.Schema({
	FingerPrintField:
    {
        type:String,
        require:true
    },
    ReadCount:
    {
        type:Number,
        default:1
    }

},
{
	timestamps:true
}
);

module.exports=mongoose.model("FingerPrint",FingerPrintSchema);