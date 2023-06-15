const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  // console.log(("hashed password", hashedPassword));
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing user details");
  }
  const user = await User.findOne({ email });
  if (user && (await bcyrpt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1d"}
    );
    res.status(200).json({ accessToken });
  }
  else{
    res.status(401);
    throw new Error("Incorrect login credentials");
  }
});

module.exports = { registerUser, loginUser };
