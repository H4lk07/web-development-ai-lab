# Experiment 4 — AI Prompt Specification

```text
[ROLE]: Enterprise Frontend Architect & Form Validation Specialist.
[OBJECTIVE]: Build a modular four-page agency website for "Bluepeak Studio" with centralized validation logic.
[STACK]: Next.js 14 App Router, TypeScript, Tailwind CSS, Shared Shell Layout, Pure Validation Utility.
[ROUTE TAXONOMY]:
- /exp4 (Home): Hero section, three engineering capability teaser cards, and consultation CTA.
- /exp4/services: Structured catalog of 6 technical offerings with tiered scope and pricing matrices.
- /exp4/contact: Corporate office metadata, FAQ accordion, and interactive multi-field inquiry form.
- Shared Shell: Sticky active-route navigation (/exp4/layout.tsx) with newsletter subscription footer.
[VALIDATION & A11Y]:
- Isolate validation in a pure module (validateContact, validateEmail, validatePhone) returning typed error maps.
- Link form inputs to error spans via aria-describedby and role="alert"; enforce RFC 5322 email regex.
- Implement mobile-first responsive grids and strict keyboard focus indicators with zero full-page reloads.
```
