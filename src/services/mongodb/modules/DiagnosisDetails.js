import mongoose from "mongoose";

const DiagnosisDetailsSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
  },
  diagnosiss_details:{
    type:String,
  }
})
const DiagnosisDetails = mongoose.model("DiagnosisDetails",DiagnosisDetailsSchema)
export default DiagnosisDetails;