import express from "express";
import adminController from "../controllers/adminController.js";


const admin_router=express.Router()

admin_router.use(express.json())
admin_router.use(express.urlencoded({extended:false}))

admin_router.post('/login',adminController.login)
admin_router.get('/userList',adminController.userList)
admin_router.post('/userDelete',adminController.userDelete)
admin_router.post('/userEdit',adminController.userEdit)


export default admin_router;