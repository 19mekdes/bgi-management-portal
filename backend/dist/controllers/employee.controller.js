"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const employee_service_1 = require("../services/employee.service");
const employee_validator_1 = require("../validators/employee.validator");
const employeeService = new employee_service_1.EmployeeService();
class EmployeeController {
    async getAll(req, res) {
        const { page = 1, limit = 10, search, role, department } = req.query;
        const result = await employeeService.findAll({
            page: Number(page),
            limit: Number(limit),
            search: search,
            role: role,
            department: department,
        });
        res.json(result);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        const employee = await employeeService.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    }
    async create(req, res) {
        const { error, value } = employee_validator_1.createEmployeeValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const employee = await employeeService.create(value);
        res.status(201).json(employee);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const { error, value } = employee_validator_1.updateEmployeeValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const employee = await employeeService.update(id, value);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        const deleted = await employeeService.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send();
    }
}
exports.EmployeeController = EmployeeController;
