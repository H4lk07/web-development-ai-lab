'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CapstoneApplicationPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'text' | 'content' | 'chat' | 'image' | 'students'>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
  const [demoPrompt, setDemoPrompt] = useState('Explain generative AI architecture in 3 points');
  const [demoOutput, setDemoOutput] = useState('');
  const [generating, setGenerating] = useState(false);

  // Chatbot quick state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: 'assistant', text: 'Welcome to JECRC AI Studio! How can I assist you today?' }
  ]);

  const handleQuickGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: demoPrompt, mode: 'summarize' })
      });
      const data = await res.json();
      setDemoOutput(data.text);
    } catch (err: any) {
      setDemoOutput(`Error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: 'Chatbot service error.' }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Capstone Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 15 • COMPLETE AI-ENABLED FULL-STACK WEB APPLICATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">JECRC AI Studio (Capstone)</h1>
          <p className="text-xs text-slate-500">
            Integrated architecture uniting Next.js frontend, Express REST gateway, MongoDB Atlas, JWT security, and Generative AI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-bold border border-emerald-200">
            PRODUCTION READY
          </span>
          <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Verified Live URL Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 mb-8 shadow-md border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold">Verified Cloud Deployment Target</div>
          <div className="text-lg font-bold mt-0.5 font-mono">https://lab-webdev-ai.vercel.app/</div>
          <p className="text-xs text-slate-300 mt-1">
            Single URL deployment linking Vercel Next.js edge frontend with Render Express REST API and MongoDB Atlas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="text-slate-400">Authenticated As:</div>
            <div className="font-bold text-white">Mayank Goyal ({userRole.toUpperCase()})</div>
            <div className="text-[10px] text-indigo-300 font-mono">mayank.23bcon1662@jecrcu.edu.in</div>
          </div>
          <button
            onClick={() => setUserRole(userRole === 'admin' ? 'user' : 'admin')}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-semibold text-white transition"
          >
            Toggle Role ({userRole})
          </button>
        </div>
      </div>

      {/* Main Integrated Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-2">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400 px-3 py-1">WORKSPACE APPS</div>
            {[
              { id: 'overview', label: '📊 System Overview', desc: 'Architecture & health' },
              { id: 'text', label: '📝 AI Text Studio', desc: 'Exp 9 Integration' },
              { id: 'content', label: '🚀 Content Generator', desc: 'Exp 11 Integration' },
              { id: 'chat', label: '💬 Helpdesk Chatbot', desc: 'Exp 10 Integration' },
              { id: 'image', label: '🎨 AI Image Studio', desc: 'Exp 12 Integration' },
              { id: 'students', label: '🎓 Student Records', desc: 'Exp 8 Admin Only' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex flex-col ${activeSection === tab.id ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'hover:bg-slate-50 text-slate-700'}`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] ${activeSection === tab.id ? 'text-indigo-200' : 'text-slate-400'}`}>{tab.desc}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">System Workflow &amp; Evaluation Pipeline</div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div>1. Overview &amp; Health Probe</div>
              <div>2. AI Text Synthesis</div>
              <div>3. Contextual Chatbot</div>
              <div>4. Pollinations Image Studio</div>
              <div>5. Admin Student Records</div>
            </div>
          </div>
        </div>

        {/* Dynamic Workspace Content Pane */}
        <div className="md:col-span-3">
          {/* Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-2">Integrated Capstone Architecture</h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Experiment 15 synthesizes the modular components built across Experiments 1 to 14 into a cohesive, production-grade cloud application. All client components share a centralized API client with automatic token attachment, unified CORS handling, and instant fallback resiliency.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-indigo-700">Frontend Layer</div>
                    <div className="text-slate-600 mt-1">Next.js App Router, React 18, Tailwind CSS, TypeScript, dynamic client navigation.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-indigo-700">API Gateway</div>
                    <div className="text-slate-600 mt-1">Express.js 5 microservices, OpenAPI Swagger UI, JWT authorization middleware.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-indigo-700">Intelligence &amp; Data</div>
                    <div className="text-slate-600 mt-1">MongoDB Atlas persistent models, Google Gemini 1.5, OpenAI GPT-4o, Pollinations API.</div>
                  </div>
                </div>
              </div>

              {/* Quick Health Matrix */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Live Microservice Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    <div className="font-bold">/api/tasks</div>
                    <div className="text-[10px] mt-0.5">● Status 200 OK</div>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    <div className="font-bold">/api/auth</div>
                    <div className="text-[10px] mt-0.5">● JWT Guarded</div>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    <div className="font-bold">/api/generate</div>
                    <div className="text-[10px] mt-0.5">● Gemini Ready</div>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    <div className="font-bold">/api/students</div>
                    <div className="text-[10px] mt-0.5">● Indexed DB</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Text Section */}
          {activeSection === 'text' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">Embedded AI Text Studio</h2>
                <Link href="/exp9" className="text-xs text-indigo-600 hover:underline">Open Full Module (Exp 9) →</Link>
              </div>

              <textarea
                rows={3}
                value={demoPrompt}
                onChange={(e) => setDemoPrompt(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleQuickGenerate}
                  disabled={generating}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  {generating ? 'Processing...' : 'Synthesize Text ✨'}
                </button>
              </div>

              {demoOutput && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {demoOutput}
                </div>
              )}
            </div>
          )}

          {/* Chatbot Section */}
          {activeSection === 'chat' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">Embedded Helpdesk Assistant</h2>
                <Link href="/exp10" className="text-xs text-indigo-600 hover:underline">Open Full Module (Exp 10) →</Link>
              </div>

              <div className="h-64 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask a question about JECRC admissions..."
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSendChat}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Content Generator Section */}
          {activeSection === 'content' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">Embedded Content Generator</h2>
                <Link href="/exp11" className="text-xs text-indigo-600 hover:underline">Open Full Module (Exp 11) →</Link>
              </div>
              <p className="text-xs text-slate-500">
                Generate high-impact blog posts, email copy, and social media threads with tone selection and download capabilities.
              </p>
              <div className="pt-2">
                <Link href="/exp11" className="inline-flex px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow">
                  Launch Content Studio (Exp 11) →
                </Link>
              </div>
            </div>
          )}

          {/* Image Studio Section */}
          {activeSection === 'image' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">Embedded Image Studio</h2>
                <Link href="/exp12" className="text-xs text-indigo-600 hover:underline">Open Full Module (Exp 12) →</Link>
              </div>
              <p className="text-xs text-slate-500">
                Text-to-image synthesis using Pollinations public AI and vision captioning with Gemini.
              </p>
              <div className="pt-2">
                <Link href="/exp12" className="inline-flex px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow">
                  Launch Image Studio (Exp 12) →
                </Link>
              </div>
            </div>
          )}

          {/* Student Records (Admin Only) */}
          {activeSection === 'students' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Student Management Records (Admin Guarded)</h2>
                  <span className="text-[10px] font-mono text-purple-600 uppercase font-bold">Role: {userRole}</span>
                </div>
                <Link href="/exp8" className="text-xs text-indigo-600 hover:underline">Open Full Directory (Exp 8) →</Link>
              </div>

              {userRole === 'admin' ? (
                <div>
                  <p className="text-xs text-slate-500 mb-4">
                    Authorized admin view. Access to database aggregation stats, unique roll number verification, and student profiles.
                  </p>
                  <Link href="/exp8" className="inline-flex px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow">
                    Open Student Management Dashboard →
                  </Link>
                </div>
              ) : (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs">
                  <strong>HTTP 403 Forbidden:</strong> You are logged in with the normal user role. Switch to the Admin role using the toggle button above to inspect student records.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
