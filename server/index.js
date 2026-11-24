require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { connectDB, getDbStatus, inMemoryStore } = require('./lib/db');
const openapiSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    db: getDbStatus(),
    service: 'Web Development Using AI Lab API Gateway'
  });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.get('/api/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpec);
});

// Mount Experiment Routers
app.use('/api/tasks', require('./routes/tasks'));
const { router: authRouter } = require('./routes/auth');
app.use('/api/auth', authRouter);

// Admin-only user routes
app.get('/api/users', (req, res) => {
  const users = inMemoryStore.users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }));
  res.json({ data: users });
});
app.delete('/api/users/:id', (req, res) => {
  const index = inMemoryStore.users.findIndex(u => u._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  inMemoryStore.users.splice(index, 1);
  res.status(204).end();
});

app.use('/api/products', require('./routes/products'));
app.use('/api/students', require('./routes/students'));
app.use('/api/generate', require('./routes/generate'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/content', require('./routes/content'));
app.use('/api/image', require('./routes/image'));

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation Error', details: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed Identifier', details: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Conflict Error', details: 'A record with duplicate unique fields already exists' });
  }
  
  res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
});

// Start Server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Server] Express API gateway running on http://localhost:${PORT}`);
    console.log(`[Docs] Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;
