const express = require('express');
const ProjectModel = require('../models/project.schema.js');
const projectRouter = express.Router();


// Create a new project post
projectRouter.post('/newProject', async (req, res) => {
    try {
      const project = new ProjectModel(req.body);
      await project.save();
      res.status(201).send(project);
    } catch (error) {
        console.error('Error creating new project:', error);
        res.status(400).send({ error: error.message });
          }
  });


// Get all project posts
projectRouter.get('/allProjects', async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a single project post by ID
projectRouter.get('/:id', async (req, res) => {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return res.status(404).send({ message: 'project post not found' });
      }
      res.send(project);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update a project post
projectRouter.put('/:id', async (req, res) => {
    try {
      const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!project) {
        return res.status(404).send({ message: 'project post not found' });
      }
      res.send(project);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

// Delete a project post
projectRouter.delete('/:id', async (req, res) => {
    try {
      const project = await ProjectModel.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).send({ message: 'project post not found' });
      }
      res.send({ message: 'project post deleted successfully', project });
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = { projectRouter };
