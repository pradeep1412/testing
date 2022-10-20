import mongoose from "mongoose";

const MedicinesSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
  },
  medicines_details:{
    type:Object,
    required:true
  }
})
const Medicines = mongoose.model("Medicines",MedicinesSchema)
export default Medicines;