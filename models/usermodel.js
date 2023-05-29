const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error('ALl fields must be filled')
    }
    const user=await this.findOne({email})
    if(!user){
        throw Error('Incorrect Email')
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect password')

    }
    return user
}

userSchema.statics.signup=async function(email,password){
    if(!email||!password){
        throw Error('ALl fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please choose a stronger password')
    }
    const exists=await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    const salt=await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)
    const user=await this.create({email,password:hash})
    return user
}

module.exports=mongoose.model('users',userSchema)