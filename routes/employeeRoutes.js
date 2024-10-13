const express = require('express');
const Employee = require('../models/Employee');  // Correct import path

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
});

// Create a new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
});

// Update employee
router.put('/employees/:eid', async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.eid, req.body);
    res.status(200).json({ message: 'Employee details updated successfully' });
});

// Delete employee
router.delete('/employees/:eid', async (req, res) => {
    const { eid } = req.query;
    await Employee.findByIdAndDelete(eid);
    res.status(204).send();
});

module.exports = router;
