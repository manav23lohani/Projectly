const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcyrpt = require("bcrypt");
const sendEmail = require("../Utils/sendEmail");
const jwt = require("jsonwebtoken");
const generateToken = require("../Utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  if (password.length < 5) {
    res.status(400);
    throw new Error("Minimum password length is 6");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcyrpt.hash(password, 5);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    verified: false,
  });
  if (!user) {
    res.status(400);
    throw new Error("User data is not valid");
  }

  // sending verification mail
  let token = await generateToken(user._id);
  const url = `${process.env.APP_BASE_URL}/api/users/verify/${token}`;
  await sendEmail(user.email, "Verify Email", url);

  res
    .status(201)
    .json({ message: "Verification email has been sent to your account" });
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400);
    throw new Error("Token not found");
  }
  let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // console.log(payload.id);
  const user = await User.findOne({ _id: payload.id});
  if (!user) {
    res.status(404);
    throw new Error("User does not  exists");
  }
  user.verified = true;
  await user.save();
  res.status(200).json({ message: "Account Verified Successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing user details");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!, Please register first" });
  }
  let verified = user.verified;
  if (!verified) {
    return res.status(201).json({ message: "Please verify your account first" });
  }
  if (await bcyrpt.compare(password, user.password)) {
    const accessToken = generateToken(user._id);
    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect password!, try again");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const hashedNewPassword = await bcyrpt.hash(req.body.password, 5);
      user.password = hashedNewPassword;
    }

    const updatedUser = await user.save();

    const accessToken = generateToken(user._id);
    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      id: updatedUser._id,
      token: accessToken,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, loginUser, updateProfile, verifyUser };
