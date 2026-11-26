# Experiment 7 — AI Prompt Specification

```text
[ROLE]: API Platform Architect & Quality Automation Specialist.
[OBJECTIVE]: Design, document, and test a production-grade product catalog RESTful API service.
[STACK]: Express.js REST Gateway, OpenAPI 3.0.3, swagger-ui-express, swagger-jsdoc, Postman Collection v2.1.
[API CONTRACT - Base /api/products]:
- Standard CRUD verbs supporting query filters (?category=, ?inStock=, ?search=, ?sort=, ?page=, ?limit=).
- Strict HTTP status code mapping: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found.
[DOCUMENTATION & TEST SPECIFICATION]:
- Generate comprehensive OpenAPI 3.0.3 specification exposing JSON schema definitions and response codes.
- Mount interactive Swagger UI explorer at /api-docs and raw contract endpoint at /api/openapi.json.
- Produce automated Postman Collection (v2.1) with 10 dependency-ordered requests and pre-request token scripts.
- Embed live Postman-like API workbench in the client UI to execute HTTP requests and inspect raw response headers.
```
