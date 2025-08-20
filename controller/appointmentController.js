// const { send } = require("express/lib/response")
// const Patient = require("../models/PatientModel")
// const appointment = require("../models/Appointment")
const doctor = require("../models/Doctor")
// const appointment = require("../models/Appointment")
const Appointment = require("../models/Appointment");
const Patient = require("../models/PatientModel");

const appoimentController={
    create:async (req,res) => {
        try {
            const {patientId,doctorId,date,reason,status}=req.body
            
          if (!patientId || !doctorId || !date || !reason) {
  return res.status(400).json({ message: "validation error in appointment" });
}

        
   const patient=await Patient.findById(patientId)
         if (!patient) {
            return res.status(404).json({message:"patient not found"})
            
         }
         const doctors=await doctor.findById(doctorId)
              if(!doctors){
                return res.status(404).json({message:"doctor not found"})

              }

             const newappointments=await  Appointment.create({
                patient:patientId,
                doctor:doctorId,
                date,
                reason,
                status:status||"pending"
             });
// await appointments.save()
// console.log(newappointments);


            res.status(201).json({message:"created successsfully",newappointments})



           



        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");

            
            
        }
        
    },

    getall:async (req,res) => {
     
        try {
            const {id}=req.params
                    if (!id){
            return res.status(400).send("id cuurect  check ")


            }
            const findappoitment=await Appointment.findById(id).populate({
                path:"patient",
                populate:{path:"user",
                    select:"name role",
                
                }
            }).populate({
                path:"doctor",
                populate:{path:"user",
                    select:"name role"
                }
        })

            res.status(404).json({message:"user  successfull",findappoitment})


            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")

            
            
        }
        
    },
    update:async (req,res) => {
        try {
            const  {id}=req.params
            const updates=req.body;
            const updated=await Appointment.findByIdAndUpdate(id,updates,{new:true,runValidators:true})
            if(!updated){
                return res.status(404).json({
                    message:"not update appoitment"
                })
            }
            res.status(200).json({
                message:"appoitment updated successfullly",
                appointment:updated
            })


        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")   
            
        }
        
    },
    delete:async (req,res) => {
        try {
            const {id}=req.params
            const deletes=await appointment.findByIdAndDelete(id)
            if(!deletes){
                return res.status(404).json({message:"appoitment not found"})

            }
            res.status(201).send("successfull deleted");

            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");

            
            
        }
        
    }
}


module.exports=appoimentController