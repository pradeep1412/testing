import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  p_id:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  dob:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  phoneno:{
    type:String,
    required:true
  }

})
const Patient = mongoose.model("Patient",PatientSchema)
export default Patient;