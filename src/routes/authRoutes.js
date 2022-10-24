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
  type:get
  path:/api/v1/auth/users
  params:none
  isProtected:true
*/

router.get("/users",isAdmin,async (req,res)=>{
  try {
    const users = await User.find({})
    res.json({users})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({users:[error.message]})
  }
})

/*
  type:post
  path:/api/v1/auth/signup
  params:none
  isProtected:true
*/

router.post("/signup",
body('firstName').isLength({min:5}),
body('email').isEmail(),
body('password').isLength()
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {email,firstName,lastName,password,role="user"} = req.body
    
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    const user = new User({email,firstName,lastName,password:hashedpassword,role})
    await user.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({users:[error.message]})
  }
})

/*
  type:post
  path:/api/v1/auth/login
  params:none
  isProtected:true
*/

router.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (user){
      const isVerified  = await bcrypt.compare(password,user.password)
      if(isVerified){
        const {_id,role} = user
        const token = Jwt.sign({_id,role},process.env.JWT_SECERT,{expiresIn:"1h"})
        return res.json({token})
      }else{
        return res.json({token:null,message:"unathorised"})
      }
    }
    return res.json({token:null,message:"User doesn't exist"})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({token:[error.message]})
  }
})


/*
  type:post
  path:/api/v1/auth/patientsignup
  params:none
  isProtected:true
*/

router.post("/patient_signup",
body('firstName').isLength({min:3}),
body('email').isEmail(),
body('password').isLength()
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {email,firstName,lastName,password,address,gender,dob,age,phoneno} = req.body
    const p_id = uuidv4()
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    const patient = new Patient({p_id,email,firstName,lastName,password:hashedpassword,address,gender,dob,age,phoneno})
    await patient.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({patient:[error.message]})
  }
})
/*
  type:post
  path:/api/v1/auth/patient_login
  params:none
  isProtected:true
*/

router.post("/patient_login",async (req,res)=>{
  try {
    const {email,password} = req.body
    const patient = await Patient.findOne({email})
    if (patient){
      const isVerified  = await bcrypt.compare(password,patient.password)
      if(isVerified){
        const {p_id,role} = patient
        const token = Jwt.sign({p_id,role},process.env.JWT_SECERT,{expiresIn:"1h"})
        return res.json({token})
      }else{
        return res.json({token:null,message:"unathorised"})
      }
    }
    return res.json({token:null,message:"patient doesn't exist"})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({token:null})
  }
})

/*
  type:post
  path:/api/v1/auth/add_hospital
  params:none
  isProtected:true
*/

router.post("/add_hospital",isAdmin
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {hospital_name,hospital_address,hospital_email,hospital_phone} = req.body
    const h_id = uuidv4()
    const hospital = new Hospital({h_id,hospital_name,hospital_address,hospital_email,hospital_phone})
    await hospital.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({hospital:[error.message]})
  }
})
/*
  type:post
  path:/api/v1/auth/patientsignup
  params:none
  isProtected:true
*/

router.post("/patient_signup",
body('firstName').isLength({min:5}),
body('email').isEmail(),
body('password').isLength()
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {email,firstName,lastName,password,address,gender,dob,age,phoneno} = req.body
    const p_id = uuidv4()
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    const patient = new Patient({p_id,email,firstName,lastName,password:hashedpassword,address,gender,dob,age,phoneno})
    await patient.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({patient:[error.message]})
  }
})

/*
  type:post
  path:/api/v1/auth/appointment
  params:none
  isProtected:true
*/

router.post("/appointment"
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {p_id,time,d_id} = req.body
    const case_id = uuidv4()
    const appointment = new Appointment({case_id,p_id,time,d_id})
    await appointment.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({appointment:[error.message]})
  }
})

/*
  type:post
  path:/api/v1/auth/appointment
  params:none
  isProtected:true
*/

router.post("/diagnosis",isDoctor
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {case_id,p_id,testRequired,diagnosiss_details} = req.body
    const diagnosis = new Diagnosis({case_id,p_id,testRequired,diagnosiss_details})
    await diagnosis.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({diagnosis:[error.message]})
  }
})

/*
  type:post
  path:/api/v1/auth/appointment
  params:none
  isProtected:true
*/

router.post("/finaldiagnosis",isDoctor
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {case_id,diagnosiss_details} = req.body
    const DiagnosisDetail = new DiagnosisDetails({case_id,diagnosiss_details})
    await DiagnosisDetail.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({DiagnosisDetail:[error.message]})
  }
})
/*
  type:post
  path:/api/v1/auth/labtest
  params:none
  isProtected:true
*/

router.post("/labtest",isLabTest
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {case_id,test_details} = req.body
    const labtest = new Labtest({case_id,test_details})
    await labtest.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({labtest:[error.message]})
  }
})
/*
  type:post
  path:/api/v1/auth/medicines
  params:none
  isProtected:true
*/

router.post("/medicines",isDoctor
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {case_id,medicines_details} = req.body
    const medicines = new Medicines({case_id,medicines_details})
    await medicines.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({medicines:[error.message]})
  }
})
/*
  type:post
  path:/api/v1/auth/medicines
  params:none
  isProtected:true
*/

router.post("/statuspatient"
,async (req,res)=>{
  const {errors} = validationResult(req)
  if(errors.length > 0 ) return res.status(403).json({errors,message:"Bad request"})
  try {
    const {case_id,patient_status} = req.body
    const statusPatient = new StatusPatient({case_id,patient_status})
    await statusPatient.save()
    res.send("request is send")
  } catch (error) {
    console.log(error.message)
    res.status(500).json({statusPatient:[error.message]})
  }
})

router.get("/statusdetails",async (req,res)=>{
  try {
    const statusPatient = await StatusPatient.find({})
    res.json({statusPatient})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({statusPatient:[error.message]})
  }
})
export default router