const jwt=require('jsonwebtoken')
const User=require('../models/usermodel')

const requireAuth=async(req,res,next)=>{
    console.log('running middleware')
    const {authorization}=req.headers

    if(!authorization){
        res.status(401).json({error:'authorization token required'})
    }

    const token=authorization.split('')[1]

    try{
        const{_id}=jwt.verify(token,process.env.SECRET)

        req.user=await User.findOne({_id}).select('_id')
        console.log('Ok req uer',req.user)
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error:'request not authorized'})
    }
}

module.exports = requireAuth