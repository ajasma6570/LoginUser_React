import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

const mongoDBConnect= async () => {
    await mongoose.connect(process.env.dbconnect,{
        useNewUrlParser:true,
        useUnifiedTopology:true 
    })
    .then(()=>{
        console.log("MonogoDB Connected...");
    })
    .catch(()=>{
        console.log("Failed to Connect...");
    })
}

export default mongoDBConnect;