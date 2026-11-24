# Web Development Using AI — College Practical Lab (2026–27)

> **Course Code:** BCO682A  
> **Student Name:** Mayank Goyal  
> **Roll / Enrollment Number:** 23BCON1662  
> **Course & Branch:** Bachelor of Technology (B.Tech) — Computer Science & Engineering (Section P)  
> **Semester:** 7th Semester  
> **Institution:** JECRC University, Jaipur, Rajasthan  
> **Submitted To:** Mr. Mohit Parashar  
> **Academic Session:** 2026–27  
> **AI Development Assistant:** Antigravity  

---

## 🌟 Project Overview
This repository contains the complete full-stack academic practical laboratory project for **Web Development Using AI** (Course Code: BCO682A). 

Rather than a disjointed collection of separate scripts, all **15 practical experiments** are implemented as a unified, modular, production-grade cloud application featuring:
- **Frontend Architecture:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and Bootstrap 5.3.
- **Backend Architecture:** Node.js, Express.js 5 RESTful API Gateway, and Swagger/OpenAPI 3.0 documentation.
- **Database & Data Layer:** MongoDB & Mongoose 8 with indexing, aggregation pipelines, and resilient in-memory local fallbacks.
- **Authentication & Security:** Bcrypt password hashing (cost factor 10), JSON Web Tokens (JWT), role-based authorization (`user` vs `admin`), and OWASP Top 10 hardening.
- **Artificial Intelligence Integration:** Google Gemini 1.5 Flash, OpenAI GPT-4o, Pollinations AI image generation, vision captioning, server-side secret isolation, and offline neural mock fallbacks.
- **DevOps, Testing & Quality Assurance:** Native Node.js test runner (`node:test`), Playwright automation, Lighthouse Core Web Vitals (98+ performance), Git v1.0.0, and Vercel/Render cloud deployment.

---

## 📋 All 15 Practical Experiments

| Exp | Title | Route | Core Technologies & Viva Concepts |
| :---: | :--- | :---: | :--- |
| **1** | **Responsive Personal Portfolio Website** | `/exp1` | HTML5 semantic tags, Tailwind CSS, responsive breakpoints, accessible contact form. |
| **2** | **Responsive Startup Landing Page** | `/exp2` | Bootstrap 5.3, 12-column grid, mock telemetry hero, pricing tiers, testimonial carousel. |
| **3** | **Interactive JavaScript & DOM Manipulation** | `/exp3` | Vanilla DOM APIs, `setInterval` digital clock, `requestAnimationFrame`, event delegation, modal dialog. |
| **4** | **Multi-Page Website with Validation** | `/exp4` | App Router nested routing (`/about`, `/services`, `/contact`), pure validation library, active links. |
| **5** | **CRUD Web Application with MongoDB** | `/exp5` | Express.js REST API, Mongoose Task model, HTTP verbs (GET, POST, PUT, PATCH, DELETE), status codes. |
| **6** | **User Authentication & Authorization** | `/exp6` | Bcrypt password hashing, JWT Bearer tokens, protected routes, role guards (`admin` vs `user`). |
| **7** | **RESTful APIs Tested with Postman** | `/exp7` | Product Catalog API, OpenAPI 3.0, Swagger UI (`/api-docs`), automated 10-test Postman collection. |
| **8** | **Database-Driven Student Management** | `/exp8` | Unique roll number indexing, compound indexes, MongoDB aggregation pipeline for GPA statistics. |
| **9** | **AI-Powered Text Generation Studio** | `/exp9` | Google Gemini 1.5 Flash, OpenAI proxy, 5 prompt modes (summarize, rewrite, brainstorm, explain). |
| **10** | **AI-Powered College Helpdesk Chatbot** | `/exp10` | JECRC University helpdesk persona, in-memory session context, suggestion chips, conversation reset. |
| **11** | **AI Content Generation Application** | `/exp11` | 5 publishing formats (Blog, Email, Instagram, Twitter, LinkedIn), tone controls, Markdown export. |
| **12** | **AI Image Generation & Captioning** | `/exp12` | Pollinations public AI image API, 6 artistic styles, seed reproducibility, Gemini vision captioning. |
| **13** | **Cloud Deployment & Version Control** | `/exp13` | Git conventional commits, `v1.0.0` release tag, Vercel frontend, Render backend, Atlas cluster. |
| **14** | **Testing, Debugging, Performance & Security** | `/exp14` | Automated `node:test` runner (100% passing), Lighthouse 98+ score, OWASP Top 10 security audit. |
| **15** | **Complete Full-Stack Capstone Application** | `/exp15` | Unified "JECRC AI Studio" (Bluepeak AI) combining all prior modules under a single production URL. |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js:** v18.0.0 or newer (v24 recommended)
- **npm:** v9.0.0 or newer
- **Python:** v3.10+ (for DOCX/PDF report generation scripts)
- **Git**

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/MayankGoyal/web-development-ai-lab.git
cd web-development-ai-lab
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Note: If no API keys or MongoDB URIs are configured, the system automatically runs in zero-dependency local in-memory fallback mode so all 15 experiments work out-of-the-box!)*

### 4. Run Development Servers
Start the Express REST API Gateway (Port 5000):
```bash
npm run server
```
In a separate terminal, start the Next.js Frontend (Port 3000):
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to access the Practical Dashboard!

---

## 🧪 Automated Testing
Run the automated unit and API test suite:
```bash
npm test
```
*Executes all pure validation unit tests, server health probes, task CRUD happy paths, auth JWT verification, and student database uniqueness constraints with 100% pass rates.*

---

## 📄 Final Academic Report Generation
The project includes automated scripts to generate the official 32-page academic lab record:
- **Editable DOCX:** `report/final/WEB_DEVELOPMENT_AI_LAB_RECORD.docx`
- **Print-Ready PDF:** `report/final/WEB_DEVELOPMENT_AI_LAB_RECORD.pdf`

To regenerate the report from source experiment data and screenshots:
```bash
python report/generate_report.py
python qa_inspection.py
```

---

## 📚 Viva Preparation Guide
A dedicated viva preparation guide is located in:
👉 **`docs/VIVA_PREPARATION.md`**  
*(Contains detailed technical explanations, important APIs, demonstration workflows, and 5 likely viva questions with answers for every single experiment!)*
