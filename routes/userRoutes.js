const express = require("express");
const router = express.Router();
const {registerUser, loginUser, updateProfile, verifyUser} = require("../controllers/userController");
const userAuth = require("../Middlewares/userAuth");

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post("/update", userAuth, updateProfile);
router.get("/verify/:token", verifyUser);

module.exports = router;
