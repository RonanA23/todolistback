const express =require('express')
const { createtodo, deletetodo,getTodos } = require('../controllers/todoControllers')
const requireAuth = require('../middleware/requireAuth')
const {testWare} = require('../middleware/testWare')

const router=express.Router()


//router.use(requireAuth)
//router.use(testWare)

router.get('/',requireAuth,getTodos)

router.post('/',createtodo)

router.delete('/:id',deletetodo)

module.exports= router