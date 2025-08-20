const express=require('express');
const authrouter = require('./authrouter');
const doctorRouter = require('./doctorRouter');
const patientRouter = require('./patientRouter');
const appointmentroute = require('./appointmentrouter');
const billingRouter = require('./billinroutes');

const router=express()

router.use("/register",authrouter)

router.use("/doctor",doctorRouter)


router.use("/patient",patientRouter)



router.use("/appointment",appointmentroute)


router.use("/billing",billingRouter)

module.exports=router