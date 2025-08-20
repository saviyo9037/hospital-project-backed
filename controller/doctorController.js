
const doctor = require('../models/Doctor')
// const User = require('../models/UserModel')\
require('dotenv').config();


const doctorController = {
    createdr: async (req, res) => {

        try {
            const { userid, spectialist, address, experience } = req.body

            if (!userid || !spectialist || !address || !experience) {
                return res.status(400).json({
                    message: "enter the valid"
                })
            }


            const createdoctor = await doctor.create({
                user: userid,
                spectialist,
                address,
                experience
            })


            res.status(201).json({
                message: "Doctor created successfully",
                doctor: createdoctor
            });



        } catch (error) {
            console.log("creation  error", error.message);
            res.status(500).send("server error")


        }

    },


    // find
    // getall:async (req,res) => {
    //     try {
    //         const Doctor=await doctor.find().populate("user")


    //     res.status(201).json({Doctor})

    //     } catch (error) {
    //         console.log("doctor not found ",error.message);
    //         res.status(500).send("server error")


    //     }

    // },

    getalldoctor: async (req, res) => {
        try {
            const getdoctors = await doctor.findById(req.params.id).populate({
                path: "user",
                select: "name email role"
            });


            if (!getdoctors) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json(getdoctors)

        } catch (error) {

            console.log(error.message);
            res.status(500).send("internal server error")


        }
    },
    doctorupdater: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatesd = await doctor.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            if (!updatesd) {
                return res.status(404).json({
                    message: "not updated doctor"
                })
            }
            res.status(200).json({
                message: "Doctor updated successfully",
                doctor: updatesd
            });


        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")

        }

    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deletedr = await doctor.findByIdAndDelete(id)
            if (!deletedr) {
                return res.status(404).json({
                    message: "doctor not found"

                })


            }
            res.status(200).send("successfull")

        } catch (error) {
            console.error(error.message);

            req.status(500).send("internal server error")


        }

    }

}

module.exports = doctorController