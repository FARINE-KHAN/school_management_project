const staffModel=require("../model/staffModel")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const valid=require("../middleWare/validator")

const register=async(req,res)=>{
  try {
    const {fullName,phone,emailId,password}=req.body
    //---mandatory fields---\\
    if(!fullName){
      return res.status(400).send({error_message:"full name is required"})
    }
    if(!phone){
      return res.status(400).send({error_message:"phone is required"})
    }
    if(!emailId){
      return res.status(400).send({error_message:" emailId is required"})
    }
    if(!password){
      return res.status(400).send({error_message:"password is required"})
    }
    //---validation check---\\
    if(!valid.isValidName(fullName)){
      return res.status(400).send({error_message:"full name is not in valid format"})
    }
    if(!valid.isValidMobile(phone)){
      return res.status(400).send({error_message:"phone is not in valid format"})
    }
    if(!valid.isValidEmail(emailId)){
      return res.status(400).send({error_message:" emailId is invalid"})
    }
    if(!valid.isValidPassword(password)){
      return res.status(400).send({error_message:"password is not in valid format"})
    }
    const userPhone=await staffModel.findOne({phone})
    if(userPhone){
        return res.status(400).send({message:"phone number is already register"})
    }
    const user=await staffModel.findOne({emailId})
    if(user){
        return res.status(400).send({message:"email is already register"})
    }
    req.body.password=await bcrypt.hash(password,10)
    const dataCreate=await staffModel.create(req.body)
    return res.status(201).send(dataCreate)
  } catch (error) {
    return res.status(500).send({err:error.message})
  }
}
//===============================loginuser========================//
const loginUser = async function (req, res) {
  try {
    let  { emailId, password } =req.body;

      if(!emailId){return res.status(400).send({ status: false, message: "email is required" })}

      if(!(password)){return res.status(400).send({ status: false, message: "password is required" })}

    let getUser = await staffModel.findOne({ emailId });
    if (!getUser)
      return res
        .status(404)
        .send({ status: false, msg: "User not found or Email Id is invalid" });

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword)
      return res
        .status(401)
        .send({ status: false, msg: "Password is incorrect." });

    //To create token
    const token = jwt.sign(
        {
          userId: getUser._id.toString(),
          batch: "Plutonium",
        },
        "project-pltm",
         {expiresIn : "24h"}
      );
    return res
      .status(200)
      .send({
        status: true,
        message: "Success",
        data: { token: token },
      });
  } catch (err) {
    console.log(err.message);
     res
      .status(500)
      .send({ status: false, message: "Error", error: err.message });
  }
};
module.exports={register,loginUser}

