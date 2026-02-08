import jwt from "jsonwebtoken"
export const verifytoken = (req,res,next)=>{
    const token = req.cookies?.token;
    try {
    if(!token){
        return res.status(401).json({ success:false,msg:"Unauthorized -no token provided"})
    }
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    req.userId=decoded.userId
    next()

    
} catch (error) {
    console.log("Err in verifyToken",error)
    res.status(500).json({success:false,msg:"Internal server error"})
}

}