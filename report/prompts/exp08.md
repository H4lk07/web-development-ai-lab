# Experiment 8: Database-Driven Student Management System

## Aim
Create a database-driven Student Management System using MongoDB and Express.js with AI-assisted debugging and optimization.

## Technologies Used
MongoDB, Mongoose 8 (indexes, aggregation pipeline, .lean()), Node.js, Express.js, React 18, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Build a Student Management System with Express.js and MongoDB, then debug and optimise it.

MODEL — Student
- name: required, max 80
- rollNo: required, unique, uppercase (e.g. 23BCON1662)
- email: required, unique, lowercase, validated
- course: CSE | ECE | ME | CE
- year: integer 1–4; gpa: number 0–10; timestamps
- compound index on (course, gpa); seed demo students idempotently

ENDPOINTS (base /api/students)
- GET / ?search=&course=&page=&limit=&sort=
- GET /stats -> total students, per-course count and average GPA (aggregation pipeline)
- GET /:id, POST / (201), PUT /:id, DELETE /:id (204)

DEBUGGING & OPTIMIZATION TASKS
1. Register /stats before /:id to prevent route shadowing.
2. Catch duplicate rollNo/email and return clean 409 Conflict errors.
3. Use .lean() on read queries for fast serialization.
4. Cap pagination query limit at 100.
5. Create UI with summary statistics cards, search bar, course filter chips, and add student modal.
```

## Conclusion
A database-driven student management system was developed, debugged, and optimized with AI assistance. Unique index enforcement, route shadow remediation, and MongoDB aggregation pipelines for GPA analytics were verified.
