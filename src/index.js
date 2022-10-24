import  Express, { json } from "express";
import dotenv from "dotenv"
import connectDB from "./services/mongodb/connectDB";
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import reportRoutes from "./routes/reportRoutes"

dotenv.config()

connectDB()

const app = Express()
app.use(cors({
  origin:"*"
}))
app.use(Express.json())

app.use("/api/v1/auth",authRoutes)

app.use("/api/v1/report",reportRoutes)

const port = process.env.PORT || 3003

app.listen(port,(req,res)=>{
  console.log(`server listing at port ${port}`)
});
