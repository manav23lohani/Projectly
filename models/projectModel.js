const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "working"],
      default: "pending",
    },
    
    techStack: [String],

    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
  });

module.exports = mongoose.model("Project", projectSchema);
