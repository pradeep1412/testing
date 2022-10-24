import Express, { json } from "express";
import User from "../services/mongodb/modules/User"
import bcrypt, { hash } from "bcrypt"
import Jwt from "jsonwebtoken";
import isAdmin from "../middlewares/isAdmin";
import { body,validationResult } from "express-validator";
import Patient from "../services/mongodb/modules/Patinet";
import { v4 as uuidv4 } from 'uuid';
import Hospital from "../services/mongodb/modules/Hospital";
import Appointment from "../services/mongodb/modules/Appointment";
import isDoctor from "../middlewares/isDoctor";
import Diagnosis from "../services/mongodb/modules/Diagnosis";
import DiagnosisDetails from "../services/mongodb/modules/DiagnosisDetails";
import Labtest from "../services/mongodb/modules/LabTest";
import isLabTest from "../middlewares/isLabattendant";
import Medicines from "../services/mongodb/modules/Medicines";
import StatusPatient from "../services/mongodb/modules/StatusPatient";


const router = Express.Router()



/*
  type:post
  path:/api/v1/auth/login
  params:none
  isProtected:true
*/

router.post("/reportdetails",async (req,res)=>{
  try {
    const {case_id} = req.body
    const diagnosis = await Diagnosis.findOne({case_id})
    const diagnosisDetails = await DiagnosisDetails.findOne({case_id})
    const labtest = await Labtest.findOne({case_id})
    const medicines = await Medicines.findOne({case_id})
    if (diagnosis){
      return res.json({diagnosis,diagnosisDetails,labtest,medicines})
      }
    return res.json({message:"no data found"})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"no data found"})
  }
})

export default router