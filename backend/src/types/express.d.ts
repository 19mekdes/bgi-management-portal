import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

export interface AuthRequest extends Express.Request {
  body: { name: any; email: any; phone: any; address: any; position: any; };
  user: {
    id: number;
    email: string;
    role: string;
  };
}