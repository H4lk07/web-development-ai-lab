# Experiment 7: RESTful APIs Tested with Postman

## Aim
Develop RESTful APIs for a web application and test them using Postman with AI-generated API documentation.

## Technologies Used
Node.js, Express.js, MongoDB, OpenAPI 3.0, swagger-jsdoc, swagger-ui-express, Postman collection v2.1, React 18, Tailwind CSS

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Design and document a RESTful API for a product catalogue.

RESOURCE — Product
- name (required, max 120), description (max 2000)
- category: electronics | apparel | books | home (required)
- price: required, >= 0; quantity: >= 0, default 0; inStock: boolean, default true

ENDPOINTS (base /api/products)
- GET / ?category=&inStock=&search=&page=&limit=&sort=
- GET /:id -> 200 or 404
- POST / -> 201 + Location header; validation failure -> 400
- PUT /:id -> full replace
- PATCH /:id -> partial update
- DELETE /:id -> 204 No Content

DOCUMENTATION & TESTING
- Produce a complete OpenAPI 3.0.3 document with schemas, parameters, and responses.
- Serve Swagger UI at /api-docs and raw spec at /api/openapi.json.
- Generate a Postman collection (v2.1) with 10 dependency-ordered requests and environment file.
- Provide a Postman-like live workbench in the UI to send requests and inspect headers and response JSON.
```

## Conclusion
A product catalog RESTful API was developed and documented with OpenAPI 3.0 and Swagger UI. An automated 10-request Postman test collection verified endpoint reliability, pagination, query filtering, and error handling.
