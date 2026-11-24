# Web Development Using AI (BCO682A) — College Viva Preparation Guide

**Candidate Name:** Mayank Goyal  
**Roll / Enrollment Number:** 23BCON1662  
**Course & Semester:** B.Tech Computer Science & Engineering (7th Semester, Section P)  
**Institution:** JECRC University, Jaipur  
**Academic Session:** 2026–27  
**Faculty Guide / Evaluator:** Mr. Mohit Parashar  
**AI Development Tool:** Antigravity  

---

## Quick Viva Summary Checklist
- **Frontend Core:** Next.js App Router (React 18), Tailwind CSS, Bootstrap 5.3, Vanilla JavaScript DOM APIs.
- **Backend Core:** Node.js, Express.js 5 RESTful API Gateway, JSON Web Tokens (JWT), Bcrypt password hashing.
- **Database & Optimization:** MongoDB, Mongoose 8, unique indexing on roll numbers, compound indexes, aggregation pipelines for GPA analytics.
- **Artificial Intelligence Integration:** Google Gemini 1.5 Flash, OpenAI GPT-4o, Pollinations AI public image API, vision captioning, server-side key isolation, and offline neural mock fallbacks.
- **Testing & DevOps:** Node.js built-in test runner (`node:test`), Playwright automated screenshot capture, Lighthouse Core Web Vitals (98+ performance), OWASP Top 10 security audit, Git v1.0.0, Vercel & Render production hosting.

---

## Experiment 1 — Responsive Personal Portfolio Website

### 1. What the Experiment Does
Creates a modern, responsive personal portfolio for Mayank Goyal with a hero introduction, about me section highlighting JECRC University education, interactive technical skills matrix, project showcase cards, and a client-side validated contact form.

### 2. Why Technologies Were Used
- **HTML5:** Provides semantic structural landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) improving accessibility and SEO.
- **Tailwind CSS:** Provides utility-first styling with responsive breakpoint prefixes (`sm:`, `md:`, `lg:`) and zero runtime overhead.
- **React & Next.js:** Enables component reusability and fast single-page client transitions.

### 3. How the Application Works
The user scrolls through distinct semantic sections. The contact form validates name length, RFC 5322 email patterns, and message length before providing real-time feedback with `role="alert"` announcements.

### 4. Important Concepts & APIs
- Semantic HTML landmarks, responsive viewport meta tags, mobile-first design, CSS custom properties, client-side input validation.

### 5. How AI Assisted
Antigravity generated the component hierarchy, calculated responsive breakpoint grid layouts, and structured the initial accessibility checklist.

### 6. How to Demonstrate in Viva
Navigate to `/exp1`. Resize browser to mobile (375px) and desktop (1440px) to demonstrate grid reflow. Submit an empty contact form to display validation messages, then submit a valid form to show the green confirmation state.

### 7. Five Common Viva Questions & Answers
1. **Q: What is the difference between semantic and non-semantic HTML?**  
   *A:* Semantic elements (like `<header>`, `<article>`, `<section>`) describe their meaning to both the browser and developer, improving accessibility and SEO, unlike generic `<div>` and `<span>`.
2. **Q: What does the viewport meta tag do?**  
   *A:* It controls the layout viewport dimensions on mobile devices (`width=device-width, initial-scale=1.0`), preventing artificial zooming.
3. **Q: How does Tailwind CSS differ from standard CSS?**  
   *A:* Tailwind provides low-level atomic utility classes that are purged at compile-time, resulting in minimal CSS bundle sizes and zero style conflicts.
4. **Q: How does client-side validation benefit user experience?**  
   *A:* It provides immediate visual feedback before an HTTP request is dispatched to the backend, reducing server load and network round-trips.
5. **Q: How are responsive breakpoints defined?**  
   *A:* Using CSS media queries (`@media (min-width: 768px)`), allowing layout rules to adapt according to screen widths.

---

## Experiment 2 — Responsive Startup Landing Page with Bootstrap

### 1. What the Experiment Does
Builds a high-conversion landing page for fictional B2B observability startup "AuraMetrics AI" featuring a sticky collapsible navbar, gradient hero with mock telemetry, 4-stat metric strip, 6-card feature grid, 3-tier pricing cards with a highlighted popular badge, and a client review carousel.

### 2. Why Technologies Were Used
- **Bootstrap 5.3:** Provides standard 12-column grid system, pre-tested accessible components (`navbar-toggler`, `carousel`, `card`), and consistent responsive utilities.
- **Scoped CSS:** Scoped styles prevent Bootstrap's reset from interfering with global Tailwind utilities.

### 3. How the Application Works
Bootstrap classes (`container`, `row`, `col-lg-6`, `col-md-4`) create a fluid layout. The JavaScript-driven review carousel allows users to cycle through client quotes.

