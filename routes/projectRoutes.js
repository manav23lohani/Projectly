const express = require("express");
const router = express.Router();
const {getProjects,addProject,getProject,updateProject,deleteProject} = require("../controllers/projectController");

router.route("/").get(getProjects).post(addProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;