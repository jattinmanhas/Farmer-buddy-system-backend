import Users from '../Models/UserModel.js'
import { hashPassword } from '../helpers/hashPassword.js';

export const registerController = async(req,res) => {
    try{
        const {name, email, password, phone, address} = req.body;
        //validation 
        if(!name || !email || !password){
            return res.status(400).json({message: "Error..."})
        }

        //check existing user
        const existinguser = await Users.findOne({email})

        //existing user
        if(existinguser){
            return res.status(200).json({message: "User already exists..."})
        }

        // password hash
        const hashedPassword = await hashPassword(password)
        // save
        const user = new Users({name, email, phone, address, password: hashedPassword}).save()

        res.status(200).json({message: "Success..."})

    }catch(error){
        res.status(400).json({message : error});
        
    }
}
