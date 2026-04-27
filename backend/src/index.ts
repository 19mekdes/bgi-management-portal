import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config';

dotenv.config();

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Mock login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const mockUsers: Record<string, { name: string; role: string }> = {
    'admin@bgi.com': { name: 'Admin User', role: 'ADMIN' },
    'manager@bgi.com': { name: 'Manager User', role: 'MANAGER' },
    'staff@bgi.com': { name: 'Staff User', role: 'STAFF' }
  };
  
  const user = mockUsers[email];
  
  if (user && password) {
    res.json({
      token: 'mock-token-' + Date.now(),
      user: {
        id: 1,
        name: user.name,
        email: email,
        role: user.role
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`API: http://localhost:${PORT}/api`);
});