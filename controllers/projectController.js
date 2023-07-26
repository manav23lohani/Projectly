const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

const getProjects = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const projects = await Project.find({ user_id: req.user.id });
  const user = await User.findById(req.user.id).populate("associatedProjects");
  const associatedProjects = user.associatedProjects;
  const response = [...projects, ...associatedProjects];
  res.status(200).json(response);
});

const addProject = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    title,
    status,
    techStack,
    description,
    startDate,
    endDate,
    priority,
  } = req.body;
  if (!title || !techStack || !description) {
    res.status(400);
    throw new Error("Fill necessary details");
  }
  const project = await Project.create({
    title,
    status,
    techStack,
    description,
    startDate,
    endDate,
    priority,
    user_id: req.user.id
  });
  res.status(201).json(project);
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project doesn't exists");
  }
  res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project doesn't exists");
  }
  if(project.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User not permitted to update other user projects");
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project doesn't exists");
  }
  if(project.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User not permitted to delete other user projects");
  }
  await Project.deleteOne({ _id: req.params.id });
  res
    .status(202)
    .json({ message: `Deleted project with id: ${req.params.id}` });
});

module.exports = {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject,
};
