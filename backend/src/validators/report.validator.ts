import Joi from 'joi';

export const attendanceReportValidator = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  employeeId: Joi.number().integer().positive(),
});