const jwt=require('jsonwebtoken')
const User=require('../models/usermodel')

const requireAuth=async(req,res,next)=>{
    const {authorization}=req.headers
    console.log('middelware auth 1',authorization)

    if(!authorization){
        res.status(401).json({error:'WARNING authorization token required'})
    }
    const token=authorization.split(' ')[1]
      console.log('middelware auth 2 token',token)
  
    try{
        console.log('Trying middleware block')
        const{_id}=jwt.verify(token,process.env.SECRET)
        req.user=await User.findOne({_id}).select('_id')
          console.log('middelware auth 1 req.user',req.user)
        next()
    }
    catch(error){
         console.log('middleware catch error',error)
        res.status(401).json({error:'oh dear middleware says request not authorized'})
    }
}

module.exports = requireAuth