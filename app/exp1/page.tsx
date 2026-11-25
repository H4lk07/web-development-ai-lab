'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white">
              MG
            </span>
            <span className="font-bold text-lg text-white">Mayank Goyal</span>
            <span className="text-xs text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800 hidden sm:inline">
              B.Tech CSE • JECRC
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <Link href="/" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition">
              ← Lab Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900 to-slate-900 -z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open for Tech Internships & Web AI Projects
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Mayank Goyal</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Full-stack web developer and 7th-semester Computer Science undergraduate at JECRC University, specializing in modern React, Express REST backends, and Generative AI workflows.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition text-sm"
            >
              View My Work ↓
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition text-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-4 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">About Me</span>
            <h2 className="text-3xl font-bold text-white mt-2">Engineering Modern Digital Experiences with AI</h2>
            <p className="text-slate-300 mt-4 leading-relaxed text-sm">
              I am an undergraduate developer passionate about the intersection of software engineering, generative AI, and responsive design. Currently completing my B.Tech degree in Computer Science at JECRC University, Jaipur (Roll No: 23BCON1662).
            </p>
            <p className="text-slate-300 mt-3 leading-relaxed text-sm">
              My hands-on experience covers architecting modular RESTful microservices, developing accessible frontend interfaces using Next.js and Tailwind CSS, and automating full-stack testing workflows.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <div className="text-slate-400">University</div>
                <div className="font-semibold text-white mt-0.5">JECRC University</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <div className="text-slate-400">Degree & Year</div>
                <div className="font-semibold text-white mt-0.5">B.Tech CSE (4th Year)</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/60 backdrop-blur space-y-4">
            <h3 className="font-bold text-white text-base">Key Academic Milestones</h3>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-indigo-500 pl-4 py-1">
                <div className="font-semibold text-white">Full-Stack Lab Portfolio (2026–27)</div>
                <div className="text-slate-400">Implemented 15 unified practical experiments covering Next.js, Express, and GenAI APIs.</div>
              </div>
              <div className="border-l-2 border-purple-500 pl-4 py-1">
                <div className="font-semibold text-white">Database Optimization & CRUD Architecture</div>
                <div className="text-slate-400">Engineered indexed MongoDB queries with aggregation pipelines for student analytics.</div>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="font-semibold text-white">AI-Assisted Development Integration</div>
                <div className="text-slate-400">Integrated Gemini 1.5 and prompt engineering pipelines into production REST services.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-4 border-b border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Technical Toolkit</span>
          <h2 className="text-3xl font-bold text-white mt-2">Technologies & Competencies</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { category: 'Frontend', items: ['HTML5 Semantic Elements', 'CSS3 & Flexbox/Grid', 'React 18/19', 'Next.js App Router', 'Tailwind CSS'] },
            { category: 'Backend', items: ['Node.js Runtime', 'Express.js Framework', 'RESTful Architecture', 'JWT Authentication', 'Bcrypt Security'] },
            { category: 'Databases', items: ['MongoDB & Mongoose', 'Database Indexing', 'Aggregation Pipelines', 'Schema Validation', 'PostgreSQL'] },
            { category: 'DevOps & AI', items: ['Antigravity AI', 'Google Gemini API', 'Git & GitHub Workflows', 'Postman & Swagger', 'Playwright Testing'] }
          ].map((cat, idx) => (
            <div key={idx} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/60">
              <h3 className="font-bold text-indigo-300 text-sm mb-3">{cat.category}</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Showcase</span>
            <h2 className="text-3xl font-bold text-white mt-2">Featured Projects</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm mt-2 sm:mt-0">
            Selected applications built as part of the Web Development Using AI curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'JECRC AI Studio',
              desc: 'Unified capstone platform integrating AI text generation, college helpdesk bot, image studio, and student records.',
              tags: ['Next.js', 'Express', 'Gemini API', 'MongoDB'],
              link: '/exp15'
            },
            {
              title: 'Student Analytics Engine',
              desc: 'Database-driven management system featuring unique roll validation, compound indexes, and GPA statistical aggregation.',
              tags: ['Node.js', 'Mongoose', 'REST API', 'Optimization'],
              link: '/exp8'
            },
            {
              title: 'Interactive DOM Workbench',
              desc: 'Vanilla JavaScript experimental dashboard demonstrating event delegation, requestAnimationFrame, and observer hooks.',
              tags: ['Vanilla JS', 'DOM APIs', 'CSS Themes', 'Observers'],
              link: '/exp3'
            }
          ].map((proj, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/60 flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Link href={proj.link} className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition">
                View Project Demo →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Contact</span>
            <h2 className="text-3xl font-bold text-white mt-2">Let&apos;s Connect</h2>
            <p className="text-slate-300 mt-4 text-sm leading-relaxed">
              Have questions regarding my college lab record or interested in collaborating on full-stack web and AI projects? Feel free to send a message.
            </p>

            <div className="mt-6 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 font-bold">✉</span>
                <div>
                  <div className="text-slate-400">Institutional Email</div>
                  <div className="font-semibold text-white">mayank.23bcon1662@jecrcu.edu.in</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 font-bold">📍</span>
                <div>
                  <div className="text-slate-400">Campus</div>
                  <div className="font-semibold text-white">JECRC University, Jaipur, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/60 backdrop-blur">
            {submitted ? (
              <div className="p-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-lg mb-3">✓</div>
                <h3 className="font-bold text-white text-base">Thank you for your message!</h3>
                <p className="text-xs text-slate-300 mt-1">Your response has been recorded. I will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-indigo-400 underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Mayank Goyal"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Type your message here..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm shadow-md transition"
                >
                  Submit Contact Form
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
