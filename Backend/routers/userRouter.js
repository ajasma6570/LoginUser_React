import express from 'express';
import userController from '../controllers/userControllers.js';
import multer from 'multer'
import path  from 'path';
const user_router = express.Router();

user_router.use(express.json())
user_router.use(express.urlencoded({ extended: false }))

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"../frontend/public/assets")
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

user_router.get('/', userController.homepage);
user_router.post('/signup',userController.signup)
user_router.post('/login',userController.login)
user_router.post('/updateProfile',upload.single('image'),userController.updateProfile)

export default user_router;
