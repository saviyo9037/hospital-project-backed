const mongoose=require('mongoose');
const Doctormodel=new mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
    },
    spectialist:{
        type:String,
        require:true
    },
     address: String,
    experience:{
        type:Number,
        required:true
    }
})

const doctor=mongoose.model('doctor',Doctormodel);
module.exports=doctor