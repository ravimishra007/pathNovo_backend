const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
