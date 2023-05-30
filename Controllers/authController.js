import Users from '../Models/UserModel.js'
import { comparePassword, hashPassword } from '../helpers/hashPassword.js';
import JWT from 'jsonwebtoken'

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

// POST LOGIN
export const loginController = async(req, res) =>{
    try{
        const {email, password} = req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({message: "Invalid Email or Password"});
        }

        //check user
        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(500).json({message: "Password is Wrong..."});
        }

        // token
        const token = await JWT.sign({
            _id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

        res.status(200).json({
            _id : user.id,
            email : user.email,
            password : user.password, 
            token: token
        })

    }catch(error){
        console.log(error);
        res.status(400).json({message: error})
    }
}

export const meController = async(req, res) => {
    res.status(200).json({message: "Hello this is me route for testing jwt"})
}


