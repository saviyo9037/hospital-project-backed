const express=require('express')
const patientController = require('../controller/patientController')
const isAuth = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleAuth')

const patientRouter=express.Router()

patientRouter.post("/",patientController.create)
patientRouter.get("/get",isAuth,roleMiddleware ("patient","admin"), patientController.getall)
patientRouter.get("/:userId",patientController.getone)
patientRouter.delete("/:id",patientController.delete)
patientRouter.put("/:id", isAuth ,roleMiddleware("admin","patient") ,patientController.update)


module.exports=patientRouter