# Experiment 6: User Authentication and Authorization

## Aim
Implement user authentication and authorization (Login/Registration) using Express.js, MongoDB, and AI coding assistants.

## Technologies Used
Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken (JWT), CORS, React 18 + Next.js, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Implement authentication and authorization for an Express.js + MongoDB API.

MODEL — User
- name: required, max 60
- email: required, unique, lowercase, validated
- passwordHash: required, select: false
- role: "user" | "admin", default "user"
- timestamps

ROUTES
- POST /api/auth/register { name, email, password, role } -> hash with bcrypt, return 201 { user, token }
- POST /api/auth/login { email, password } -> compare hash, return { user, token }; invalid credentials -> 401
- GET /api/auth/me -> requires valid Bearer token
- GET /api/users -> admin only; non-admin receives 403 Forbidden

SECURITY RULES
- Passwords only stored as bcrypt hashes (cost 10).
- JWT signed with JWT_SECRET, expires in 2h.
- Never expose passwordHash in API responses.
- Seed demo accounts on boot for demonstration.

UI
- Login / Register tabs, inline field errors, Bearer token stored in state, profile panel, and admin user table.
```

## Conclusion
User registration, bcrypt password hashing, JWT token authentication, and role-based route authorization were successfully deployed. Protected routes correctly authenticated admin tokens while returning 401 and 403 status codes for invalid credentials.
