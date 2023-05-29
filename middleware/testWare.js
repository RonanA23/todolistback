//const jwt=require('jsonwebtoken')
//const User=require('../models/usermodel')

const testWare=async(req,res,next)=>{
    console.log('running testWare')
    next()  
}

module.exports = {testWare}