### 4. Important Concepts & APIs
- 12-column flexbox grid system, breakpoint tiers (`sm`, `md`, `lg`, `xl`), Bootstrap utility classes, carousel component.

### 5. How AI Assisted
Antigravity generated the balanced 3/2/1 column breakpoint rules, telemetry mock dashboard markup, and scoped CSS gradient rules.

### 6. How to Demonstrate in Viva
Open `/exp2`. Demonstrate navbar collapse below 992px, click carousel indicator dots to cycle quotes, and highlight the middle "Professional" pricing card transformation.

### 7. Five Common Viva Questions & Answers
1. **Q: Explain the Bootstrap 12-column grid.**  
   *A:* Rows are split into 12 virtual columns. Column classes (like `col-md-6`) specify how many columns an element spans across specific screen sizes.
2. **Q: What is the difference between `.container` and `.container-fluid`?**  
   *A:* `.container` has fixed max-widths at each breakpoint with responsive margins, while `.container-fluid` always spans 100% of viewport width.
3. **Q: Why is Bootstrap 5 different from Bootstrap 4?**  
   *A:* Bootstrap 5 dropped jQuery in favor of native vanilla JavaScript, added CSS custom properties, and expanded utility classes.
4. **Q: What are Bootstrap breakpoints?**  
   *A:* They are pixel dimensions (xs < 576px, sm ≥ 576px, md ≥ 768px, lg ≥ 992px, xl ≥ 1200px, xxl ≥ 1400px) that trigger media query changes.
5. **Q: How is accessibility maintained in carousels?**  
   *A:* Through `aria-hidden`, `aria-label`, and keyboard focusable control buttons.

---

## Experiment 3 — Interactive Web Page with JavaScript and DOM Manipulation

### 1. What the Experiment Does
A DOM experimentation workbench featuring a live digital clock, time-based greeting, light/dark theme switcher, interactive click counter, live search filtering, animated progress bar with `requestAnimationFrame`, accessible modal dialog, and collapsible accordion.

### 2. Why Technologies Were Used
- **Vanilla JavaScript:** Demonstrates core browser APIs without abstraction layers.
- **DOM APIs:** `querySelector`, `addEventListener`, `classList`, `setInterval`, `requestAnimationFrame`.

### 3. How the Application Works
The clock updates every 1000ms via `setInterval`. The progress bar increments smoothly on every display refresh cycle using `requestAnimationFrame`. Project search queries dynamically filter cards in real-time.

### 4. Important Concepts & APIs
- Event delegation, timer intervals, frame rendering loop, accessible keyboard traps (Esc key), `aria-expanded`.

### 5. How AI Assisted
Antigravity implemented the step-based `requestAnimationFrame` timing curve and ensured timer/event listener cleanup on component unmount.

### 6. How to Demonstrate in Viva
Open `/exp3`. Toggle Light/Dark mode. Click "Animate Progress" to show the smooth 60fps progress bar. Open the Modal dialog and press Escape to close it. Type into the project search bar to show live DOM filtering.

### 7. Five Common Viva Questions & Answers
1. **Q: What is the difference between `setInterval` and `requestAnimationFrame`?**  
   *A:* `setInterval` fires at a fixed millisecond delay regardless of screen refresh rate. `requestAnimationFrame` synchronizes execution with the screen refresh rate (usually 60Hz/120Hz) and pauses when the tab is backgrounded.
2. **Q: Explain Event Delegation.**  
   *A:* Attaching a single event listener to a parent element to handle events from multiple child elements by taking advantage of event bubbling.
3. **Q: How does `classList.toggle` work?**  
   *A:* It adds a class if absent, or removes it if present, allowing straightforward dynamic UI state toggling.
4. **Q: Why must event listeners and intervals be cleared on unmount?**  
   *A:* To prevent memory leaks and dangling background processes from consuming CPU resources.
5. **Q: What is the DOM tree?**  
   *A:* An in-memory, tree-structured object representation of the HTML document created by the browser parsing engine.

---

## Experiment 4 — Multi-Page Website with Navigation, Forms and Validation

### 1. What the Experiment Does
Constructs a four-page business site for "Bluepeak Studio" (Home, About, Services, Contact) featuring a sticky layout shell, active link indicators, and a pure client validation engine.

### 2. Why Technologies Were Used
- **Next.js App Router:** Employs nested routing (`/about`, `/services`, `/contact`) with zero client-side page reload delays.
- **Pure JavaScript Validation Module (`lib/validation.js`):** Decouples validation logic from React rendering so it can be independently tested.

### 3. How the Application Works
`layout.tsx` wraps all subpages with persistent navigation. When the contact form is submitted, `validateContact()` evaluates name length, email regex, and message boundaries.

