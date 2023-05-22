const express =require('express')
const { createtodo, deletetodo,getTodos } = require('../controllers/todoControllers')
const router=express.Router()

router.get('/',(getTodos))

router.post('/',(createtodo))

router.delete('/:id',(deletetodo))

module.exports= router