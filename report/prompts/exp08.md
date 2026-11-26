# Experiment 8 — AI Prompt Specification

```text
[ROLE]: Database Administrator & Senior Backend Optimization Specialist.
[OBJECTIVE]: Architect a high-throughput Student Management System with MongoDB indexing and aggregation analytics.
[STACK]: Node.js, Express.js, MongoDB Atlas, Mongoose 8.0, B-tree Indexing, Aggregation Pipelines.
[SCHEMA & INDEX DESIGN - Student]:
- name: String; rollNo: String, required, unique, uppercase; email: String, required, unique, lowercase.
- course: Enum ["CSE", "ECE", "ME", "CE"]; year: Integer 1-4; gpa: Number 0.0-10.0; timestamps: true.
- Compound Index: db.students.createIndex({ course: 1, gpa: -1 }) to eliminate full collection scans.
[ENDPOINTS & PIPELINES]:
- Register /stats before /:id to prevent route shadowing; execute $group pipeline computing average GPA by course.
- Optimize read queries using Mongoose .lean() execution and capped pagination limits (?limit=100).
- Catch duplicate roll number submissions and map E11000 index violations to HTTP 409 Conflict errors.
```
