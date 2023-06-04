const express=require('express')
const mongoose=require('mongoose')

const todo=require('../models/todomodel')


const getTodos=async(req,res)=>{
    console.log('fetching todos once')
    const user_id=req.user._id
    const todos=await todo.find({user_id}).sort({createdAt:-1})
    res.status(200).json(todos)

}

const createtodo=async(req,res)=>{
    const user_id=req.user._id
    const {title}=req.body
    try{const newtodo= await todo.create({title,user_id})
    res.status(201).json(newtodo)
   
    }
    catch(error){
        res.status(400).json({message:error.message})
    }}

const deletetodo=async(req,res)=>{
    console.log('deleting todos in controller')
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such todo'})
    }
    const response=await todo.findOneAndDelete({_id:id})
    if(!response){
        return res.status(400).json({error:'no such workout'})
    }
    res.status(200).json(response)
}

module.exports={getTodos,createtodo,deletetodo}
