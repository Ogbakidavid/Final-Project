const Project = require('../models/Project');
const { NotFoundError, BadRequestError } = require('../utils/errors');

// Improved error handling middleware
const handleAsyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all projects
exports.getProjects = handleAsyncError(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  
  if (!projects || projects.length === 0) {
    throw new NotFoundError('No projects found');
  }

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// Get single project
exports.getProject = handleAsyncError(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    throw new NotFoundError('Project not found');
  }
  
  res.status(200).json({
    success: true,
    data: project
  });
});

// Create project
exports.createProject = handleAsyncError(async (req, res) => {
  const project = await Project.create(req.body);
  
  res.status(201).json({
    success: true,
    data: project
  });
});

// Update project
exports.updateProject = handleAsyncError(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
      new: true,
      runValidators: true // Ensures updates follow schema validation
    }
  );

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// Delete project
exports.deleteProject = handleAsyncError(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  
  if (!project) {
    throw new NotFoundError('Project not found');
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});