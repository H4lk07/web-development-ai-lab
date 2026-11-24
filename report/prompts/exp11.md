# Experiment 11: AI-Based Content Generation Application

## Aim
Create an AI-based content generation web application for blogs, emails, or social media posts.

## Technologies Used
Node.js, Express.js, native fetch, OpenAI / Gemini APIs, React 18, Tailwind CSS, TypeScript, browser Clipboard & Blob download APIs

## AI Tool Used
Antigravity

## AI-Assisted Implementation Prompt
```
Create an AI content generation app for blogs, emails, and social posts.

INPUTS
- type: blog | email | instagram | twitter | linkedin
- topic: 3–1000 characters
- tone: professional | casual | friendly | witty | persuasive
- length: short | medium | long
- keyPoints: optional bullet points

FORMAT INSTRUCTIONS
- blog: Markdown with title (#), introduction, 3-4 structured sections (##), and CTA.
- email: "Subject:" line, professional greeting, 2-3 body paragraphs, and sign-off.
- instagram: Hook first line, engaging narrative, 8-10 relevant hashtags.
- twitter: Numbered thread (1/, 2/, 3/...) with punchy tweets under 260 chars.
- linkedin: Professional hook, 3-4 bullet insights, key takeaway, 3-5 hashtags.

UI
- Format selection cards, topic input with chips, tone selector, length buttons, generate button, copy button, download as Markdown button, and history list.
```

## Conclusion
An AI-powered content generation studio supporting five distinct publishing formats and customizable tone/length controls was developed. The application generated structured markdown blogs, professional emails, and social media threads with export functionality.
