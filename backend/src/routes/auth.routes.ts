import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { rateLimit } from 'express-rate-limit';

const router = Router();
const authController = new AuthController();

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many login attempts, please try again later.',
});

router.post('/login', loginLimiter, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;