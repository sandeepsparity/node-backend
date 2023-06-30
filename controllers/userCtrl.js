const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { validateMongoId } = require("../middlewares/validateMongoDbId");

/* Create a user */
const registerAUser = async(req, res) => {
  // Get a email from req.body and find wheather 
  // a user with with email exists or not
  const email = req?.body?.email;
  // find the user with email get from req.body
  const findUser = await User.findOne({ email: email });
  if(!findUser){
    const createUser = await User.create(req.body);
    res.status(200).json(createUser);
  }else{
     throw new Error("User Already Exist")
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check either user exist or not
  const findUser = await User.findOne({email: email});
  if(findUser && await findUser.isPasswordMatched(password)){
    res.status(200).json({
      status: true,
      message: "Logged in successfully!",
      token: generateToken(findUser._id),
      role: findUser?.roles,
      username: findUser?.firstname + findUser?.lastname,
      user_image: findUser?.user_image 
    })
  } else {
    throw new Error("Invalid Credentials")
  }

}

// Get all users
const getAllUsers = async (req, res) => {
   try{
     const allUsers = await User.find();
     res.status(200).json({
      status: true,
      message: "All Users Fetched Successfully",
      data: allUsers
     })
   } catch(error){
       throw new Error(error)
   }
}


// Update user profile
const updateUser = async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try{
    const user = await User.findByIdAndUpdate(_id, req.body,{
      new : true
    });
    res.status(200).json({ status: true, message: "Profile Updated Successfully", user})
  } catch(error){
      throw new Error(error)
  }
}

module.exports = { registerAUser, loginUser, getAllUsers, updateUser };
