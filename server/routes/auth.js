const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { inMemoryStore } = require('../lib/db');

const JWT_SECRET = process.env.JWT_SECRET || 'webdev_ai_lab_jwt_secret_token_2026';

// Seed demo accounts
async function initDemoUsers() {
  if (inMemoryStore.users.length === 0) {
    const adminHash = await bcrypt.hash('AdminPass123!', 10);
    const userHash = await bcrypt.hash('StudentPass123!', 10);

    inMemoryStore.users.push(
      {
        _id: 'usr_admin',
        name: 'Admin Demo',
        email: 'admin@demo.dev',
        passwordHash: adminHash,
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'usr_mayank',
        name: 'Mayank Goyal',
        email: 'mayank.23bcon1662@jecrcu.edu.in',
        passwordHash: userHash,
        role: 'user',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'usr_mayank_demo',
        name: 'Mayank Goyal',
        email: 'mayank@demo.dev',
        passwordHash: userHash,
        role: 'user',
        createdAt: new Date().toISOString()
      }
    );
  }
}
initDemoUsers();

// Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
}

// Role Middleware
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges for this action' });
    }
    next();
  };
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = inMemoryStore.users.find(u => u.email === normalizedEmail);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    _id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: role === 'admin' ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };

  inMemoryStore.users.push(newUser);

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(201).json({
    user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    token
  });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = inMemoryStore.users.find(u => u.email === email.toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials provided' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials provided' });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = inMemoryStore.users.find(u => u._id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }
  });
});

module.exports = {
  router,
  requireAuth,
  requireRole
};
