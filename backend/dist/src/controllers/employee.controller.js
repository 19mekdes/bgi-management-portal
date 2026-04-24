"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const employee_service_1 = require("../services/employee.service");
exports.employeeController = {
    async getAll(req, res) {
        try {
            const employees = await employee_service_1.employeeService.getAll(); // Changed from findAll
            res.json(employees);
        }
        catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({ message: 'Error fetching employees' });
        }
    },
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const employee = await employee_service_1.employeeService.getById(id); // Changed from findById
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json(employee);
        }
        catch (error) {
            console.error('Error fetching employee:', error);
            res.status(500).json({ message: 'Error fetching employee' });
        }
    },
    async create(req, res) {
        try {
            const employee = await employee_service_1.employeeService.create(req.body);
            res.status(201).json(employee);
        }
        catch (error) {
            console.error('Error creating employee:', error);
            res.status(500).json({ message: 'Error creating employee' });
        }
    },
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const employee = await employee_service_1.employeeService.update(id, req.body);
            res.json(employee);
        }
        catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Error updating employee' });
        }
    },
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await employee_service_1.employeeService.delete(id);
            res.json({ message: 'Employee deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'Error deleting employee' });
        }
    },
};
