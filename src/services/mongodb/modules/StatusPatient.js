import mongoose from "mongoose";

const StatusPatientSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
  },
  patient_status:{
    type:String,
    required:true
  }
})
const StatusPatient = mongoose.model("StatusPatient",StatusPatientSchema)
export default StatusPatient;