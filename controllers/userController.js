const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcyrpt = require("bcrypt");

const registerUser = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    if(password.length < 5){
        res.status(400);
        throw new Error ("Minimum password length is 6");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error ("User already registered");
    }
    const hashedPassword = await bcyrpt.hash(password,5);
    // console.log(("hashed password", hashedPassword));
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    // console.log(`User created ${user}`);
    if(user){
        res.status(201).json({username:user.username, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});
const loginUser = asyncHandler(async(req,res) => {
    res.json({message: "Login the user"});
});

module.exports = {registerUser, loginUser};