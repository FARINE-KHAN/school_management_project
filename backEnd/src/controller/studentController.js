const studentModel=require("../model/studentModel")
const staffModel=require("../model/staffModel")
const valid=require("../middleWare/validator")

const addStudent=async(req,res)=>{
  try {
    const {staffId,fullName,subject,marks}=req.body
    //---mandatory fields---\\
    if(!fullName){
      return res.status(400).send({error_message:"full name is required"})
    }
    if(!staffId){
      return res.status(400).send({error_message:"staffId is required"})
    }
    if(!subject){
      return res.status(400).send({error_message:" subject is required"})
    }
    if(!marks){
      return res.status(400).send({error_message:"marks is required"})
    }
    //---validation check---\\
    if(!valid.isValidName(fullName)){
      return res.status(400).send({error_message:"full name is not valid"})
    }
    if(!valid.isValidObjectId(staffId)){
      return res.status(400).send({error_message:"staffId is not valid"})
    }
    if(!valid.isValidEnum(subject)){
      return res.status(400).send({error_message:" subject is not valid"})
    }
    if(!valid.isValidNumber(marks)){
      return res.status(400).send({error_message:"marks is not valid"})
    }
   //===checking if already exist===\\
    const exist=await studentModel.findOne({fullName,subject,isDeleted:false})
    if(exist){
      exist.marks+=marks
      await exist.save()
      return res.status(200).send({success_message:"student already exist",data:exist})
    }else{
    const dataCreate=await studentModel.create(req.body)
    return res.status(201).send(dataCreate)}
  } catch (error) {
    return res.status(500).send({err:error.message})
  }
} 
/***FETCH api***/

const viewStudent=async (req,res)=>{
 try {
   const {name,subject}=req.query
   let filter={isDeleted:false}
   if(name){
    filter.fullName={ $regex: name, $options: 'i' }
   }
   if(subject){
    filter.subject={ $regex: subject, $options:'i'}
    }
  const findData= await studentModel.find(filter)
  return res.status(200).send(findData)

 } catch (error) {
  return res.status(500).send({err:error.message})
  
 }
}
/***EDIT api***/

const editStudent=async (req,res)=>{
  try {
    const {name,subject,marks}=req.body
    let {studentId}=req.params

    if(!studentId){
      return res.status(400).send({error_message:"studentId is required"})
    }
    if(!valid.isValidObjectId(studentId)){
      return res.status(400).send({error_message:"studentId is not valid"})
    }
   let updateData={}
   if(name){
    if(!valid.isValidName(name)){
      return res.status(400).send({error_message:"full name is not valid"})
    }
    updateData.fullName=name
   }
   if(subject){
    if(!valid.isValidEnum(subject)){
      return res.status(400).send({error_message:" subject is not valid"})
    }
    updateData.subject=subject
   }
   if(marks){
    if(!valid.isValidNumber(marks)){
      return res.status(400).send({error_message:"marks is not valid"})
    }
    updateData.marks=marks
   }
   const updatedData= await studentModel.findByIdAndUpdate(studentId,updateData,{new:true})
   if(!updatedData){
   return res.status(400).send({error_message:"no such student exist"})
   }else{
   return res.status(200).send({updated_data:updatedData})}
  } catch (error) {
    return res.status(500).send({err:error.message})
  }}
/***delete api***/
 const deleteStudent = async function(req, res) {
      try {
          let  {studentId}= req.params
          if(!studentId){
            return res.status(400).send({error_message:"studentId is required"})
          }
          if(!valid.isValidObjectId(studentId)){
            return res.status(400).send({error_message:"studentId is not valid"})
          }
          let student = await studentModel.findOne({_id:studentId, isDeleted : false})
  
          if(student) {
              student.isDeleted = true
              student.deletedAt=new Date()
              student.save()
              return res.status(200).send({status: true, msg: "Student deleted"})
          } else {
              return res.status(404).send({status:false, error_message: "Student not found"})
          }
      } catch (error) {
          return res.status(500).send({status:false, msg: error.message})
      }
  }
module.exports={addStudent,viewStudent,editStudent,deleteStudent}