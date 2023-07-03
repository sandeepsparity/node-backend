const express = require("express");
const { registerAUser, loginUser, getAllUsers, updateUser } = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const userRouter = express.Router();

// All POST routes
userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);

// All GET routes
userRouter.get("/all-users",isAdmin, getAllUsers);

// All PUT routes 
userRouter.put("/update-profile", authMiddleware, updateUser)

module.exports = userRouter;