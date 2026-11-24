const express = require('express');
const router = express.Router();
const { inMemoryStore } = require('../lib/db');

// GET /api/students/stats - Must be defined BEFORE /:id
router.get('/stats', (req, res) => {
  const students = inMemoryStore.students;
  const total = students.length;

  const courseCounts = { CSE: 0, ECE: 0, ME: 0, CE: 0 };
  let totalGPA = 0;

  students.forEach(s => {
    if (courseCounts[s.course] !== undefined) {
      courseCounts[s.course]++;
    }
    totalGPA += Number(s.gpa) || 0;
  });

  const avgGPA = total > 0 ? (totalGPA / total).toFixed(2) : '0.00';

  res.json({
    totalStudents: total,
    courseBreakdown: courseCounts,
    averageGPA: parseFloat(avgGPA)
  });
});

// GET /api/students
router.get('/', (req, res) => {
  let { search, course, sort, page = 1, limit = 20 } = req.query;
  page = parseInt(page) || 1;
  limit = Math.min(parseInt(limit) || 20, 100);

  let list = [...inMemoryStore.students];

  if (course && course !== 'ALL') {
    list = list.filter(s => s.course.toUpperCase() === course.toUpperCase());
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
  }

  if (sort === 'gpa_desc') {
    list.sort((a, b) => b.gpa - a.gpa);
  } else if (sort === 'name_asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

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

// GET /api/students/:id
router.get('/:id', (req, res) => {
  const s = inMemoryStore.students.find(item => item._id === req.params.id);
  if (!s) {
    return res.status(404).json({ error: 'Student record not found' });
  }
  res.json(s);
});

// POST /api/students
router.post('/', (req, res) => {
  const { name, rollNo, email, course, year = 1, gpa = 0 } = req.body;

  if (!name || !rollNo || !email || !course) {
    return res.status(400).json({
      error: 'Validation Error',
      details: { message: 'Name, roll number, email, and course are required' }
    });
  }

  const formattedRoll = rollNo.trim().toUpperCase();
  const formattedEmail = email.trim().toLowerCase();

  // Unique constraint checks
  const rollConflict = inMemoryStore.students.find(s => s.rollNo === formattedRoll);
  if (rollConflict) {
    return res.status(409).json({ error: 'Conflict Error', details: { rollNo: `Roll number ${formattedRoll} is already registered` } });
  }

  const emailConflict = inMemoryStore.students.find(s => s.email === formattedEmail);
  if (emailConflict) {
    return res.status(409).json({ error: 'Conflict Error', details: { email: `Email ${formattedEmail} is already registered` } });
  }

  const validCourses = ['CSE', 'ECE', 'ME', 'CE'];
  if (!validCourses.includes(course.toUpperCase())) {
    return res.status(400).json({ error: 'Validation Error', details: { course: `Course must be one of: ${validCourses.join(', ')}` } });
  }

  const newStudent = {
    _id: `stud_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    rollNo: formattedRoll,
    email: formattedEmail,
    course: course.toUpperCase(),
    year: parseInt(year) || 1,
    gpa: parseFloat(gpa) || 0,
    createdAt: new Date().toISOString()
  };

  inMemoryStore.students.unshift(newStudent);
  res.status(201).location(`/api/students/${newStudent._id}`).json(newStudent);
});

// PUT /api/students/:id
router.put('/:id', (req, res) => {
  const index = inMemoryStore.students.findIndex(s => s._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Student record not found' });
  }

  const { name, email, course, year, gpa } = req.body;
  inMemoryStore.students[index] = {
    ...inMemoryStore.students[index],
    name: name ? name.trim() : inMemoryStore.students[index].name,
    email: email ? email.trim().toLowerCase() : inMemoryStore.students[index].email,
    course: course ? course.toUpperCase() : inMemoryStore.students[index].course,
    year: year ? parseInt(year) : inMemoryStore.students[index].year,
    gpa: gpa !== undefined ? parseFloat(gpa) : inMemoryStore.students[index].gpa,
    updatedAt: new Date().toISOString()
  };

  res.json(inMemoryStore.students[index]);
});

// DELETE /api/students/:id
router.delete('/:id', (req, res) => {
  const index = inMemoryStore.students.findIndex(s => s._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Student record not found' });
  }
  inMemoryStore.students.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
