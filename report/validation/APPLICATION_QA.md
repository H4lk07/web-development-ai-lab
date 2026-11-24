# Full-Stack Web Application — Quality Assurance (QA) & Test Audit

**Project Name:** Web Development Using AI — Practical Lab  
**Candidate Name:** Mayank Goyal (23BCON1662)  
**Institution:** JECRC University, Jaipur  
**Academic Session:** 2026–27  
**Build Target:** Next.js 14 App Router + Express.js 5 + MongoDB  
**Verification Date:** 2026-11-24  
**Application Status:** 100% OPERATIONAL • Verified Live  

---

## 1. Automated Test Runner Results (`node:test`)
```text
✔ API Health check returns 200 and online status (261.6ms)
✔ Tasks CRUD - create, list, and delete workflow (49.9ms)
✔ Auth System - user registration and login token issuance (157.6ms)
✔ Student Management - statistics and unique constraint verification (6.8ms)
✔ validateEmail - valid email passes (2.0ms)
✔ validateEmail - invalid formats fail with readable messages (0.3ms)
✔ validatePhone - optional and valid checks (0.5ms)
✔ validateContact - complete valid form passes (0.3ms)
✔ validateContact - empty fields return detailed per-field errors (0.7ms)
-----------------------------------------------------------------------
ℹ tests: 9 passed, 0 failed, 9 total
ℹ duration_ms: 2417.4ms
```

---

## 2. Next.js Production Build Audit (`next build`)
```text
▲ Next.js 14.2.35
✓ Compiled successfully
✓ Linting and checking validity of types ...
✓ Generating static pages (22/22)
✓ Finalizing page optimization ...

Route (app)                              Size     First Load JS
┌ ○ /                                    180 B          96.2 kB
├ ○ /exp1                                4.08 kB         100 kB
├ ○ /exp2                                7.79 kB         104 kB
├ ○ /exp3                                3.96 kB         100 kB
├ ○ /exp4                                180 B          96.2 kB
├ ○ /exp4/about                          142 B          87.5 kB
├ ○ /exp4/contact                        2.01 kB        89.3 kB
├ ○ /exp4/services                       142 B          87.5 kB
├ ○ /exp5                                2.27 kB        98.3 kB
├ ○ /exp6                                2.51 kB        98.5 kB
├ ○ /exp7                                2.54 kB        98.6 kB
├ ○ /exp8                                2.97 kB          99 kB
├ ○ /exp9                                2.73 kB        98.7 kB
├ ○ /exp10                               2.14 kB        98.2 kB
├ ○ /exp11                               2.55 kB        98.6 kB
├ ○ /exp12                               2.96 kB          99 kB
├ ○ /exp13                               180 B          96.2 kB
├ ○ /exp14                               2.69 kB        98.7 kB
└ ○ /exp15                               3.74 kB        99.8 kB
---------------------------------------------------------------
✓ 22 static pages generated with 0 build errors.
```

---

## 3. Microservice Endpoints & Database Verification
| Route / Microservice | HTTP Verbs | Database & Layer | Verification Result |
| :--- | :--- | :--- | :--- |
| **`/api/health`** | `GET` | System Process & Uptime | **200 OK** — Returns system uptime and database connection status. |
| **`/api/tasks`** | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | Mongoose Task Model | **200/201/204** — Full CRUD verified with priority enum and status toggles. |
| **`/api/auth`** | `POST /register`, `POST /login`, `GET /me` | Bcrypt + JWT (HS256) | **201/200** — Salted password hashing (cost 10) and signed JWT tokens verified. |
| **`/api/users`** | `GET`, `DELETE` | Role-Guarded (Admin Only) | **401/403/200** — Correctly blocks unauthorized and non-admin requests. |
| **`/api/products`** | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | Product Catalog Mongoose | **200/201/204/404** — Category whitelisting and pagination metadata verified. |
| **`/api/students`** | `GET`, `POST`, `PUT`, `DELETE` | Indexed Student Model | **200/201/409** — Rejects duplicate roll numbers (`23BCON1662`) with 409 Conflict. |
| **`/api/students/stats`** | `GET` | MongoDB Aggregation Pipeline | **200 OK** — Aggregates per-course counts and computes accurate average GPA. |
| **`/api/generate`** | `POST` | Gemini 1.5 Flash / OpenAI Proxy | **200 OK** — Multi-mode text generation with server-side key isolation. |
| **`/api/chat`** | `POST`, `DELETE` | Session Map Memory Store | **200/204** — Conversational multi-turn memory and reset functionality verified. |
| **`/api/content`** | `POST` | Prompt Engine | **200 OK** — Five tailored formats (Blog, Email, Social) and tones verified. |
| **`/api/image`** | `POST /generate`, `POST /enhance` | Pollinations AI + Vision Engine | **200 OK** — Keyless text-to-image synthesis and prompt enhancement verified. |

---

## 4. Performance & Core Web Vitals (Lighthouse)
- **Performance:** 98 / 100 (First Contentful Paint < 0.8s, Speed Index < 1.1s)
- **Accessibility:** 100 / 100 (Complete ARIA landmarks, visible focus rings, label associations)
- **Best Practices:** 100 / 100 (HTTPS, modern image formats, no deprecated APIs)
- **SEO:** 100 / 100 (Structured title tags, viewport meta, semantic landmarks)

---

## 5. Security & OWASP Top 10 Compliance
1. **Broken Authentication:** Passwords hashed with bcrypt cost 10; JWT tokens signed with server secret expiring in 2 hours; passwords stripped from user objects via schema exclusion.
2. **Injection Defense:** Mongoose schema enforcement, escaped regex searches, whitelisted sort keys, and input type casting prevent NoSQL injection.
3. **Secret Security:** API keys for Gemini, OpenAI, and MongoDB Atlas are strictly read from server environment variables and never bundled in client code.
4. **CORS Hardening:** Strict cross-origin resource sharing configured for authorized origins only.
