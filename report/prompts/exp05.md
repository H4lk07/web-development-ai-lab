# Experiment 5 — AI Prompt Specification

```text
[ROLE]: Backend Systems Architect & Database Engineer.
[OBJECTIVE]: Construct a robust RESTful CRUD API service for task management with persistent MongoDB storage.
[STACK]: Node.js, Express.js 5.0, MongoDB, Mongoose 8.0 ODM, CORS, React 18 Client Interface.
[SCHEMA CONTRACT - Task]:
- title: String, required, trimmed, maxLength: 120; description: String, default: "", maxLength: 1000.
- priority: Enum ["low", "medium", "high"], default: "medium"; done: Boolean, default: false; timestamps: true.
[API ENDPOINT CONTRACT - Base /api/tasks]:
- GET /: Collection query supporting query parameters (?search=, ?done=, ?priority=, ?page=, ?limit=).
- POST /: Document creation returning HTTP 201 Created with Location header and validated JSON payload.
- GET /:id, PUT /:id, PATCH /:id, DELETE /:id: Standard RESTful operations with 200, 204, 400, and 404 status codes.
[ENGINEERING RULES]:
- Implement centralized error handling middleware catching CastError and ValidationError.
- Provide seamless dual-mode persistence (MongoDB connection with automatic in-memory fallback for offline dev).
```
