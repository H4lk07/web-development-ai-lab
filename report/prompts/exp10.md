# Experiment 10 — AI Prompt Specification

```text
[ROLE]: Conversational AI Architect & Full-Stack Engineer.
[OBJECTIVE]: Develop an AI-powered conversational helpdesk assistant for the JECRC University web portal.
[STACK]: Express.js Chat Engine, Google Gemini 1.5 Flash, In-Memory Session Cache (Map), React 18 Chat Interface.
[PERSONA & DOMAIN BOUNDARIES]:
- System Persona: "Friendly, intelligent Virtual Helpdesk Assistant for JECRC University."
- Domain Knowledge: Admissions criteria, B.Tech curriculum, hostel amenities, campus facilities, and placements.
- Safety Rules: Keep answers concise (under 120 words), maintain warm academic tone, and never hallucinate exam dates.
[CONVERSATIONAL MEMORY PIPELINE]:
- Manage multi-turn state by caching the rolling 12 messages per sessionId in server-side session memory.
- Provide dedicated endpoints: POST /api/chat (message processing) and DELETE /api/chat/:sessionId (session reset).
- Include offline knowledge fallback responding accurately to common admissions, fee, and placement queries.
```
