import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const mockUsers: any = {
    'admin@bgi.com': { name: 'Admin User', role: 'ADMIN' },
    'manager@bgi.com': { name: 'Manager User', role: 'MANAGER' },
    'staff@bgi.com': { name: 'Staff User', role: 'STAFF' }
  };
  
  const user = mockUsers[email];
  
  if (user && password) {
    res.json({
      token: 'mock-token-' + Date.now(),
      user: { id: 1, name: user.name, email: email, role: user.role }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});