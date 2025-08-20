const Patient = require("../models/PatientModel")


const 
patientController={
    create:async (req,res) => {
        try {
            
         const {userId,age,gender,Number}=req.body


         if(!userId||!age||!gender ||!Number){
            return res.status(400).json({message:"validation error patient"})
            
         }
         const newpatient=await Patient({
            user:userId,
            age,
            gender,
            Number
         })
await newpatient.save()

 res.status(201).json({message:"created successfully",patient:newpatient})
   
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")
            
            
        }
        
    },
    getall:async (req,res) => {
        try {

            const {id}=req.params

            const fetch=await Patient.find(id).populate("user")

                res.status(201).json({message:"user not fond",fetch})
        
        } catch (error) {
            console.log("created succcessfull",error.message);
            res.status(500).send("internal server errror")
            
            
        }
        
    },
    getone:async (req,res) => {
        try {
            const {userId}=req.params
        if (!userId){
            return res.status(400).send("validation error")


            }
            const patientfound=await Patient.findById(userId).populate("user")

           res.status(201).json({message:"user not fond",patientfound})
        } catch (error) {
               console.log("get the patient",error.message);
            res.status(500).send("internal server errror")
            
        }
        
    },
 update:async (req,res) => {

    try {
        const {id}=req.params
    const {age,gender,Number}=req.body

    if(!age ||!gender ||!Number ||!id)
    {
        return res.status(404).json({message:"enter the currect"})
    }
    
    const patientisexisting=await Patient.findById(id)
    if(!patientisexisting){
        return res.status(200).send("no existing patient")
        

    }
patientisexisting.age = age;
patientisexisting.gender = gender;
patientisexisting.Number = Number;

await patientisexisting.save();

res.status(200).json({ message: "Patient updated successfully", patient: patientisexisting });

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  error")    
    }

    
 
 },



    delete:async (req,res) => {
        try {
            const {id}=req.params
            const deletepatient=await Patient.findByIdAndDelete(id)

            if(!deletepatient){
                return res.status(404).json({message:"patient not match"})

            }

            res.status(200).send("successfully delete")
        } catch (error) {
            console.error(error.message);

            res.status(500).send("internal server error");
            
            
        }
        
    }

}

module.exports=patientController