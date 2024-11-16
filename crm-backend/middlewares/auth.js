const jwt = require("jsonwebtoken")

const Customer = require("../models/Customer")

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,async (err,payload) => {
            if(err){
                return res.status(401).json({error:"Unauthorized"})
            }
            try{
                const customer = await Customer.findOne({_id:payload._id}).select("-password")
                req.customer = customer
                next()
            }
            catch(err){
                console.log(err)
            }
        })
    }else{
        return res.status(403).json({error:"Forbidden"})
    }
}