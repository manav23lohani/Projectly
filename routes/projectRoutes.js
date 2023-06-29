const express = require("express");
const router = express.Router();
const {getProjects,addProject,getProject,updateProject,deleteProject} = require("../controllers/projectController");
const userAuth = require("../middlewares/userAuth");

router.use(userAuth);

router.route("/").get(getProjects).post(addProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;