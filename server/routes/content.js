const express = require('express');
const router = express.Router();
const { callAI, getActiveProvider } = require('../lib/ai');

// POST /api/content/generate
router.post('/generate', async (req, res) => {
  const { type, topic, tone = 'professional', length = 'medium', keyPoints = '' } = req.body;

  if (!type || !topic) {
    return res.status(400).json({ error: 'Content type and topic are required' });
  }

  const validTypes = ['blog', 'email', 'instagram', 'twitter', 'linkedin'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Invalid type. Choose from: ${validTypes.join(', ')}` });
  }

  const formatGuidelines = {
    blog: 'Format with Markdown title (#), an engaging introduction, 3-4 structured body sections with (##), bullet points, and a concluding call to action.',
    email: 'Format with a catchy "Subject: ...", professional greeting, 2-3 concise paragraphs, key takeaways, and a warm sign-off.',
    instagram: 'Format with a scroll-stopping one-line hook, engaging storytelling caption with line breaks, call-to-action question, and 8-10 relevant hashtags.',
    twitter: 'Format as a numbered thread (1/, 2/, 3/, ...). Each tweet must be punchy and under 260 characters with strong takeaways.',
    linkedin: 'Format with a strong corporate hook line, 3-4 bullet insights, career lessons learned, and 3-5 industry hashtags.'
  };

  const wordCounts = {
    short: 'around 150 words',
    medium: 'around 300 words',
    long: 'around 500 words'
  };

  const systemPrompt = `You are a professional content creator. Tone: ${tone}. Length: ${wordCounts[length] || 'medium'}.
${formatGuidelines[type]}
Ensure output is clean, formatted, and ready for immediate publishing.`;

  const userPrompt = `Topic: ${topic}
${keyPoints ? `Key Points to include: ${keyPoints}` : ''}
Please generate the complete content.`;

  try {
    const aiRes = await callAI({
      prompt: userPrompt,
      mode: 'freeform',
      maxTokens: length === 'long' ? 1000 : (length === 'medium' ? 600 : 350),
      systemPrompt
    });

    res.json({
      type,
      topic,
      tone,
      length,
      content: aiRes.text,
      provider: aiRes.provider,
      demo: aiRes.demo
    });
  } catch (err) {
    res.status(500).json({ error: 'Content generation failed', message: err.message });
  }
});

module.exports = router;
