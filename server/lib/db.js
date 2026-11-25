const mongoose = require('mongoose');

let isConnected = false;
let dbMode = 'in-memory';

// In-Memory Data Store (Fallback & Local Dev)
const inMemoryStore = {
  tasks: [],
  users: [],
  products: [],
  students: []
};

// Seed initial demo data
function seedInitialData() {
  if (inMemoryStore.tasks.length === 0) {
    inMemoryStore.tasks = [
      {
        _id: 'task_1',
        title: 'Complete Lab Record Experiments',
        description: 'Implement and test Experiments 1 to 15 for college submission',
        priority: 'high',
        done: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'task_2',
        title: 'Prepare Viva Demonstration',
        description: 'Review architecture diagrams and technical questions',
        priority: 'medium',
        done: false,
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'task_3',
        title: 'Deploy Full-Stack Application',
        description: 'Verify Vercel frontend and Render backend health endpoints',
        priority: 'high',
        done: false,
        createdAt: new Date(Date.now() - 21600000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  if (inMemoryStore.products.length === 0) {
    inMemoryStore.products = [
      {
        _id: 'prod_1',
        name: 'Tidewave Desk Lamp',
        description: 'Warm-tone LED Lamp with USB-C charging dock.',
        category: 'home',
        price: 49.99,
        quantity: 18,
        inStock: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'prod_2',
        name: 'Deep Dive: Node.js Architecture',
        description: 'Comprehensive 400-page handbook on asynchronous Node.js.',
        category: 'books',
        price: 34.50,
        quantity: 50,
        inStock: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'prod_3',
        name: 'Harbourline Windbreaker',
        description: 'Water-resistant lightweight jacket for all seasons.',
        category: 'apparel',
        price: 89.00,
        quantity: 12,
        inStock: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'prod_4',
        name: 'Vortex Mechanical Keyboard',
        description: 'RGB Backlit mechanical keyboard with tactile switches.',
        category: 'electronics',
        price: 119.99,
        quantity: 25,
        inStock: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  if (inMemoryStore.students.length === 0) {
    inMemoryStore.students = [
      {
        _id: 'stud_1',
        name: 'Mayank Goyal',
        rollNo: '23BCON1662',
        email: 'mayank.23bcon1662@jecrcu.edu.in',
        course: 'CSE',
        year: 4,
        gpa: 9.2,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'stud_2',
        name: 'Aarav Sharma',
        rollNo: '23BCON1401',
        email: 'aarav.sharma@jecrcu.edu.in',
        course: 'CSE',
        year: 4,
        gpa: 8.8,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'stud_3',
        name: 'Riya Verma',
        rollNo: '23BCON1420',
        email: 'riya.verma@jecrcu.edu.in',
        course: 'ECE',
        year: 3,
        gpa: 8.5,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'stud_4',
        name: 'Devansh Singhal',
        rollNo: '23BCON1511',
        email: 'devansh.s@jecrcu.edu.in',
        course: 'ME',
        year: 3,
        gpa: 7.9,
        createdAt: new Date().toISOString()
      },
      {
        _id: 'stud_5',
        name: 'Ananya Gupta',
        rollNo: '23BCON1555',
        email: 'ananya.g@jecrcu.edu.in',
        course: 'CE',
        year: 2,
        gpa: 8.3,
        createdAt: new Date().toISOString()
      }
    ];
  }
}

// Call seed immediately so data is populated on require
seedInitialData();

async function connectDB() {
  seedInitialData();

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<username>')) {
    console.log('[DB] Running in optimized in-memory store mode');
    dbMode = 'in-memory (active)';
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isConnected = true;
    dbMode = 'MongoDB Atlas (connected)';
    console.log('[DB] Connected successfully to MongoDB Atlas');
  } catch (err) {
    console.warn('[DB] MongoDB Atlas connection failed, falling back to in-memory store:', err.message);
    dbMode = 'in-memory (Atlas fallback)';
    isConnected = true;
  }
}

module.exports = {
  connectDB,
  inMemoryStore,
  getDbStatus: () => ({ isConnected, mode: dbMode })
};
