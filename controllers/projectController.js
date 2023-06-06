const asyncHandler = require("express-async-handler");

const getProjects = asyncHandler((req,res) => {
    res.status(200).json({message: "Get all projects"});
});


const addProject = asyncHandler(async(req,res) => {
    console.log(req.body);
    const {title , status , codelink} = req.body;
    if(!title || !status || !codelink) {
        res.status(400);
        throw new Error("All fields are required");
    }
    res.status(201).json({message: "Add project"});
});

const getProject = asyncHandler((req,res) => {
    res.status(200).json({message: `Get project with id: ${req.params.id}`});
});

const updateProject = asyncHandler((req,res) => {
    res.status(201).json({message: `Update project with id: ${req.params.id}`});
});

const deleteProject = asyncHandler((req,res) => {
    res.status(202).json({message: `Delete project with id: ${req.params.id}`});
});

module.exports = {getProjects, addProject, getProject, updateProject, deleteProject};