### 4. Important Concepts & APIs
- Nested layouts, route segment hooks (`usePathname`), RFC 5322 email regular expressions, accessibility alerts (`role="alert"`).

### 5. How AI Assisted
Antigravity engineered the decoupled validation library and ensured strict accessibility compliance across all form elements.

### 6. How to Demonstrate in Viva
Navigate through `/exp4`, `/about`, `/services`, `/contact`. Notice how navigation persists without reloading. On `/contact`, submit invalid data to inspect field-level error messages, then submit valid data.

### 7. Five Common Viva Questions & Answers
1. **Q: How does Next.js App Router differ from legacy Pages router?**  
   *A:* App Router utilizes React Server Components by default, folder-based routing, nested layouts (`layout.tsx`), and granular streaming with Suspense.
2. **Q: What is the benefit of keeping validation in a pure function?**  
   *A:* Pure functions have no side effects, making them trivial to unit-test with runners like `node:test` without spinning up browser DOMs.
3. **Q: What regex pattern validates emails?**  
   *A:* `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, which checks for non-whitespace characters surrounding an `@` symbol and a top-level domain.
4. **Q: Why use `role="alert"` on error containers?**  
   *A:* Assistive technologies (screen readers) immediately announce alerts to users without waiting for user interaction.
5. **Q: What does `usePathname()` return?**  
   *A:* It returns the current URL pathname string, allowing navigation links to conditionally highlight active routes.

---

## Experiment 5 — CRUD Web Application with Node.js, Express.js and MongoDB

### 1. What the Experiment Does
A persistent Task Management system supporting Create, Read, Update, Partial Patch, and Delete operations over a REST API connected to MongoDB.

### 2. Why Technologies Were Used
- **Node.js & Express.js:** Fast, asynchronous, event-driven backend server.
- **MongoDB & Mongoose:** Document-oriented NoSQL database providing schema validation and dynamic JSON persistence.

### 3. How the Application Works
The frontend sends HTTP requests (`fetch`) to `/api/tasks`. Express route handlers process query parameters, validate schemas, perform database mutations, and return proper status codes (201 Created with Location header, 204 No Content for delete).

### 4. Important Concepts & APIs
- HTTP Verbs (GET, POST, PUT, PATCH, DELETE), REST semantics, Mongoose models, status code mapping.

### 5. How AI Assisted
Antigravity generated the REST route handlers, implemented asynchronous error propagation, and built the in-memory database fallback.

### 6. How to Demonstrate in Viva
Open `/exp5`. Add a new task with high priority. Check off the task to demonstrate `PATCH /api/tasks/:id` updating completion status. Delete a task to demonstrate `DELETE` (204).

### 7. Five Common Viva Questions & Answers
1. **Q: What is the difference between PUT and PATCH?**  
   *A:* `PUT` completely replaces the target resource with the request payload, whereas `PATCH` applies partial modifications to specific fields.
2. **Q: What does status code 201 Created signify?**  
   *A:* It indicates that the request succeeded and resulted in the creation of a new resource, typically accompanied by a `Location` header pointing to it.
3. **Q: What is Mongoose?**  
   *A:* An Object Data Modeling (ODM) library for MongoDB that provides schema definitions, validation, middleware, and query building.
4. **Q: What does status code 204 No Content mean?**  
   *A:* The server successfully processed the request (e.g. DELETE), but is intentionally returning no response body.
5. **Q: What is CORS and why is it needed?**  
   *A:* Cross-Origin Resource Sharing is a browser security mechanism that restricts web pages from making API requests to a different domain, port, or protocol unless the server permits it.

---

## Experiment 6 — User Authentication and Authorization

### 1. What the Experiment Does
Implements secure user registration, login, bcrypt password hashing, JSON Web Token (JWT) issuance, and role-based route guards (`user` vs `admin`).

### 2. Why Technologies Were Used
- **bcryptjs:** One-way salt hashing algorithm resistant to rainbow table and brute-force attacks.
- **jsonwebtoken (JWT):** Stateless cryptographic token standard for verifiable client sessions.

### 3. How the Application Works
During registration, passwords are salted and hashed with a cost factor of 10. During login, `bcrypt.compare` verifies credentials. A signed JWT containing user ID and role is issued and sent in the `Authorization: Bearer <token>` header on subsequent requests.

### 4. Important Concepts & APIs
- Password hashing vs encryption, JWT claims (header, payload, signature), role-based middleware, HTTP 401 Unauthorized vs 403 Forbidden.

### 5. How AI Assisted
Antigravity generated the JWT verification middleware and role authorization guards, ensuring passwords never leak in API outputs.

### 6. How to Demonstrate in Viva
Open `/exp6`. Log in using pre-seeded admin credentials (`admin@demo.dev` / `AdminPass123!`). Demonstrate the Admin panel listing all users. Toggle to a normal student account to demonstrate access restriction.

### 7. Five Common Viva Questions & Answers
1. **Q: Why should passwords never be stored in plain text?**  
   *A:* If the database is compromised, plaintext passwords expose users directly. Salted hashes ensure that even identical passwords produce completely different hash strings that cannot be reversed.
2. **Q: What are the three parts of a JSON Web Token?**  
   *A:* Header (algorithm & token type), Payload (claims like user ID and role), and Signature (HMAC-SHA256 signature signed with a secret).
3. **Q: What is the difference between 401 Unauthorized and 403 Forbidden?**  
   *A:* 401 indicates that authentication is missing or invalid (user is not logged in). 403 indicates that the user is authenticated, but lacks permission for the requested action.
4. **Q: Why is JWT considered stateless?**  
   *A:* The server does not need to store active sessions in a database; all authorization data is cryptographically encapsulated within the signed token itself.
5. **Q: What is a bcrypt salt?**  
   *A:* A random string appended to passwords before hashing to ensure that identical passwords produce distinct hash values, defeating rainbow table attacks.

---

## Experiment 7 — RESTful APIs Tested with Postman & Swagger

### 1. What the Experiment Does
Develops a comprehensive Product Catalog REST API documented with OpenAPI 3.0 and Swagger UI, and tested through a 10-request Postman test suite.

### 2. Why Technologies Were Used
- **OpenAPI 3.0 & Swagger UI:** Provides industry-standard interactive API documentation served directly at `/api-docs`.
- **Postman Collection v2.1:** Encapsulates automated test requests, environment variables (`{{baseUrl}}`), and status code assertions.

### 3. How the Application Works
Express routes handle product filtering, creation, updates, and deletions. The frontend includes a live Postman-like workbench that dispatches actual requests to the server, displaying status code, latency, and formatted JSON responses.

### 4. Important Concepts & APIs
- API contracts, OpenAPI 3.0 specification, Postman collections, query string filtering, pagination metadata.

### 5. How AI Assisted
Antigravity generated the OpenAPI schema definitions and matching Postman JSON collection export files.

### 6. How to Demonstrate in Viva
Open `/exp7`. Click "Send Request" to test `GET /api/products`, showing 200 OK and JSON data. Click "Open Swagger UI" to show live interactive OpenAPI documentation at `http://localhost:5000/api-docs`.

