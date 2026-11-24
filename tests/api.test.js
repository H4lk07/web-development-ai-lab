const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../server/index');

let server;
let baseUrl;

test.before(async () => {
  await new Promise(resolve => {
    server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
});

test('API Health check returns 200 and online status', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'online');
  assert.ok(data.uptime >= 0);
});

test('Tasks CRUD - create, list, and delete workflow', async () => {
  // Create task
  const createRes = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Automated Test Task',
      description: 'Verifying CRUD functionality with node:test',
      priority: 'high'
    })
  });
  assert.equal(createRes.status, 201);
  const created = await createRes.json();
  assert.equal(created.title, 'Automated Test Task');

  // List tasks
  const listRes = await fetch(`${baseUrl}/api/tasks`);
  assert.equal(listRes.status, 200);
  const listData = await listRes.json();
  assert.ok(listData.data.some(t => t._id === created._id));

  // Delete task
  const delRes = await fetch(`${baseUrl}/api/tasks/${created._id}`, { method: 'DELETE' });
  assert.equal(delRes.status, 204);
});

test('Auth System - user registration and login token issuance', async () => {
  const email = `testuser_${Date.now()}@jecrcu.edu.in`;
  // Register
  const regRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Student',
      email,
      password: 'StrongPassword123!'
    })
  });
  assert.equal(regRes.status, 201);
  const regData = await regRes.json();
  assert.ok(regData.token);
  assert.equal(regData.user.email, email);

  // Login
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: 'StrongPassword123!'
    })
  });
  assert.equal(loginRes.status, 200);
  const loginData = await loginRes.json();
  assert.ok(loginData.token);

  // Protected route with token
  const meRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${loginData.token}` }
  });
  assert.equal(meRes.status, 200);
  const meData = await meRes.json();
  assert.equal(meData.user.email, email);
});

test('Student Management - statistics and unique constraint verification', async () => {
  // Stats
  const statsRes = await fetch(`${baseUrl}/api/students/stats`);
  assert.equal(statsRes.status, 200);
  const stats = await statsRes.json();
  assert.ok(stats.totalStudents >= 1);
  assert.ok(stats.courseBreakdown.CSE >= 1);

  // Duplicate roll number rejection (409)
  const dupRes = await fetch(`${baseUrl}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Duplicate Student',
      rollNo: '23BCON1662', // Mayank's roll number already seeded
      email: 'dup.student@jecrcu.edu.in',
      course: 'CSE'
    })
  });
  assert.equal(dupRes.status, 409);
});
