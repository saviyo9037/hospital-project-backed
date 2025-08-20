const express=require("express");
const appoimentController = require("../controller/appointmentController");
const isAuth = require("../middleware/authMiddleware");
const authController = require("../controller/authController");
const roleMiddleware = require("../middleware/roleAuth");


const appointmentroute=express.Router()

appointmentroute.post("/", isAuth,roleMiddleware("admin","patient","doctor"),appoimentController.create)
appointmentroute.get("/:id",appoimentController.getall)

appointmentroute.put("/:id",appoimentController.update)
appointmentroute.delete("/:id",appoimentController.delete)

module.exports=appointmentroute;
