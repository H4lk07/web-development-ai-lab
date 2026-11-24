# Experiment 5: CRUD Web Application with Node.js, Express.js and MongoDB

## Aim
Develop a CRUD-based web application using Node.js, Express.js, and MongoDB with AI-assisted code generation.

## Technologies Used
Node.js, Express.js, MongoDB, Mongoose, in-memory resilient store, CORS, React 18 + Next.js, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
You are a backend engineer. Generate a complete CRUD application for a task manager using Node.js, Express.js and MongoDB (Mongoose), plus a React UI.

DATA MODEL — Task
- title: string, required, trimmed, max 120 chars
- description: string, default "", max 1000 chars
- priority: "low" | "medium" | "high", default "medium"
- done: boolean, default false
- timestamps: true

API (mounted at /api/tasks)
- GET / list with ?search=&done=&sort=&page=&limit=
- GET /:id read one, 404 when missing
- POST / create, 201 + Location header; validation failure -> 400
- PUT /:id full update
- PATCH /:id partial update
- DELETE /:id 204 No Content

QUALITY & UI
- Central error handler for validation and bad IDs.
- Enable CORS and JSON body parsing.
- UI: create form, list with priority badges, done checkbox, search box, filter buttons, and live API status badge.
```

## Conclusion
A persistent CRUD task manager was implemented using Express.js and MongoDB. Create, read, update, patch, and delete operations were verified through both the UI and automated HTTP tests, returning standard REST status codes.
