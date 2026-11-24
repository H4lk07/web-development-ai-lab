// Unified AI Provider Abstraction (Gemini + OpenAI + Keyless Demo Fallback)

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function getActiveProvider() {
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') return 'gemini';
  if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here') return 'openai';
  return 'demo';
}

// Deterministic high-quality responses for demo/offline viva testing
function generateDemoResponse(prompt, mode = 'freeform') {
  const p = prompt.toLowerCase();
  
  if (mode === 'summarize') {
    return `• Core Objective: The analyzed input focuses on modern full-stack web application development and AI tooling.\n• Key Methodologies: Utilizes React, Next.js, Express REST services, and database persistence with indexed search.\n• Implementation Outcome: High performance, zero runtime errors, and automated verification across components.`;
  }
  
  if (mode === 'rewrite') {
    return `Modern AI-assisted web engineering harmonizes robust client-side architecture with high-throughput backend APIs. By leveraging declarative frameworks, automated validation pipelines, and persistent database layers, developers can deploy production-grade cloud applications with rigorous quality assurance.`;
  }

  if (mode === 'brainstorm') {
    return `1. AI-Powered Smart Code Auditor: Real-time static analysis and automated vulnerability detection.\n2. Context-Aware Student Helpdesk: RAG-based query resolution for university admissions and syllabi.\n3. Dynamic UI Layout Synthesizer: Generative CSS and accessible design token production.\n4. Automated REST Documentation Engine: Auto-generates OpenAPI specs from schema definitions.\n5. Intelligent Performance Profiler: Analyzes Lighthouse metrics and suggests debouncing optimizations.`;
  }

  if (mode === 'explain') {
    return `Think of a REST API like a restaurant waiter. You (the client) sit at the table and read the menu (API endpoints). When you order food (send a request like GET or POST), the waiter carries your request to the kitchen (the server and database). The kitchen prepares the dish, and the waiter brings it back to your table as a structured plate (JSON response). This cleanly separates the dining area from the kitchen operations.`;
  }

  // Freeform or default
  return `Antigravity AI Assistant: Successfully processed your request regarding "${prompt.slice(0, 50)}...". The solution leverages modular full-stack web principles with secure Express routing, structured JSON validation, and responsive interface design.`;
}

async function callAI({ prompt, mode = 'freeform', provider: requestedProvider, maxTokens = 500, systemPrompt = '' }) {
  const activeProvider = requestedProvider || getActiveProvider();

  // 1. Google Gemini API
  if (activeProvider === 'gemini' && GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${prompt}` : prompt;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Gemini API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return { text, provider: 'gemini', model: 'gemini-1.5-flash', demo: false, mode };
      }
    } catch (err) {
      console.warn('[AI] Gemini call failed, falling back to demo mode:', err.message);
    }
  }

  // 2. OpenAI API
  if (activeProvider === 'openai' && OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here') {
    try {
      const messages = [];
      if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
      messages.push({ role: 'user', content: prompt });

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: maxTokens
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `OpenAI API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content;
      if (text) {
        return { text, provider: 'openai', model: 'gpt-4o-mini', demo: false, mode };
      }
    } catch (err) {
      console.warn('[AI] OpenAI call failed, falling back to demo mode:', err.message);
    }
  }

  // Fallback demo mode
  return {
    text: generateDemoResponse(prompt, mode),
    provider: 'demo',
    model: 'antigravity-neural-mock',
    demo: true,
    mode
  };
}

module.exports = {
  callAI,
  getActiveProvider,
  generateDemoResponse
};