### 7. Five Common Viva Questions & Answers
1. **Q: What is OpenAPI / Swagger?**  
   *A:* A standardized, language-agnostic interface description format for RESTful APIs that allows humans and computers to discover and interact with services without access to source code.
2. **Q: How do Postman environment variables work?**  
   *A:* They store key-value pairs (like `{{baseUrl}} = http://localhost:5000`) that dynamically substitute into requests, enabling testing across local, staging, and production environments.
3. **Q: What makes an API "RESTful"?**  
   *A:* Conformance to REST constraints: statelessness, client-server separation, cacheability, uniform interface, and standard HTTP method semantics.
4. **Q: How does pagination protect database performance?**  
   *A:* By using `limit` and `page`/`skip` query parameters, the database returns only a slice of data rather than transferring thousands of rows in memory.
5. **Q: What status code is returned when a requested ID does not exist?**  
   *A:* HTTP 404 Not Found.

---

## Experiment 8 — Database-Driven Student Management System

### 1. What the Experiment Does
A persistent Student Management System for JECRC University with student addition, editing, deletion, course filtering (CSE, ECE, ME, CE), roll number uniqueness validation, and live GPA aggregation statistics.

### 2. Why Technologies Were Used
- **MongoDB Unique Indexing:** Enforces strict uniqueness on roll numbers and email addresses at the database engine level.
- **MongoDB Aggregation Pipeline:** Computes total counts, per-course breakdowns, and average GPA efficiently on the server.
- **Mongoose `.lean()`:** Skips full Mongoose document hydration on read queries, speeding up serialization.

### 3. How the Application Works
When a student is added, the server verifies that the roll number doesn't exist; if duplicate, it returns HTTP 409 Conflict. The `/api/students/stats` endpoint runs an aggregation query to compute overall academic metrics.

### 4. Important Concepts & APIs
- Compound indexes, unique indexes, MongoDB aggregation framework (`$group`, `$avg`), HTTP 409 Conflict, route order precedence (registering `/stats` before `/:id`).

### 5. How AI Assisted
Antigravity identified route shadowing issues where `/:id` caught `/stats`, corrected the order, and implemented compound `(course, gpa)` indexing.

