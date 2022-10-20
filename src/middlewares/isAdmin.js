import jwt from "jsonwebtoken";

const isAdmin = (req,res,next) =>{
  const token = req.headers.authorization?.split(" ").toString()
  if (token){
    const decodeToken = jwt.verify(token,process.env.JWT_SECERT)
    const {role} = decodeToken
    if (role == "admin") next()
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
export default isAdmin