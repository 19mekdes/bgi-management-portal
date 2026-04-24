import Joi from 'joi';

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordValidator = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const updateProfileValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  department: Joi.string(),
});

export const changePasswordValidator = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const updateRoleValidator = Joi.object({
  role: Joi.string().valid('admin', 'manager', 'staff').required(),
});