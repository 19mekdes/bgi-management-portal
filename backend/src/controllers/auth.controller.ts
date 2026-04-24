import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { loginValidator, forgotPasswordValidator, resetPasswordValidator } from '../validators/auth.validator';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const result = await authService.login(value.email, value.password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(result);
  }

  async forgotPassword(req: Request, res: Response) {
    const { error, value } = forgotPasswordValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await authService.forgotPassword(value.email);
    res.json({ message: 'If an account exists with that email, you will receive a reset link.' });
  }

  async resetPassword(req: Request, res: Response) {
    const { error, value } = resetPasswordValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const success = await authService.resetPassword(value.token, value.password);
    if (!success) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    res.json({ message: 'Password reset successfully' });
  }
}