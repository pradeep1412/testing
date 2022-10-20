import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
    unique:true
  },
  p_id:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    required:true
  },
  d_id:{
    type:String,
    required:true
  }
})
const Appointment = mongoose.model("Appointment",AppointmentSchema)
export default Appointment;