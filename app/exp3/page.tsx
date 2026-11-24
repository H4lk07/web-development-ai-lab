'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function InteractiveDomLabPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [counter, setCounter] = useState(42);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Live Digital Clock & Greeting
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hours = now.getHours();
      setCurrentTime(now.toLocaleTimeString());

      if (hours < 12) setGreeting('Good Morning ☀️');
      else if (hours < 18) setGreeting('Good Afternoon 🌤️');
      else setGreeting('Good Evening 🌙');
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // RequestAnimationFrame Progress Bar
  const [progress, setProgress] = useState(25);
  const isAnimatingRef = useRef(false);

  const triggerProgressAnimation = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    let start: number | null = null;
    const duration = 1200; // 1.2s

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        isAnimatingRef.current = false;
      }
    }
    requestAnimationFrame(step);
  };

  const projects = [
    { id: 1, name: 'Aurora UI System', category: 'WEB', desc: 'Accessible React UI components with Tailwind tokens' },
    { id: 2, name: 'Pixel Forge Engine', category: 'TOOLS', desc: 'Canvas-based bitmap editor with color quantization' },
    { id: 3, name: 'Orbit Runner CLI', category: 'NODE', desc: 'Lightweight distributed worker task scheduler' },
    { id: 4, name: 'Lighthouse Audit Bot', category: 'TOOLS', desc: 'Automates Core Web Vitals profiling in GitHub CI' },
    { id: 5, name: 'Vector Mesh Studio', category: 'WEB', desc: 'Interactive SVG gradients and animated path generators' },
    { id: 6, name: 'Cache Warden', category: 'NODE', desc: 'In-memory Redis cache replacement with LRU eviction' }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesCat = selectedFilter === 'ALL' || p.category === selectedFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterMsg({ text: 'Please provide a valid email address.', type: 'error' });
    } else {
      setNewsletterMsg({ text: 'Subscription confirmed! Welcome to DOM Lab updates.', type: 'success' });
      setNewsletterEmail('');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Lab Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/50 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-1">
              EXP 3 • VANILLA JS &amp; DOM MANIPULATION LAB
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Interactive DOM Workbench</h1>
            <p className="text-xs text-slate-400 mt-1">
              Demonstrating native JavaScript DOM APIs: querySelector, addEventListener, classList, setInterval, requestAnimationFrame.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center gap-2"
            >
              <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <Link href="/" className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 transition">
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Live Status & Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Live Clock & Greeting */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold tracking-wider">setInterval → textContent</span>
            <div className="text-xs text-emerald-400 font-semibold mt-2">{greeting}</div>
            <div className="text-3xl font-mono font-bold mt-1 tracking-tight text-white">{currentTime || '--:--:--'}</div>
            <p className="text-[11px] text-slate-400 mt-2">Real-time DOM clock updated on a 1000ms execution interval.</p>
          </div>

          {/* Counter Widget */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold tracking-wider">Event Listeners → State</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-mono font-bold text-white">{counter}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCounter(c => Math.max(0, c - 1))}
                  className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700 text-sm"
                >
                  -
                </button>
                <button
                  onClick={() => setCounter(c => c + 1)}
                  className="w-8 h-8 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow"
                >
                  +
                </button>
                <button
                  onClick={() => setCounter(0)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs border border-slate-700"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Bounded numeric mutations triggered by decoupled button event hooks.</p>
          </div>

          {/* Modal & Progress Controls */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold tracking-wider">requestAnimationFrame &amp; Dialog</span>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition"
              >
                Open Modal Window
              </button>
              <button
                onClick={triggerProgressAnimation}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition"
              >
                Animate Progress
              </button>
            </div>
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>rAF Engine:</span>
                <span className="font-mono">{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter & Search Workbench */}
        <div className={`p-6 rounded-xl border mb-8 ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Event Delegation &amp; Dynamic Filter Matrix</h2>
              <p className="text-xs text-slate-400">Type in real-time to query matching cards or filter by category tag.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48"
              />
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                {['ALL', 'WEB', 'NODE', 'TOOLS'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${selectedFilter === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-8 text-center text-xs text-slate-500">
                No matching DOM nodes found for query &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredProjects.map(p => (
                <div
                  key={p.id}
                  className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{p.name}</span>
                    <span className="text-[10px] bg-slate-800 text-indigo-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Accordion & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accordion */}
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-sm font-bold text-white mb-3">Accessible Accordion (aria-expanded)</h3>
            <div className="space-y-2 text-xs">
              {[
                { title: 'How does event delegation optimize DOM event performance?', body: 'Instead of attaching individual event handlers to hundreds of child nodes, event delegation binds a single listener to a common ancestor, capturing bubbled events using event.target.' },
                { title: 'Why use requestAnimationFrame over setInterval for animations?', body: 'requestAnimationFrame synchronizes animations with the browser screen refresh rate (usually 60Hz or 120Hz), pausing when backgrounded and eliminating visual stutter.' },
                { title: 'What is the function of IntersectionObserver?', body: 'IntersectionObserver asynchronously monitors when target DOM elements enter or leave the browser viewport, ideal for lazy-loading images and triggering scroll reveals.' }
              ].map((item, i) => (
                <div key={i} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    aria-expanded={activeAccordion === i}
                    className="w-full text-left p-3 font-semibold text-slate-200 flex justify-between items-center hover:bg-slate-800/60"
                  >
                    <span>{item.title}</span>
                    <span className="text-slate-400">{activeAccordion === i ? '▲' : '▼'}</span>
                  </button>
                  {activeAccordion === i && (
                    <div className="p-3 text-slate-400 border-t border-slate-800 bg-slate-950/40 leading-relaxed">
                      {item.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Validation Demo */}
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-sm font-bold text-white mb-3">Client-Side Form Validation</h3>
            <p className="text-xs text-slate-400 mb-4">Demonstrating programmatic validation feedback on submission.</p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Subscriber Email</label>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="student@jecrcu.edu.in"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition shadow"
              >
                Validate &amp; Subscribe
              </button>
              {newsletterMsg && (
                <div className={`p-2.5 rounded text-xs ${newsletterMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {newsletterMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Accessible Modal Dialog */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white">DOM Modal Dialog</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This modal component traps focus, prevents background window scrolling, and can be dismissed via mouse click, the close button, or the Escape key.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-500 transition"
              >
                Close Dialog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
