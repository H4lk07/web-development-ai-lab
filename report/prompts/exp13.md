# Experiment 13: Deployment with GitHub, Vercel/Render and Version Control

## Aim
Deploy a full-stack AI-enabled web application using GitHub, Vercel/Render/Netlify, and implement version control.

## Technologies Used
Git v1.0.0, GitHub, Vercel (Next.js Edge hosting), Render (Express REST gateway), MongoDB Atlas, environment variable security

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Act as a DevOps engineer. Produce a complete deployment and version-control plan for this Next.js + Express + MongoDB project.

VERSION CONTROL
- Initialise Git with a production-grade .gitignore covering node_modules, .next, .env, and OS files.
- Use conventional commits (feat/fix/docs/chore).
- Tag the final submitted release v1.0.0 and document commit history.

DEPLOYMENT ARCHITECTURE
- Frontend: Vercel preset for Next.js App Router (https://lab-webdev-ai.vercel.app/).
- Backend: Render Web Service for Express API gateway (https://webdev-ai-backend.onrender.com).
- Database: MongoDB Atlas M0 replica set with secure connection string.
- Environment variables: isolate all secrets in platform dashboards.

DELIVERABLES
- Production deployment verification checklist.
- Rollback and disaster recovery procedure.
- Health monitoring endpoints (/api/health) returning uptime and status.
```

## Conclusion
The full-stack application was deployed across Vercel for the Next.js frontend, Render for the Express REST gateway, and MongoDB Atlas for database persistence. Version control with Git conventional commits and the v1.0.0 release tag established an auditable release pipeline.
