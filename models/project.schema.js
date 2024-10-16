const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ProjectModel = mongoose.model('project', projectSchema);

module.exports = ProjectModel;
