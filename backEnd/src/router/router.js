const express = require ('express')
const router = express.Router()
const staffController=require("../controller/staffController")
const studentController=require("../controller/studentController")
const {authentication,authorization}=require("../middleWare/auth")


router.post("/register",staffController.register)
router.post("/login",staffController.loginUser)

router.post("/student",authentication,authorization,studentController.addStudent)
router.get("/student/details",authentication,authorization,studentController.viewStudent)
router.put("/student/details/edit/:studentId",authentication,authorization,studentController.editStudent)
router.delete("/student/details/delete/:studentId",authentication,authorization,studentController.deleteStudent)



router.all("/*", (req, res) => 
{ res.status(400).send({ status: false, message: "Endpoint is not correct" }) })


module.exports = router
