"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.config.port;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running!' });
});
// Mock login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const mockUsers = {
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
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config_1.config.nodeEnv}`);
    console.log(`API: http://localhost:${PORT}/api`);
});