### 6. How to Demonstrate in Viva
Open `/exp8`. Show the summary cards displaying student counts and average GPA. Filter by "CSE" to inspect computer science undergraduates. Attempt to add a student with roll number `23BCON1662` to demonstrate 409 Conflict handling.

### 7. Five Common Viva Questions & Answers
1. **Q: Why must `/stats` be registered before `/:id` in Express?**  
   *A:* Express evaluates routes in the exact order they are declared. If `/:id` is registered first, it intercepts the string "stats" as an ID parameter, resulting in a 404 or CastError.
2. **Q: What is a database index and why is it important?**  
   *A:* An index is a specialized B-tree data structure that allows the database engine to locate records without performing a costly full-collection scan.
3. **Q: What does the `.lean()` query method do in Mongoose?**  
   *A:* It returns plain JavaScript objects instead of heavy Mongoose Documents, dramatically reducing memory usage and query execution latency.
4. **Q: What is a MongoDB aggregation pipeline?**  
   *A:* A multi-stage data processing pipeline where documents pass through stages (such as `$match`, `$group`, `$project`) to transform and aggregate data.
5. **Q: What does status code 409 Conflict represent?**  
   *A:* It indicates that the request could not be completed due to a conflict with the current state of the resource, such as duplicate unique keys.

---

## Experiment 9 — AI-Powered Text Generation Studio

### 1. What the Experiment Does
Integrates Google Gemini 1.5 Flash and OpenAI APIs through a server-side Express proxy for 5 generation modes: Freeform, Summarize, Rewrite, Brainstorm, and Explain. Includes prompt character bounding, max-token controls, one-click copy, and generation history.

### 2. Why Technologies Were Used
- **Express Backend Proxy:** Ensures Gemini and OpenAI API keys stay strictly on the server and are never exposed to client browsers.
- **Google Gemini 1.5 Flash API:** High-speed, multimodal LLM providing state-of-the-art reasoning with high throughput.

### 3. How the Application Works
The user selects a generation mode and submits a prompt. The frontend sends `POST /api/generate` to Express, which attaches mode-specific system prompt guidelines, invokes Gemini/OpenAI via native `fetch`, and returns structured JSON output.

### 4. Important Concepts & APIs
- Server-side secret isolation, prompt engineering, system prompts, token budgets, temperature parameter, fallback resilience.

### 5. How AI Assisted
Antigravity authored the mode-specific system prompts, ensuring responses adhere to strict length limits and formatting rules.

### 6. How to Demonstrate in Viva
Open `/exp9`. Select the "Summarize" mode, enter sample text, and click "Generate Text". Demonstrate the synthesized bullet points, token slider adjustment, and copy button.

### 7. Five Common Viva Questions & Answers
1. **Q: Why should AI API keys never be stored in frontend code?**  
   *A:* Frontend JavaScript is executed in client browsers and easily inspected via browser DevTools. Anyone could extract the key and incur unauthorized billing charges.
2. **Q: What is the purpose of a System Prompt?**  
   *A:* A system prompt instructs the language model on its persona, output formatting constraints, tone, and behavioral boundaries before user input is processed.
3. **Q: What is a Token in Large Language Models?**  
   *A:* A token is a fundamental chunk of characters (roughly 4 characters or 0.75 words) that LLMs process and predict during generation.
4. **Q: What does the `temperature` parameter control?**  
   *A:* Temperature controls randomness: lower values (0.1–0.3) produce deterministic, factual outputs, while higher values (0.7–1.0) produce more creative responses.
5. **Q: How does a proxy architecture handle API key outages?**  
   *A:* The backend catches provider errors and can seamlessly redirect requests to a backup provider or local fallback without breaking the client UI.

---

## Experiment 10 — AI-Powered Chatbot for College Website

### 1. What the Experiment Does
A contextual conversational chatbot for JECRC University that answers student and parent questions regarding admissions, B.Tech courses, hostels, facilities, placements, and campus life, maintaining multi-turn conversational history.

### 2. Why Technologies Were Used
- **In-Memory Session Store (`Map`):** Associates conversation history with unique session IDs to allow natural follow-up questions.
- **Generative AI Chat API:** Provides natural, friendly, conversational dialogue adhering to university domain boundaries.

### 3. How the Application Works
When a user sends a message, Express retrieves the existing session history, appends the university helpdesk persona prompt, and dispatches the multi-turn array to the AI provider. The reply is stored in history and streamed to the client UI.

### 4. Important Concepts & APIs
- Multi-turn conversation context, session management, domain prompt boundaries, suggestion chips, conversation reset (`DELETE /api/chat/:sessionId`).

### 5. How AI Assisted
Antigravity constructed the college helpdesk persona rules and curated the offline FAQ fallback dictionary.

