const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { verifyToken } = require('../middleware/auth');

// Get all 
router.get('/', verifyToken, assignmentController.getAllAssignments);

router.get('/:id', verifyToken, assignmentController.getAssignmentById);

router.post('/', verifyToken, assignmentController.createAssignment);

router.put('/:id', verifyToken, assignmentController.updateAssignment);

router.delete('/:id', verifyToken, assignmentController.deleteAssignment);

module.exports = router; 