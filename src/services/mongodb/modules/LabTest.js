import mongoose from "mongoose";

const LabtestSchema = new mongoose.Schema({
  case_id:{
    type:String,
    required:true,
  },
 test_details:{
  type:Object,
 }
})
const Labtest = mongoose.model("Labtest",LabtestSchema)
export default Labtest;