import Joi from 'joi';

export const attendanceQueryValidator = Joi.object({
  employeeId: Joi.number().integer().positive(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
});