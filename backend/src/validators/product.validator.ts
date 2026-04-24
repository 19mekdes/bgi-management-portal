import Joi from 'joi';

export const createProductValidator = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  category: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  productionDate: Joi.date().iso().required(),
});

export const updateProductValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  category: Joi.string(),
  quantity: Joi.number().integer().min(0),
  productionDate: Joi.date().iso(),
});