const express =require('express')
//const requireAuth=require('../middleware/requireAuth')
const { login, register } = require('../controllers/userControllers')
const router=express.Router()



router.post('/register',(register))

router.post('/login',(login))

module.exports= router