const mongoose =require("mongoose")

const Schema=mongoose.Schema

const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('todos',todoSchema)