'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AiTextStudioPage() {
  const [prompt, setPrompt] = useState('Brainstorm names for a student club about ocean cleanup');
  const [mode, setMode] = useState<'freeform' | 'summarize' | 'rewrite' | 'brainstorm' | 'explain'>('freeform');
  const [provider, setProvider] = useState<'gemini' | 'openai' | 'demo'>('gemini');
  const [maxTokens, setMaxTokens] = useState<number>(400);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, provider, maxTokens })
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.text);
        setMeta({ provider: data.provider, model: data.model, demo: data.demo });
        setHistory(prev => [{ prompt, mode, output: data.text, timestamp: new Date().toLocaleTimeString() }, ...prev]);
      } else {
        setOutput(`Error: ${data.details?.prompt || data.error || 'Failed to generate text'}`);
      }
    } catch (err: any) {
      setOutput(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 9 • GENERATIVE AI TEXT STUDIO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">AI Text Studio</h1>
          <p className="text-xs text-slate-500">
            OpenAI &amp; Gemini integration via a server-side Express proxy — keys never reach the browser.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      {/* Provider Status */}
      <div className="p-3 rounded-lg text-xs mb-6 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Live server-side AI integration ready (Gemini 1.5 Flash + Fallback)</span>
        </div>
        <span className="font-mono text-[10px]">Express Proxy: POST /api/generate</span>
      </div>

      {/* Main Studio Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
          {[
            { id: 'freeform', label: '✨ Freeform', desc: 'General instructions' },
            { id: 'summarize', label: '📝 Summarize', desc: 'Concise bullet synthesis' },
            { id: 'rewrite', label: '🖋️ Rewrite', desc: 'Polish & enhance tone' },
            { id: 'brainstorm', label: '💡 Brainstorm', desc: 'Creative idea matrix' },
            { id: 'explain', label: '🎓 Explain', desc: 'Simple analogies' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${mode === m.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
              <span>PROMPT INPUT</span>
              <span className="font-mono text-slate-400 text-[10px]">{prompt.length} / 4000</span>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your instructions or text here..."
              className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setPrompt('Summarize the water cycle for a 10-year-old in 3 bullets.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              Water cycle summary
            </button>
            <button
              type="button"
              onClick={() => setPrompt('Brainstorm names for a student club about ocean cleanup')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              Ocean club names
            </button>
            <button
              type="button"
              onClick={() => setPrompt('Explain RESTful APIs using a restaurant analogy in under 120 words.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 transition"
            >
              REST analogy
            </button>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">TARGET PROVIDER</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="gemini">Google Gemini 1.5 Flash</option>
                <option value="openai">OpenAI GPT-4o Mini</option>
                <option value="demo">Deterministic Neural Fallback (No Key Required)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>MAX LENGTH</span>
                <span className="font-mono text-indigo-600">{maxTokens} TOKENS</span>
              </div>
              <input
                type="range"
                min={50}
                max={1500}
                step={50}
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              {loading ? 'Synthesizing Output...' : 'Generate Text ✨'}
            </button>
          </div>
        </form>

        {/* Output Area */}
        {output && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">GENERATION RESULT</span>
                {meta && (
                  <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                    {meta.provider.toUpperCase()} • {meta.model}
                  </span>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-xs border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition"
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {output}
            </div>
          </div>
        )}
      </div>

      {/* Session History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-4">In-Session Generation History</h3>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-indigo-600 uppercase font-mono">{h.mode}</span>
                  <span>{h.timestamp}</span>
                </div>
                <div className="font-medium text-slate-700 truncate">{h.prompt}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
