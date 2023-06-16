const express = require("express");
const router = express.Router();
const {getProjects,addProject,getProject,updateProject,deleteProject} = require("../controllers/projectController");
const validateToken = require("../utils/validateToken");

router.use(validateToken);

router.route("/").get(getProjects).post(addProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;