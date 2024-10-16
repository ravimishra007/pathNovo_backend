// routes/blogs.js
const express = require('express');
const blogRouter = express.Router();
const BlogModel  = require('../models/blog.schema.js');


// Create a new blog post
blogRouter.post('/newBlog', async (req, res) => {
    try {
      const blog = new BlogModel(req.body);
      await blog.save();
      res.status(201).send(blog);
    } catch (error) {
        console.error('Error creating new blog:', error);
        res.status(400).send({ error: error.message });
          }
  });


// Get all blog posts
blogRouter.get('/allBlogs', async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a single blog post by ID
blogRouter.get('/:id', async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog post not found' });
      }
      res.send(blog);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update a blog post
blogRouter.put('/:id', async (req, res) => {
    try {
      const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!blog) {
        return res.status(404).send({ message: 'Blog post not found' });
      }
      res.send(blog);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

// Delete a blog post
blogRouter.delete('/:id', async (req, res) => {
    try {
      const blog = await BlogModel.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog post not found' });
      }
      res.send({ message: 'Blog post deleted successfully', blog });
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = { blogRouter };
