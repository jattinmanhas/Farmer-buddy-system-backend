import mongoose from 'mongoose'
import color from 'colors'
export const connectdb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to the MONGO DB ${conn.connection.host}`.bgBlue.white)

    }catch(error){
        console.log(`Error in MongoDb: ${error}`)
    }
}