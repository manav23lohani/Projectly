const express = require("express");
const router = express.Router();
const {sendRequest, recieveRequest} = require("../controllers/requestController");
const userAuth = require("../middlewares/userAuth");

router.use(userAuth);
router.post("/sendRequest", sendRequest);
router.get("/recieveRequests", recieveRequest);

module.exports = router;