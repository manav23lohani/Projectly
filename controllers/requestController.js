const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Request = require("../models/requestModel");

const sendRequest = asyncHandler(async (req, res) => {
  const userMail = req.body.userMail;
  const projectId = new mongoose.Types.ObjectId(req.body.projectId);

  const project = await Project.findById(projectId);
  const user = await User.findOne({email: userMail});
  if (!project || !user) {
    res.status(404);
    throw new Error("Project or user doesn't exists");
  }
  
  const userId = user._id;
  const RequestExist = await Request.findOne({
    sender: projectId,
    receiver: userId,
  });
  if (RequestExist) {
    if(RequestExist.isAccepted == false){
      res.status(201).send({ message: "Request is already pending" });
    }else{
      res.status(201).send({message: "User is already a member in the project"});
    }
  } else {
    await Request.create({
      sender: projectId,
      receiver: userId,
    });
    res.status(201).send({ message: "Request sent successfully" });
  }
});

const recieveRequest = asyncHandler(async (req, res) => {
  const requests = await Request.find({ receiver: req.user.id, isAccepted: false});
  let memberRequests = [];
  if (requests) {
    let runMap = requests.map(async (request) => {
      let projectInfo = await Project.findById(request.sender);
      //   console.log(projectInfo);
      const projectOwner = await User.findById(projectInfo.user_id);
      let projectObj = {
        projectId: projectInfo.id,
        title: projectInfo.title,
        techStack: projectInfo.techStack,
        description: projectInfo.description,
        owner: projectOwner.username,
      };
      memberRequests.push(projectObj);
    });
    await Promise.all(runMap);
    res.status(201).send(memberRequests);
  } else {
    res.status(201).send([]);
  }
});

const acceptRequest = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId;
  const project = await Project.findById(projectId);
  const user = await User.findById(req.user.id);
  const request = await Request.findOne({ sender: projectId, receiver: req.user.id });

  if (request) {
    user.associatedProjects.push(projectId);
    await user.save();
    project.members.push(user.id);
    await project.save();

    request.isAccepted = true;
    await request.save();

    res.status(201).send({ message: "Request accepted" });
  } else {
    res.status(201).send({ message: "No such request exits" });
  }
});

const declineRequest = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId;
  const request = await Request.findOne({
    sender: projectId,
    receiver: req.user.id,
    isAccepted: false
  });
  if (request) {
    await Request.deleteOne({ sender: projectId, receiver: req.user.id });
    res.status(201).send({ message: "Request declined for this project" });
  } else {
    res.status(201).send({ message: "No such request exits" });
  }
});
module.exports = { sendRequest, recieveRequest, acceptRequest, declineRequest };