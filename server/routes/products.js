const express = require('express');
const router = express.Router();
const { inMemoryStore } = require('../lib/db');

// GET /api/products
router.get('/', (req, res) => {
  let { category, inStock, search, sort, page = 1, limit = 10 } = req.query;
  page = parseInt(page) || 1;
  limit = Math.min(parseInt(limit) || 10, 50);

  let items = [...inMemoryStore.products];

  if (category) {
    items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (inStock !== undefined && inStock !== '') {
    const stockBool = inStock === 'true';
    items = items.filter(p => p.inStock === stockBool);
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
  }

  if (sort === 'price_asc') {
    items.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    items.sort((a, b) => b.price - a.price);
  } else {
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const total = items.length;
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

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

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const prod = inMemoryStore.products.find(p => p._id === req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(prod);
});

// POST /api/products
router.post('/', (req, res) => {
  const { name, description = '', category, price, quantity = 0, inStock = true } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Validation Error', details: { name: 'Product name is required' } });
  }

  const validCategories = ['electronics', 'apparel', 'books', 'home'];
  if (!category || !validCategories.includes(category.toLowerCase())) {
    return res.status(400).json({ error: 'Validation Error', details: { category: `Category must be one of: ${validCategories.join(', ')}` } });
  }

  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice < 0) {
    return res.status(400).json({ error: 'Validation Error', details: { price: 'Price must be a non-negative number' } });
  }

  const newProd = {
    _id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    description: description.trim(),
    category: category.toLowerCase(),
    price: numPrice,
    quantity: Math.max(0, parseInt(quantity) || 0),
    inStock: Boolean(inStock),
    createdAt: new Date().toISOString()
  };

  inMemoryStore.products.unshift(newProd);
  res.status(201).location(`/api/products/${newProd._id}`).json(newProd);
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const index = inMemoryStore.products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, description = '', category, price, quantity = 0, inStock = true } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: 'Name, category, and price are required for replacement' });
  }

  inMemoryStore.products[index] = {
    _id: req.params.id,
    name: name.trim(),
    description: description.trim(),
    category: category.toLowerCase(),
    price: Number(price),
    quantity: Math.max(0, parseInt(quantity) || 0),
    inStock: Boolean(inStock),
    createdAt: inMemoryStore.products[index].createdAt,
    updatedAt: new Date().toISOString()
  };

  res.json(inMemoryStore.products[index]);
});

// PATCH /api/products/:id
router.patch('/:id', (req, res) => {
  const prod = inMemoryStore.products.find(p => p._id === req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (req.body.name !== undefined) prod.name = req.body.name.trim();
  if (req.body.description !== undefined) prod.description = req.body.description.trim();
  if (req.body.category !== undefined) prod.category = req.body.category.toLowerCase();
  if (req.body.price !== undefined) prod.price = Number(req.body.price);
  if (req.body.quantity !== undefined) prod.quantity = Math.max(0, parseInt(req.body.quantity) || 0);
  if (req.body.inStock !== undefined) prod.inStock = Boolean(req.body.inStock);
  prod.updatedAt = new Date().toISOString();

  res.json(prod);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const index = inMemoryStore.products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  inMemoryStore.products.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
