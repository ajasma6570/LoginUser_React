import  jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import User from '../model/user.js'
const adminController={

    login: async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const user = await User.findOne({ email });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const passwordMatch = await bcrypt.compare(password, user.password);
      
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }

          if(user.isAdmin===1){
            const secretKey = "secret"
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            
            res.status(200).json({  
              name:user.name,
              email,
              phone:user.phone,
              token,
              login:true,
              image:user.image,
             })
          }else{
            return res.status(401).json({message:"Authorization restricted"})
          }
         
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
          console.log(error.message);
        }
    },
    userList:async(req,res)=>{
      try{
        const userData=await User.find({isAdmin:0})
        res.status(200).json(userData)
      }catch(error){
        console.log(error.message);
      }
      
    },
    userDelete:async(req,res)=>{
      
      try{
        const id=req.body.id
        await User.findByIdAndDelete(id);
        const userData=await User.find({isAdmin:0})
        res.status(200).json(userData)


      }catch(error){
        console.log(error.message);
      }
    },
    userEdit:async(req,res)=>{
      try{
        const id=req.body.id
        const user= await User.findOne({_id:id});
        res.status(200).json({
          name:user.name,
          email:user.email,
          phone:user.phone,
          image:user.image
        })
      }catch(error){
        console.log(error.message);
      }
    }

}



export default adminController;