### 6. How to Demonstrate in Viva
Open `/exp10`. Click the suggested chip "How do I apply for B.Tech admission?". When the assistant replies, ask a context-dependent follow-up such as "What about placements for CSE?". Demonstrate that the assistant understands the context.

### 7. Five Common Viva Questions & Answers
1. **Q: How does a chatbot maintain conversation memory?**  
   *A:* By storing past messages in a session store and sending the conversation history array along with each new user prompt to the language model.
2. **Q: How do you prevent a college chatbot from hallucinating incorrect fees or dates?**  
   *A:* By enforcing explicit negative constraints in the system prompt: "If unsure about specific dates or fees, direct users to email admissions@jecrcu.edu.in. Never invent exact figures."
3. **Q: What is multi-turn conversation?**  
   *A:* A conversational flow where each response builds upon information, entities, and context established in earlier interaction turns.
4. **Q: How does the server clear conversation history?**  
   *A:* By sending a `DELETE /api/chat/:sessionId` request, which deletes the corresponding entry from the server's session `Map`.
5. **Q: What is the benefit of clickable suggestion chips?**  
   *A:* They guide first-time visitors toward supported domain queries and improve accessibility.

---

## Experiment 11 — AI-Based Multi-Format Content Generator

### 1. What the Experiment Does
Generates ready-to-publish content across five distinct formats: SEO Blog Posts, Professional Emails, Instagram Captions, Twitter/X Threads, and LinkedIn Articles, with customizable tone, length, and Markdown file export.

### 2. Why Technologies Were Used
- **Modular Prompt Synthesis:** Generates format-specific outputs (e.g. hashtags for Instagram, numbered threads for Twitter, subject lines for email).
- **Blob & Clipboard Browser APIs:** Enables immediate file downloading (`.md`) and clipboard copying without third-party libraries.

### 3. How the Application Works
The user selects a content format, tone, and length. The backend injects format rules (e.g., `#` and `##` headings for blogs; `1/`, `2/` for threads) into the AI generation prompt. The result is displayed with word/character counts and an export action.

### 4. Important Concepts & APIs
- Template-driven prompt generation, Blob download APIs, clipboard integration, tone modulation.

### 5. How AI Assisted
Antigravity generated the five specialized prompt format guides and dynamic word count calculation formulas.

### 6. How to Demonstrate in Viva
Open `/exp11`. Select "X / Twitter", pick tone "Witty", enter a topic, and click "Generate Content". Show the numbered thread output and click "Download .md" to verify file generation.

### 7. Five Common Viva Questions & Answers
1. **Q: How does prompt engineering differ between a blog post and a Twitter thread?**  
   *A:* A blog post requires SEO title hierarchy, multi-paragraph section depth, and markdown syntax, whereas a Twitter thread requires strict per-tweet character limits (≤ 280 chars), numbered hooks, and concise takeaways.
2. **Q: How does the browser Blob API download files dynamically?**  
   *A:* It creates an in-memory binary object (`Blob`) from text, generates a temporary object URL via `URL.createObjectURL`, and triggers a virtual link download click.
3. **Q: How does tone selection influence language model output?**  
   *A:* It alters vocabulary, sentence cadence, formality, and grammatical structure to match the desired persona (e.g., persuasive vs casual).
4. **Q: Why is Markdown the preferred format for content generation?**  
   *A:* Markdown is plain-text, human-readable, and universally supported across content management systems like GitHub, WordPress, and Notion.
5. **Q: What is the purpose of optional key points in content generation?**  
   *A:* They act as hard semantic anchors that the model must incorporate, ensuring key facts are not omitted.

---

## Experiment 12 — AI Image Generation and Captioning Studio

### 1. What the Experiment Does
Provides text-to-image generation supporting six artistic styles (photoreal, 3D render, watercolor, anime, cyberpunk neon, pixel art) and three aspect ratios (1:1, 2:3, 3:2) with seed reproducibility via Pollinations AI, plus AI vision image captioning.

### 2. Why Technologies Were Used
- **Pollinations Public AI Image API:** Fast, high-resolution, keyless image synthesis requiring zero authentication overhead.
- **Gemini Vision Engine:** Analyzes image pixel matrices and produces descriptive natural language captions.

### 3. How the Application Works
The user specifies a prompt, style, and seed. The server appends artistic lighting and camera modifiers and issues a request to Pollinations AI. The resulting high-resolution image is rendered in the preview canvas with download actions.

### 4. Important Concepts & APIs
- Diffusion models, seed reproducibility, prompt enhancement, aspect ratio mapping, vision model multimodal understanding.

### 5. How AI Assisted
Antigravity constructed the style prompt modifier dictionaries and automated the prompt enhancement workflow.

