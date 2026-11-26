# Experiment 6 — AI Prompt Specification

```text
[ROLE]: Application Security Architect & Identity Management Specialist.
[OBJECTIVE]: Implement a secure user authentication and role-based access control (RBAC) microservice.
[STACK]: Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken (JWT), HTTP Bearer Authorization.
[DATA MODEL - User]:
- name: String, required; email: String, required, unique, lowercase, regex-validated; role: "user" | "admin".
- passwordHash: String, required, select: false (strictly isolated from default queries); timestamps: true.
[SECURITY PIPELINE]:
- POST /api/auth/register: Salt and hash raw password with bcrypt (cost 10); reject duplicates with 409 Conflict.
- POST /api/auth/login: Verify password hash via bcrypt.compare; sign stateless HS256 JWT expiring in 2 hours.
- Middleware Guards: requireAuth decodes Bearer token; requireRole("admin") restricts admin endpoints with 403.
- Interactive Dashboard: Tabbed Login/Register views, Bearer token storage in client state, and admin user table.
[CONSTRAINTS]: Never transmit or log plaintext passwords; sanitize all user DTOs before returning JSON responses.
```
