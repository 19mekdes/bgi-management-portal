import prisma from '../config/database';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { sendResetEmail } from './email.service';
import crypto from 'crypto';
export class AuthService {
  async login(email: string, password: string) {
    const employee = await prisma.employee.findUnique({ where: { email } });
    if (!employee) return null;
    const valid = await comparePassword(password, employee.password);
    if (!valid) return null;
    const token = generateToken(employee.id, employee.role);
    const { password: _, ...user } = employee;
    return { token, user };
  }

  async forgotPassword(email: string) {
    const employee = await prisma.employee.findUnique({ where: { email } });
    if (!employee) return;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await prisma.employee.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
    await sendResetEmail(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string) {
    const employee = await prisma.employee.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    if (!employee) return false;
    const hashed = await hashPassword(newPassword);
    await prisma.employee.update({
      where: { id: employee.id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });
    return true;
  }
}