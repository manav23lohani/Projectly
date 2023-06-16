const express = require("express");
const router = express.Router();
const {registerUser, loginUser, userProfile} = require("../controllers/userController");
const validateToken = require("../utils/validateToken");

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.get("/profile", validateToken, userProfile);

module.exports = router;