### 6. How to Demonstrate in Viva
Open `/exp12`. Enter a prompt (e.g. "A lighthouse in a storm"), click "Enhance Prompt" to demonstrate AI prompt expansion, select "3D Render", and click "Generate Image". Show the resulting image and explain seed reproducibility.

### 7. Five Common Viva Questions & Answers
1. **Q: What is the role of a "seed" in generative image AI?**  
   *A:* A seed initializes the pseudorandom noise generator. Using the exact same seed, prompt, and parameters reproduces the exact same image output.
2. **Q: How do diffusion models generate images from text?**  
   *A:* They begin with pure random Gaussian noise and iteratively subtract noise over multiple steps guided by text embeddings until a clear image emerges.
3. **Q: What is prompt enhancement?**  
   *A:* Using a language model to expand a brief user idea with detailed descriptors for lighting, camera lenses, atmosphere, and artistic style.
4. **Q: What is multimodal AI?**  
   *A:* An AI architecture capable of processing and synthesizing multiple data modalities simultaneously (such as text, images, audio, and video).
5. **Q: How does image captioning work?**  
   *A:* Vision-language models encode image pixel patches into vector embeddings that a decoder network translates into natural language descriptive text.

---

## Experiment 13 — Cloud Deployment, GitHub & Version Control

### 1. What the Experiment Does
Deploys the complete full-stack web application across cloud services: Next.js frontend on Vercel, Express REST gateway on Render, and MongoDB database on Atlas, managed through Git version control with a `v1.0.0` release tag.

### 2. Why Technologies Were Used
- **Git & GitHub:** Distributed version control, conventional commit tracking (`feat:`, `fix:`, `docs:`, `chore:`), and branch protection.
- **Vercel:** Optimized hosting platform for Next.js App Router with global edge CDN and automatic build pipelines.
- **Render:** Scalable cloud container hosting for long-running Node.js/Express web services.
- **MongoDB Atlas:** Fully managed, cloud-hosted MongoDB replica set with automatic backups and monitoring.

### 3. How the Application Works
Pushing code to the GitHub `main` branch triggers automated builds on Vercel and Render. Secrets (API keys, database strings) are stored as platform environment variables. CORS headers ensure secure communication between Vercel and Render.

### 4. Important Concepts & APIs
- CI/CD build pipelines, environment variable isolation, conventional commits, semantic versioning (`v1.0.0`), rollback protocols.

### 5. How AI Assisted
Antigravity structured the deployment checklist, formulated rollback drills, and audited the production `.gitignore` configuration.

### 6. How to Demonstrate in Viva
Open `/exp13`. Review the commit history table showcasing conventional commits and the `v1.0.0` release tag. Explain how the frontend on Vercel connects to the Express API on Render via `NEXT_PUBLIC_API_BASE`.

### 7. Five Common Viva Questions & Answers
1. **Q: Why split frontend on Vercel and backend on Render?**  
   *A:* Vercel is specifically engineered for static and server-rendered Next.js edge performance, whereas Render provides persistent Linux compute for long-running Express processes.
2. **Q: What is the purpose of `.gitignore`?**  
   *A:* It prevents sensitive files (`.env`), heavy build directories (`.next/`, `node_modules/`), and OS temporary files from being committed to public repositories.
3. **Q: What are conventional commits?**  
   *A:* A standardized commit message format (`feat:`, `fix:`, `chore:`, `docs:`) that provides structured change logs and enables automated semantic release versioning.
4. **Q: How does a deployment rollback work?**  
   *A:* In case of production bugs, the platform points the live domain back to the previously verified immutable deployment hash, restoring service in seconds with zero downtime.
5. **Q: Why should database connection strings be stored in platform environment variables?**  
   *A:* To prevent database passwords and cluster credentials from being exposed in source code repositories.

---

## Experiment 14 — Testing, Debugging, Performance and Security Analysis

### 1. What the Experiment Does
Performs systematic quality assurance across unit testing, API integration testing, Lighthouse Core Web Vitals profiling (98+ performance), and OWASP Top 10 security verification.

### 2. Why Technologies Were Used
- **Node.js Test Runner (`node:test`, `assert`):** Fast, built-in native test runner requiring zero external testing framework dependencies.
- **Lighthouse:** Industry-standard audit tool evaluating Performance, Accessibility, Best Practices, and SEO.
- **OWASP Top 10:** Benchmark security checklist protecting against injection, broken authentication, and secret exposure.

### 3. How the Application Works
The automated test suite runs 9 unit and API test assertions covering validation rules, health checks, CRUD operations, JWT token issuance, and 409 conflict handling, achieving 100% pass rates in under 1 second.

