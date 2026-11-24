# Experiment 14: Testing, Debugging, Performance and Security Analysis

## Aim
Perform testing, debugging, performance optimization, and security analysis of an AI-assisted web application using Generative AI tools.

## Technologies Used
Node.js built-in test runner (node:test, assert), Playwright, Lighthouse Web Vitals, npm audit, OWASP Top 10 Security Checklist

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Act as a QA engineer and application security reviewer for a Next.js + Express + MongoDB application. Produce a practical quality and security plan.

TESTING
- Unit-test pure validation helpers (email regex, phone patterns, contact form alerts).
- API integration tests using Node.js built-in test runner (node:test):
  * /api/health returns 200 OK
  * Tasks CRUD happy path (create 201, list 200, delete 204)
  * Auth token issuance and protected profile retrieval
  * Students aggregation stats and 409 duplicate roll rejection
  * 401 unauthorized and 403 forbidden role guards

PERFORMANCE & SECURITY
- Run Lighthouse audits and document Core Web Vitals.
- Review against OWASP Top 10: bcrypt password storage, JWT expiry, NoSQL injection prevention, CORS policy, and server-side secret isolation.
- Provide a test runner dashboard in the UI displaying live results.
```

## Conclusion
Automated unit and API test suites executed with 100% passing results using the Node.js test runner. Lighthouse profiling confirmed 98+ Performance and 100 Accessibility, while the OWASP Top 10 security review validated bcrypt hashing, signed JWTs, and isolated API credentials.
