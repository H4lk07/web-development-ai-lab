# Experiment 9 — AI Prompt Specification

```text
[ROLE]: AI Systems Integrator & LLM Prompt Engineer.
[OBJECTIVE]: Build an AI-Powered Text Generation Studio integrating Gemini and OpenAI APIs through a secure proxy.
[STACK]: Node.js Express REST Proxy, Google Gemini 1.5 Flash API, OpenAI GPT-4o API, React 18, Tailwind CSS.
[BACKEND PROXY - POST /api/generate]:
- Isolate all secret API keys strictly on the server; client never touches third-party AI provider credentials.
- Multi-provider abstraction in server/lib/ai.js supporting Google Gemini generateContent and OpenAI chat.completions.
- Provide keyless deterministic neural fallback to ensure zero downtime when developer keys are unconfigured.
[TASK MODES & CONSTRAINTS]:
- Enforce prompt boundaries (4 to 4,000 characters) and token limits (50 to 2,000 maxTokens) via backend validation.
- Implement specialized system prompts for 5 generation modes: Freeform, Summarize, Rewrite, Brainstorm, and Explain.
- Client UI includes real-time token sliders, model selectors, copy-to-clipboard buttons, and session generation history.
```
