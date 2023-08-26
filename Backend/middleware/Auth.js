import jwt from 'jsonwebtoken'

const checkAuth =async(req,res,next)=>{
    
    const token = req.header('Authorization');
    console.log("token " + token);

    if(!token){
        console.log("invalid token");
        return res.status(400).json({
            message:"invalid token"
        })
    }

    const user= jwt.verify(token,"secret")
    
    console.log("jwt verify "+user);
}

export default checkAuth;