### 4. Important Concepts & APIs
- Unit testing, integration testing, Core Web Vitals (LCP, FID/INP, CLS), OWASP Top 10 security principles, regression testing.

### 5. How AI Assisted
Antigravity developed the automated test cases, diagnosed early route precedence bugs, and generated the before/after remediation matrix.

### 6. How to Demonstrate in Viva
Open `/exp14`. Click "Run Automated Tests" to execute the test suite in real time, displaying all passing green checkmarks. Highlight the 98+ Lighthouse score gauges and the OWASP Top 10 security remediation table.

### 7. Five Common Viva Questions & Answers
1. **Q: What is the difference between unit testing and integration testing?**  
   *A:* Unit testing evaluates isolated individual functions (like `validateEmail`) without external dependencies. Integration testing verifies how multiple components (like Express routes + database) interact together.
2. **Q: What are Core Web Vitals?**  
   *A:* Standardized Google performance metrics that measure real-world user experience: Largest Contentful Paint (loading speed), Interaction to Next Paint (responsiveness), and Cumulative Layout Shift (visual stability).
3. **Q: How does this application protect against NoSQL injection?**  
   *A:* By using schema-enforced Mongoose models, escaping user regex inputs, and whitelisting permitted sort and filter keys rather than passing raw user input directly to queries.
4. **Q: What is Regression Testing?**  
   *A:* Re-running previously written tests after code changes to ensure that newly added features or fixes have not broken existing functionality.
5. **Q: What is the benefit of the built-in `node:test` runner?**  
   *A:* It runs natively in Node.js without requiring third-party libraries (like Jest or Mocha), executes rapidly, and uses standard `assert` primitives.

---

## Experiment 15 — Complete AI-Enabled Full-Stack Capstone Application

### 1. What the Experiment Does
Unites all 14 previous practical experiments into one unified production application: "JECRC AI Studio" (Bluepeak AI) featuring a public marketing shell, JWT authentication, user dashboard, AI Text Studio, Content Generator, Helpdesk Chatbot, Image Studio, and Admin-only Student Management Records deployed at `https://lab-webdev-ai.vercel.app/`.

### 2. Why Technologies Were Used
- **Integrated Full-Stack Architecture:** Next.js App Router for frontend, Express.js for backend microservices, MongoDB Atlas for data persistence, and Gemini/OpenAI for AI capabilities.
- **Unified API Client:** Handles centralized authentication headers, CORS resolution, and error normalization.

### 3. How the Application Works
Users explore the public marketing shell or sign in with JWT authentication. Student users access the AI suite (Text, Content, Chat, Image). Admin users additionally access the protected Student Management System with live database statistics.

### 4. Important Concepts & APIs
- Full-stack system integration, role-based frontend/backend access guards, end-to-end demonstration workflow, unified design system.

### 5. How AI Assisted
Antigravity orchestrated the full architecture synthesis, resolved cross-component state sharing, and coordinated production deployment scripts.

### 6. How to Demonstrate in Viva
Open `/exp15`. Walk through the complete end-to-end viva flow:
1. Show the public overview and microservice health matrix.
2. Generate text in the embedded AI Text Studio.
3. Ask a question to the embedded College Helpdesk Chatbot.
4. Toggle to the Admin role and open the protected Student Management Records.
5. Review the live production URL at `https://lab-webdev-ai.vercel.app/`.

### 7. Five Common Viva Questions & Answers
1. **Q: How does Experiment 15 integrate the earlier practical modules?**  
   *A:* It reuses the validated forms from Exp 4, CRUD patterns from Exp 5, auth guards from Exp 6, product REST API from Exp 7, student database from Exp 8, AI studio from Exp 9, chatbot from Exp 10, content generator from Exp 11, image engine from Exp 12, and deployment pipelines from Exp 13.
2. **Q: How is role-based authorization enforced on both client and server?**  
   *A:* On the client, UI navigation items conditionally render based on user role (`admin` vs `user`). On the server, the `requireRole('admin')` middleware inspects the decoded JWT and rejects unauthorized requests with HTTP 403 Forbidden.
3. **Q: What is an API gateway?**  
   *A:* A single entry point that accepts incoming client requests, handles routing, rate limiting, and authentication, and delegates calls to appropriate backend microservices.
4. **Q: How does this project handle cold starts on cloud providers like Render?**  
   *A:* Health check probing (`/api/health`) keeps worker instances primed, and the frontend displays clear loading states while connections establish.
5. **Q: What are the primary software engineering takeaways from this lab record?**  
   *A:* Designing modular full-stack architectures, securing authentication with bcrypt and JWT, isolating API secrets on server proxies, creating accessible responsive UIs, and utilizing generative AI as a force multiplier for software development and automated testing.
