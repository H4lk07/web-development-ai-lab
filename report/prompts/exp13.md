# Experiment 13 — AI Prompt Specification

```text
[ROLE]: Lead DevOps Engineer & Cloud Infrastructure Architect.
[OBJECTIVE]: Design and execute an automated cloud deployment and version-control pipeline for the full-stack lab.
[STACK]: Git v1.0.0, GitHub, Vercel Edge CDN, Render Web Service, MongoDB Atlas, TLS / HTTPS Encryption.
[VERSION CONTROL SPECIFICATION]:
- Repository initialization with production .gitignore excluding node_modules, .next, .env, and build artifacts.
- Enforce conventional commits (feat:, fix:, docs:, chore:) across all 15 practical development milestones.
- Tag final audited submission release with semantic Git tag v1.0.0 and push upstream to GitHub remote.
[MULTI-CLOUD TOPOLOGY]:
- Frontend: Deployed on Vercel Edge CDN for global static asset distribution and edge SSR performance.
- Backend: Express API gateway deployed as an autoscaling Web Service on Render with active health checks (/api/health).
- Database: Managed MongoDB Atlas M0 replica set with strict network whitelisting and isolated environment secrets.
```
