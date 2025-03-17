const { Assignment } = require('../db/model');

// Get all assignments
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new assignment
exports.createAssignment = async (req, res) => {
    try {
        const newAssignment = new Assignment({
            courseId: req.body.courseId,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate
        });
        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 