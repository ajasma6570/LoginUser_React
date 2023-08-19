import dotenv from 'dotenv'
dotenv.config()

import express from  'express'
import cors from 'cors'
import user_router from './routers/userRouter.js'
import mongoDBConnect from './config/mongoDBConnect.js'
import admin_router from './routers/adminRouter.js'

mongoDBConnect()

const app=express()

app.use(cors())

app.use('/',user_router)
app.use('/admin',admin_router)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
})