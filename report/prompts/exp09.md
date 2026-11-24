# Experiment 9: AI-Powered Text Generation with OpenAI / Gemini

## Aim
Integrate the OpenAI/Gemini API into a web application for AI-powered text generation.

## Technologies Used
Node.js, Express.js, native fetch, Google Gemini 1.5 Flash API, OpenAI GPT-4o API, server-side proxy, React 18, Tailwind CSS, TypeScript

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Integrate OpenAI and Gemini text generation into a web application via an Express backend proxy.

SERVER ARCHITECTURE (Express.js, no client-side keys)
- Shared provider abstraction in server/lib/ai.js:
  * Gemini -> POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
  * OpenAI -> POST https://api.openai.com/v1/chat/completions
  * Demo -> deterministic structured output when keys are unconfigured
- Return { text, provider, model, demo, mode }.

ENDPOINT — POST /api/generate
- Body: { prompt, mode, provider, maxTokens }
- Supported modes with specialized system prompts:
  * freeform: concise, helpful assistant
  * summarize: 3-5 bullet points preserving key facts
  * rewrite: polished, professional, clear tone
  * brainstorm: 5 actionable ideas with one-line rationale
  * explain: simple analogy under 150 words
- Validate: prompt 4–4000 chars, mode whitelisted.

UI
- Mode tabs, prompt textarea, character counter, token slider, generate button with loading state, copy button, and session history.
```

## Conclusion
An AI Text Studio was integrated with Google Gemini and OpenAI through a secure Express backend proxy. All five generation modes (freeform, summarize, rewrite, brainstorm, explain) operated with isolated API credentials and instant fallback resiliency.
