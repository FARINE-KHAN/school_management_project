const mongoose= require("mongoose")

const studentSchema=new mongoose.Schema({
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"staff"
    },
    fullName:{
        type:String,
        require:true
    },
    subject:{
       type:String,
       enum:["Maths","DSA","JavaScript"],
       require:true
    },
    marks:{
       type:Number,
       require:true
    }, 
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
         type:Date,
         default:null
    },

} ,
    { timestamps: true }
)
module.exports = mongoose.model("student", studentSchema);