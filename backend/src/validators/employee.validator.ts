import Joi from 'joi';

export const createEmployeeValidator = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'manager', 'staff').default('staff'),
  department: Joi.string(),
});

export const updateEmployeeValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  role: Joi.string().valid('admin', 'manager', 'staff'),
  department: Joi.string(),
});