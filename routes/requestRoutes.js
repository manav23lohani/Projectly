const express = require("express");
const router = express.Router();
const {sendRequest, recieveRequest, acceptRequest, declineRequest} = require("../controllers/requestController");
const userAuth = require("../middlewares/userAuth");

router.use(userAuth);
router.post("/sendRequest", sendRequest);
router.get("/recieveRequests", recieveRequest);
router.post("/acceptRequest", acceptRequest);
router.post("/declineRequest", declineRequest);

module.exports = router;