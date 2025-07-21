const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth'); // Add auth protection

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (admin only)
router.use(protect);
router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;