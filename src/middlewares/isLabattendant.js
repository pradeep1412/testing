import jwt from "jsonwebtoken";

const isLabTest = (req,res,next) =>{
  const token = req.headers.authorization?.split(" ").toString()
  if (token){
    const decodeToken = jwt.verify(token,process.env.JWT_SECERT)
    const {role} = decodeToken
    if (role == "labAttendant") next()
    else return res.json(
      {
        message:"ACCESS DENIED"
      }
    )
  }else{
    return res.json({
      message:"UNAUTHORISED"
    })
  }
}
export default isLabTest