//routes,controllers,models
const express=require('express')
const todoRoutes=require('./routes/todoroutes')
const userroutes=require('./routes/userroutes')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const cors=require('cors')
const { testWare } = require('./middleware/testWare')
const requireAuth = require('./middleware/requireAuth')
//const {testWare} = require('./middleware/testWare')
const PORT= process.env.PORT

const app=express()

app.use(express.json())
app.use(cors({
    origin:'*'
}))

app.get('/',(req,res)=>{
    res.json({mssg:'we are receving you todolist'})
})

app.use('/api/todos',requireAuth,todoRoutes)
app.use('/api/user',userroutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT ||5000,()=>{
        console.log('LISTENING ON PORT 5000')
    })
}).catch((error)=>{
    console.log(error)
})
