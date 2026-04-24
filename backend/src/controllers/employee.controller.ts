import { Response } from 'express';
import { employeeService } from '../services/employee.service';
import { AuthRequest } from '../types/express';

export const employeeController = {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const employees = await employeeService.getAll(); // Changed from findAll
      res.json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Error fetching employees' });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const employee = await employeeService.getById(id); // Changed from findById
      
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      
      res.json(employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Error fetching employee' });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const employee = await employeeService.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Error creating employee' });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const employee = await employeeService.update(id, req.body);
      res.json(employee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee' });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await employeeService.delete(id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Error deleting employee' });
    }
  },
};