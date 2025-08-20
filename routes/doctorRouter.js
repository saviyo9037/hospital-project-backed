const experess=require('express')
const doctorController = require('../controller/doctorController')
const isAuth = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleAuth')

const doctorRouter=experess.Router()

doctorRouter.post("/",doctorController.createdr)
// doctorRouter.get("/",doctorController.getall)
doctorRouter.get("/:id", isAuth, roleMiddleware("doctor"), doctorController.getalldoctor);

doctorRouter.put("/:id",isAuth, roleMiddleware("doctor","admin")     ,doctorController.doctorupdater)
doctorRouter.delete("/:id",doctorController.delete)


module.exports=doctorRouter