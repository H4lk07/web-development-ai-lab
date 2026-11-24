const express = require('express');
const router = express.Router();
const { callAI, getActiveProvider } = require('../lib/ai');

// In-memory conversation session history
const sessionStore = new Map();

const COLLEGE_HELP_PROMPT = `You are the friendly, intelligent Virtual Helpdesk Assistant for JECRC University.
Your role is to help students, parents, and visitors with admissions, B.Tech CSE / ECE / ME courses, hostel facilities, library, sports complex, campus placements, and contact details.
Rules:
- Keep responses concise, warm, professional, and under 120 words.
- Use plain language.
- Mention that the department of Computer Science and Engineering is equipped with state-of-the-art AI and Cloud labs.
- If unsure about specific dates, direct them to contact admissions@jecrcu.edu.in or visit the admissions office.`;

// Pre-packaged realistic FAQ responses for offline/demo mode
const FAQ_KNOWLEDGE = [
  {
    triggers: ['admission', 'apply', 'eligibility', 'process'],
    reply: 'Admissions for B.Tech programs (including CSE, ECE, ME, and CE) are open for 2026–27! Eligible candidates must have completed 10+2 with Physics, Mathematics, and Chemistry with minimum 60% aggregate. You can apply online via the university portal or visit the campus admissions office.'
  },
  {
    triggers: ['course', 'branch', 'b.tech', 'cse', 'curriculum', 'subjects'],
    reply: 'JECRC University offers industry-aligned B.Tech programs in CSE, AI & Machine Learning, Data Science, Cyber Security, ECE, ME, and CE. The curriculum integrates hands-on practical lab courses such as Web Development Using AI, Cloud Computing, and Full-Stack Engineering.'
  },
  {
    triggers: ['hostel', 'accommodation', 'room', 'mess', 'stay'],
    reply: 'The university provides fully furnished on-campus hostels for boys and girls with 24/7 security, high-speed Wi-Fi, hygienic cafeteria, sports amenities, and air-conditioned room options.'
  },
  {
    triggers: ['placement', 'package', 'company', 'recruiter', 'job'],
    reply: 'JECRC University maintains an exceptional placement track record with top recruiters including Amazon, Microsoft, TCS, Infosys, Capgemini, and Cognizant visiting annually. The dedicated Training and Placement Cell prepares students through technical bootcamps and mock interviews.'
  },
  {
    triggers: ['contact', 'email', 'phone', 'location', 'address'],
    reply: 'You can reach JECRC University at Plot No. IS-2036 to 2039, Ramchandrapura Industrial Area, Vidhani, Jaipur, Rajasthan. Email: info@jecrcu.edu.in / admissions@jecrcu.edu.in. Phone: +91 141-2770232.'
  }
];

function getDemoChatResponse(message) {
  const m = message.toLowerCase();
  for (const item of FAQ_KNOWLEDGE) {
    if (item.triggers.some(t => m.includes(t))) {
      return item.reply;
    }
  }
  return `Thank you for reaching out to the JECRC University Helpdesk! Regarding "${message.slice(0, 40)}...", our academic counsellors are available to assist you. Please feel free to email admissions@jecrcu.edu.in or visit our campus front desk.`;
}

// GET /api/chat/config
router.get('/config', (req, res) => {
  const provider = getActiveProvider();
  res.json({
    activeProvider: provider,
    demoMode: provider === 'demo',
    suggestedQuestions: [
      'What are the eligibility criteria for B.Tech CSE?',
      'Tell me about campus placements and top recruiters.',
      'What hostel and mess facilities are available?',
      'How do I contact the admissions department?'
    ]
  });
});

// POST /api/chat
router.post('/', async (req, res) => {
  let { message, sessionId, provider } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  // Retrieve or init history
  let history = sessionStore.get(sessionId) || [];

  // Build context
  const conversationContext = history
    .slice(-10)
    .map(h => `${h.role === 'user' ? 'Student' : 'Assistant'}: ${h.content}`)
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\nStudent: ${message.trim()}\nAssistant:`
    : `Student: ${message.trim()}\nAssistant:`;

  const activeProvider = provider || getActiveProvider();
  let replyText = '';
  let isDemo = false;

  if (activeProvider === 'demo') {
    replyText = getDemoChatResponse(message);
    isDemo = true;
  } else {
    try {
      const aiRes = await callAI({
        prompt: fullPrompt,
        mode: 'freeform',
        provider: activeProvider,
        maxTokens: 300,
        systemPrompt: COLLEGE_HELP_PROMPT
      });
      replyText = aiRes.text;
      isDemo = aiRes.demo;
    } catch (err) {
      replyText = getDemoChatResponse(message);
      isDemo = true;
    }
  }

  // Update session history
  history.push({ role: 'user', content: message.trim(), timestamp: new Date().toISOString() });
  history.push({ role: 'assistant', content: replyText, timestamp: new Date().toISOString() });
  if (history.length > 20) history = history.slice(-20);
  sessionStore.set(sessionId, history);

  res.json({
    reply: replyText,
    sessionId,
    provider: isDemo ? 'demo' : activeProvider,
    demo: isDemo
  });
});

// DELETE /api/chat/:sessionId
router.delete('/:sessionId', (req, res) => {
  sessionStore.delete(req.params.sessionId);
  res.status(204).end();
});

module.exports = router;
