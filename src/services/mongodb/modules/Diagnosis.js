import mongoose from "mongoose";

const DiagnosisSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
  },
  p_id:{
    type:String,
    required:true
  },
  testRequired:{
    type:Boolean,
    required:true
  }
})
const Diagnosis = mongoose.model("Diagnosis",DiagnosisSchema)
export default Diagnosis;