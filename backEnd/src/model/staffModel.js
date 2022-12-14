const mongoose= require("mongoose")

const staffSchema=  new mongoose.Schema(
    {
        fullName:{
            type:String,
            require:true},
        phone: {
            type:String, 
            require:true, 
            unique:true}, 
        emailId:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
        },
       
    },
    { timestamps: true }
)
module.exports = mongoose.model("staff", staffSchema);