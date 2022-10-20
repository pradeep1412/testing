import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
  h_id:{
    type:String,
    required:true,
    unique:true
  },
  hospital_name:{
    type:String,
    required:true
  },
  hospital_address:{
    type:String,
    required:true,
    unique:true
  },
  hospital_phone:{
    type:String,
    required:true
  }
})
const Hospital = mongoose.model("Hospital",HospitalSchema)
export default Hospital;