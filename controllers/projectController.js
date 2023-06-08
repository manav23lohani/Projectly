const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const getProjects = asyncHandler(async(req,res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});


const addProject = asyncHandler(async(req,res) => {
    console.log(req.body);
    const {title , status , techStack, description, startDate, endDate, priority} = req.body;
    const project = await Project.create({
        title,
        status,
        techStack,
        description,
        startDate,
        endDate,
        priority
    });
    res.status(201).json(project);
});

const getProject = asyncHandler(async(req,res) => {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
});

const updateProject = asyncHandler(async(req,res) => {
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(201).json(updatedProject);
});

const deleteProject = asyncHandler(async(req,res) => {
    await Project.deleteOne({_id: req.params.id})
    res.status(202).json({message: `Deleted project with id: ${req.params.id}`});
});

module.exports = {getProjects, addProject, getProject, updateProject, deleteProject};