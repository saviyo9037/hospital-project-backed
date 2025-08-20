const express=require("express")
const authController = require("../controller/authController")

const authrouter=express.Router()

authrouter.post("/",authController.create)
authrouter.post("/login",authController.loginUser)


module.exports=authrouter