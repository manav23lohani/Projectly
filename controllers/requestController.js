const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const Request = require("../models/requestModel");

const sendRequest = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const projectId = req.body.projectId;
  
  const project = await Project.findById(projectId);
  const user = await User.findById(userId);
  if (!project || !user) {
    res.status(404);
    throw new Error("Project or user doesn't exists");
  }
  
  if(project.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Not permitted to send request for other user projects");
  }
  
  const RequestExist = await Request.findOne({
    sender: projectId,
    receiver: userId,
  });
  if (RequestExist) {
    res.status(201).send({ message: "Request has already been sent" });
  } else {
    const data = new Request({
      sender: projectId,
      receiver: userId,
    });
    await data.save();
    res.status(201).send({ message: "Request sent successfully" });
  }
});

const recieveRequest = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    receiver: req.user.id,
    isAccepted: false,
  });

  let memberRequests = [];
  
  if (requests) {
    let runMap = requests.map(async(request) => {
      let projectInfo = await Project.findById(request.sender);
    //   console.log(projectInfo);
      let projectObj = {
        title: projectInfo.title,
        techStack: projectInfo.techStack,
        description: projectInfo.description,
      };
      memberRequests.push(projectObj);
    });

    await Promise.all(runMap);
    
    res.status(201).send(memberRequests);
  } 
  else {
    res.status(201).send([]);
  }
});
module.exports = {sendRequest, recieveRequest};