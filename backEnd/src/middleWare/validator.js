const mongoose = require("mongoose");

const isValidName = function (value) {
  if (/^[A-Z][a-z]\D*$/.test(value)&& typeof value === "string" && value.trim().length > 0)
    {return true;}
   return false;
};

const isValidMobile = function (value) {
  if (typeof value === "string" && /^[6-9]{1}[0-9]{9}$/im.test(value)) return true;
  return false;
};
const isValidEnum=(v)=>{
  if(["Maths","DSA","JavaScript"].includes(v))return true;
  return false;
}

const isValidEmail = function (value) {
  if (/^[\w-\.staff]+@([xyzSchool]+\.)+[org]{2,4}$/.test(value)) return true;
  return false;
};
const isValidPassword = function (value) {
  if ( typeof value === "string" && value.trim().length > 0 && /[a-zA-Z0-9]{8,15}$/.test(value)) return true;
  return false;
};

const isValidNumber = (value) => {
  return /[0-9]$/.test(value)
}
const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
}


module.exports = {  isValidObjectId, isValidEmail, isValidPassword,
 isValidName, isValidMobile,  isValidNumber,isValidEnum};
