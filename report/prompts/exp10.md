# Experiment 10: AI-Powered Chatbot for a College Website

## Aim
Develop an AI-powered chatbot for a college or business website using Generative AI APIs.

## Technologies Used
Node.js, Express.js, native fetch, OpenAI / Gemini chat APIs, in-memory session store (Map), React 18, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Build an AI chatbot for the JECRC University website.

PERSONA / SYSTEM PROMPT
"You are the friendly, intelligent Virtual Helpdesk Assistant for JECRC University.
Help students and visitors with admissions, B.Tech CSE / ECE / ME courses, hostel facilities, placements, and contact details. Keep answers under 120 words, use plain language, be warm and professional. Never invent exact exam dates or fees."

API (mounted at /api/chat)
- POST /api/chat { message, sessionId?, provider? } -> { reply, sessionId, provider, demo }
- DELETE /api/chat/:sessionId -> 204, clears history
- GET /api/chat/config -> active provider, demo flag, and suggested questions

BEHAVIOUR & MEMORY
- Generate a unique sessionId when not provided.
- Store last 12 messages per session in memory so follow-up contextual questions work.
- Provide a robust FAQ fallback responding to admissions, placements, and hostel inquiries.

UI
- Chat bubbles, typing indicator, four clickable question chips, auto-scroll to bottom, reset conversation button, and active status indicator.
```

## Conclusion
A college helpdesk chatbot for JECRC University was built with multi-turn conversational memory. The bot answered admissions, curriculum, and placement inquiries accurately while preserving context across consecutive user queries.
