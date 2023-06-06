const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'working'],
    default: 'pending'
  },
  codeLink: {
    type: String,
    required: true
  },
  techStack: [String],
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  tags: [String]
});

module.exports = mongoose.model("Project", projectSchema);
