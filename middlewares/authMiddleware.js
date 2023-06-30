const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization?.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next()
            }
        }catch(error){
            throw new Error("Not Authorized, Please login again")
        }
    }else{
        throw new Error("There is no token attached to the header")
    } 
}

const isAdmin  = async(req, res, next) =>{
    const { email } = req.user;
    const isAdmin = await User.find({email: email})
    if(isAdmin.roles !== "admin"){
        throw new Error("You are not an admin")
    } else {
        next()
    }
}

const isInstructor  = async(req, res, next) =>{
    const { email } = req.user;
    const isInstructor = await User.find({email: email})
    if(isInstructor.roles !== "instructor"){
        throw new Error("You are not an instructor")
    } else {
        next()
    }
}

module.exports = {
    isAdmin,
    isInstructor,
    authMiddleware
}