const express = require('express');
const router = express.Router();
const { callAI, getActiveProvider } = require('../lib/ai');

// GET /api/generate/config
router.get('/config', (req, res) => {
  const provider = getActiveProvider();
  res.json({
    activeProvider: provider,
    demoMode: provider === 'demo',
    supportedModes: ['freeform', 'summarize', 'rewrite', 'brainstorm', 'explain']
  });
});

// POST /api/generate
router.post('/', async (req, res) => {
  const { prompt, mode = 'freeform', provider, maxTokens = 500 } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 4) {
    return res.status(400).json({
      error: 'Validation Error',
      details: { prompt: 'Prompt is required and must be at least 4 characters long' }
    });
  }

  if (prompt.length > 4000) {
    return res.status(400).json({
      error: 'Validation Error',
      details: { prompt: 'Prompt cannot exceed 4000 characters' }
    });
  }

  const validModes = ['freeform', 'summarize', 'rewrite', 'brainstorm', 'explain'];
  if (!validModes.includes(mode)) {
    return res.status(400).json({
      error: 'Validation Error',
      details: { mode: `Mode must be one of: ${validModes.join(', ')}` }
    });
  }

  // System prompt templates according to mode
  const systemPrompts = {
    freeform: 'You are a concise, helpful, and highly skilled software engineering assistant.',
    summarize: 'Summarize the given text into 3-5 high-impact bullet points preserving critical technical facts.',
    rewrite: 'Rewrite the text to be crystal-clear, professional, polished, and academically sound.',
    brainstorm: 'Generate 5 distinct, creative, actionable ideas with a one-line rationale for each.',
    explain: 'Explain the concept in a beginner-friendly manner with an analogy, keeping it under 150 words.'
  };

  try {
    const result = await callAI({
      prompt: prompt.trim(),
      mode,
      provider,
      maxTokens: Math.min(Math.max(parseInt(maxTokens) || 500, 50), 2000),
      systemPrompt: systemPrompts[mode]
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI Generation Failed', message: err.message });
  }
});

module.exports = router;
