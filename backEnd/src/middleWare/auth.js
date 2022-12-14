const jwt = require("jsonwebtoken");
const staffModel = require("../model/staffModel");
const valid = require ("../middleWare/validator")

const authentication = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token)
            return res.status(401).send({ status: false, msg: "token is required" });
        let btoken=token.split(" ")
        jwt.verify(btoken[1],"project-pltm", (error, decoded) =>{
            if (error) {
               let message=(error.message=="jwt expired"?"token is expired,please login again":"token is invalid,not authenticated")
                 return res.status(401).send({ status: false, msg:message });
            } else {
              req.token = decoded;
                next(); }
        });
    } catch (error) {
        res.status(500).send({ status: false, err: error.message });
    }
};
const authorization=async (req,res,next)=>{
    try {
        const staffId=req.body.staffId
        if(!staffId){
            return res.status(400).send({error_message:"staffId is required"})
          }
          if(!valid.isValidObjectId(staffId)){
            return res.status(400).send({error_message:"staffId is not valid"})
        }
        let decodedToken=req.token
        if(!valid.isValidObjectId(staffId)){return res.status(400).send({status:false,message:"plz enter valid userId"})}
        let user=await staffModel.findById(staffId)
        if(!user){
            return res.status(404).send({status:false,message:"user not found"})
        }
        if(staffId!=decodedToken.userId){
            return res.status(403).send({status:false,message:"you are not authorised"})
            
        }else{
            next()
        }
        
    } catch (error) {
        res.status(500).send({ status: false, err: error.message });
    }
}

module.exports={authentication,authorization}