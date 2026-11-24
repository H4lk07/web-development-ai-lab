'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentGeneratorPage() {
  const [type, setType] = useState<'blog' | 'email' | 'instagram' | 'twitter' | 'linkedin'>('blog');
  const [topic, setTopic] = useState('Tips for first-time developers entering the tech industry in 2026');
  const [tone, setTone] = useState<'professional' | 'casual' | 'friendly' | 'witty' | 'persuasive'>('persuasive');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [keyPoints, setKeyPoints] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, topic, tone, length, keyPoints })
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.content);
        setHistory(prev => [{ type, topic, tone, content: data.content, time: new Date().toLocaleTimeString() }, ...prev]);
      } else {
        setOutput(`Error: ${data.error || 'Failed to generate content'}`);
      }
    } catch (err: any) {
      setOutput(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}_generated_content.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 11 • AI CONTENT GENERATION ENGINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Content Studio</h1>
          <p className="text-xs text-slate-500">
            Multi-format content generation with tailored prompts for blogs, emails, and social media.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        {/* Content Type Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { id: 'blog', label: 'Blog Post', icon: '📝', sub: 'Title + sections + CTA' },
            { id: 'email', label: 'Email', icon: '✉️', sub: 'Subject + body' },
            { id: 'instagram', label: 'Instagram', icon: '📸', sub: 'Caption + hashtags' },
            { id: 'twitter', label: 'X / Twitter', icon: '🧵', sub: 'Numbered thread' },
            { id: 'linkedin', label: 'LinkedIn', icon: '💼', sub: 'Hook + insights' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id as any)}
              className={`p-3 rounded-xl border text-left transition ${type === item.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="font-bold text-xs text-slate-900">{item.label}</div>
              <div className="text-[10px] text-slate-500">{item.sub}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">TOPIC / TITLE *</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Tips for first-time developers"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setTopic('The rise of remote learning in 2026')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              Remote learning 2026
            </button>
            <button
              type="button"
              onClick={() => setTopic('Announcing our new campus tech initiative')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              Campus tech announcement
            </button>
            <button
              type="button"
              onClick={() => setTopic('5 lessons learned from building full-stack web apps with AI')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              Full-stack AI lessons
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">KEY POINTS (optional, one per line)</label>
            <textarea
              rows={2}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="Must-mention points, one per line..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">TONE</label>
              <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                {['professional', 'casual', 'friendly', 'witty', 'persuasive'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t as any)}
                    className={`px-2 py-1 rounded text-[11px] capitalize font-medium transition ${tone === t ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">LENGTH</label>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                {['short', 'medium', 'long'].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLength(l as any)}
                    className={`flex-1 py-1 rounded text-[11px] capitalize font-medium transition ${length === l ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              {loading ? 'Synthesizing Content...' : 'Generate Content 🚀'}
            </button>
          </div>
        </form>

        {/* Output Panel */}
        {output && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                GENERATED {type.toUpperCase()} CONTENT ({output.length} characters)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-xs border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                >
                  Download .md
                </button>
              </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
