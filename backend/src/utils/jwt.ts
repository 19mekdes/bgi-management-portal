import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ id: userId, role }, config.jwtSecret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwtSecret);
};