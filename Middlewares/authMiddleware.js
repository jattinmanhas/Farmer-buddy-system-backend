import JWT from 'jsonwebtoken'
import Users from '../Models/UserModel.js'

export const protect = async(req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(" ")[1]

            //verify token
            const decoded = JWT.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await Users.findById(decoded.id).select("-password")

            next()
        }catch(error){
            console.log(error);
            res.status(401).json({message: "Not authorized"})
        }
    }

    if(!token){
        res.status(401).json({message : "NOt Authorized, NO token"});
    }

}

export const isAdmin = async(req, res, next) =>{
    try{
        const user = await Users.findOne(req.user._id);
        if(user.role !== 1){
            return res.status(401).json({message: "UNAUTHORIZED ACCESS"})
        }else{
            next();
        }
    }catch(error){
        console.log()
        res.status(501).json({message: error})
    }
}