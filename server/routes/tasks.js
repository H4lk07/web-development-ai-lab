const express = require('express');
const router = express.Router();
const { inMemoryStore } = require('../lib/db');

// GET /api/tasks - list tasks with search, filter, sort, pagination
router.get('/', (req, res) => {
  let { search, done, sort, page = 1, limit = 20 } = req.query;
  page = parseInt(page) || 1;
  limit = Math.min(parseInt(limit) || 20, 100);

  let tasks = [...inMemoryStore.tasks];

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
  }

  // Done status filter
  if (done !== undefined && done !== '') {
    const isDone = done === 'true';
    tasks = tasks.filter(t => t.done === isDone);
  }

  // Sort
  if (sort === 'oldest') {
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'priority') {
    const pWeight = { high: 3, medium: 2, low: 1 };
    tasks.sort((a, b) => (pWeight[b.priority] || 0) - (pWeight[a.priority] || 0));
  } else {
    // Default newest
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const total = tasks.length;
  const start = (page - 1) * limit;
  const paginated = tasks.slice(start, start + limit);

  res.json({
    data: paginated,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1
    }
  });
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = inMemoryStore.tasks.find(t => t._id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST /api/tasks - create
router.post('/', (req, res) => {
  const { title, description = '', priority = 'medium' } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Validation Error', details: { title: 'Title is required' } });
  }
  if (title.length > 120) {
    return res.status(400).json({ error: 'Validation Error', details: { title: 'Title cannot exceed 120 characters' } });
  }

  const newTask = {
    _id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    description: description.trim(),
    priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  inMemoryStore.tasks.unshift(newTask);
  res.status(201).location(`/api/tasks/${newTask._id}`).json(newTask);
});

// PUT /api/tasks/:id - full update
router.put('/:id', (req, res) => {
  const index = inMemoryStore.tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description = '', priority = 'medium', done = false } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Validation Error', details: { title: 'Title is required' } });
  }

  inMemoryStore.tasks[index] = {
    ...inMemoryStore.tasks[index],
    title: title.trim(),
    description: description.trim(),
    priority: ['low', 'medium', 'high'].includes(priority) ? priority : inMemoryStore.tasks[index].priority,
    done: Boolean(done),
    updatedAt: new Date().toISOString()
  };

  res.json(inMemoryStore.tasks[index]);
});

// PATCH /api/tasks/:id - partial update
router.patch('/:id', (req, res) => {
  const task = inMemoryStore.tasks.find(t => t._id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (req.body.title !== undefined) task.title = req.body.title.trim();
  if (req.body.description !== undefined) task.description = req.body.description.trim();
  if (req.body.priority !== undefined) task.priority = req.body.priority;
  if (req.body.done !== undefined) task.done = Boolean(req.body.done);
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const index = inMemoryStore.tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  inMemoryStore.tasks.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
