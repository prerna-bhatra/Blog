const mongoose=require("mongoose");

const FingerPrintSchema=new mongoose.Schema({
	FingerPrintField:
    {
        type:String,
        require:true
    },
    ReadCount:
    {
        type:[],
        default:0
    },
    isUser:
    {
        type:Number,
        default:0,
        require:true
    }

},
{
	timestamps:true
}
);

module.exports=mongoose.model("FingerPrint",FingerPrintSchema);