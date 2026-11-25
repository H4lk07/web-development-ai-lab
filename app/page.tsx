'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Experiment {
  num: number;
  frame: string;
  title: string;
  aim: string;
  category: 'frontend' | 'backend' | 'ai' | 'devops' | 'capstone';
  categoryLabel: string;
  tech: string;
  route: string;
  concept: string;
  dim: string;
}

const experiments: Experiment[] = [
  {
    num: 1,
    frame: 'FRAME 01 / 15',
    title: 'Responsive Personal Portfolio Website',
    aim: 'Write a program to create a responsive personal portfolio website using HTML5, CSS3, and Generative AI tools for code generation.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tech: 'HTML5, CSS3, Tailwind CSS, Semantic Elements',
    route: '/exp1',
    concept: 'Mobile-first breakpoints, semantic tags, contact form validation',
    dim: '1440 × 900',
  },
  {
    num: 2,
    frame: 'FRAME 02 / 15',
    title: 'Responsive Startup Landing Page with Bootstrap',
    aim: 'Develop a responsive landing page for a startup/business using Bootstrap and AI-assisted UI design tools.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tech: 'Bootstrap 5.3, 12-Column Flexbox Grid, Cards, Carousel',
    route: '/exp2',
    concept: 'Container breakpoints, responsive utility classes, hero showcase',
    dim: '1440 × 900',
  },
  {
    num: 3,
    frame: 'FRAME 03 / 15',
    title: 'Interactive Web Page with JavaScript & DOM Manipulation',
    aim: 'Design and implement an interactive web page using JavaScript, DOM manipulation, and AI-generated scripts.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tech: 'Vanilla JS, DOM APIs, IntersectionObserver, RAF Animation',
    route: '/exp3',
    concept: 'Event listeners, dynamic class mutations, interval timers',
    dim: '1440 × 900',
  },
  {
    num: 4,
    frame: 'FRAME 04 / 15',
    title: 'Multi-Page Website with Navigation, Forms & Validation',
    aim: 'Create a multi-page website with navigation menu, forms, validation, and responsive layouts using AI-assisted development tools.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tech: 'Next.js App Router, Client Form Validation, ARIA Standards',
    route: '/exp4',
    concept: 'Client-side sub-routes, accessible inputs, interactive state',
    dim: '1440 × 900',
  },
  {
    num: 5,
    frame: 'FRAME 05 / 15',
    title: 'CRUD Web Application with Node.js, Express & MongoDB',
    aim: 'Develop a CRUD-based web application using Node.js, Express.js, and MongoDB with AI-assisted code generation.',
    category: 'backend',
    categoryLabel: 'Backend & DB',
    tech: 'Node.js, Express.js 5, MongoDB, Mongoose ODM',
    route: '/exp5',
    concept: 'RESTful verbs (POST, GET, PUT, DELETE), schema modeling, HTTP status codes',
    dim: 'REST API :5000',
  },
  {
    num: 6,
    frame: 'FRAME 06 / 15',
    title: 'User Authentication & Authorization (Login/Registration)',
    aim: 'Implement user authentication and authorization (Login/Registration) using Express.js, MongoDB, and AI coding assistants.',
    category: 'backend',
    categoryLabel: 'Backend & DB',
    tech: 'JWT (JSON Web Tokens), bcryptjs, Role-Based Access Control',
    route: '/exp6',
    concept: 'Salted password hashing, stateless Bearer tokens, protected routes',
    dim: 'SECURE AUTH',
  },
  {
    num: 7,
    frame: 'FRAME 07 / 15',
    title: 'RESTful APIs Tested with Postman & Swagger',
    aim: 'Develop RESTful APIs for a web application and test them using Postman with AI-generated API documentation.',
    category: 'backend',
    categoryLabel: 'Backend & DB',
    tech: 'Swagger UI, OpenAPI 3.0 Specification, Postman Collections',
    route: '/exp7',
    concept: 'Interactive API sandbox, JSON request contracts, validation assertions',
    dim: 'OPENAPI 3.0',
  },
  {
    num: 8,
    frame: 'FRAME 08 / 15',
    title: 'Database-Driven Student Management System',
    aim: 'Create a database-driven Student Management System using MongoDB and Express.js with AI-assisted debugging and optimization.',
    category: 'backend',
    categoryLabel: 'Backend & DB',
    tech: 'MongoDB Indexes, Aggregation Pipelines, Query Optimization',
    route: '/exp8',
    concept: 'Compound B-tree indexes, lean projections, aggregation stages',
    dim: 'MONGO INDEX',
  },
  {
    num: 9,
    frame: 'FRAME 09 / 15',
    title: 'AI-Powered Text Generation Studio',
    aim: 'Integrate the OpenAI/Gemini API into a web application for AI-powered text generation.',
    category: 'ai',
    categoryLabel: 'Generative AI',
    tech: 'Google Gemini 1.5, OpenAI GPT-4o, Express API Proxy',
    route: '/exp9',
    concept: 'Server-side provider abstraction, system prompt engineering, temperature tuning',
    dim: 'LLM RUNTIME',
  },
  {
    num: 10,
    frame: 'FRAME 10 / 15',
    title: 'AI-Powered Chatbot for College Website',
    aim: 'Develop an AI-powered chatbot for a college or business website using Generative AI APIs.',
    category: 'ai',
    categoryLabel: 'Generative AI',
    tech: 'Multi-Turn Conversational Memory, Admissions Knowledge Base',
    route: '/exp10',
    concept: 'Session store history, university persona constraints, fallback heuristics',
    dim: 'CONTEXT MEMORY',
  },
  {
    num: 11,
    frame: 'FRAME 11 / 15',
    title: 'AI-Based Multi-Format Content Generator',
    aim: 'Create an AI-based content generation web application for blogs, emails, or social media posts.',
    category: 'ai',
    categoryLabel: 'Generative AI',
    tech: 'Prompt Engineering, Tone Modulation, Structured Output',
    route: '/exp11',
    concept: 'Target audience parameters, format templates, clipboard & export handlers',
    dim: 'MULTI-MODAL',
  },
  {
    num: 12,
    frame: 'FRAME 12 / 15',
    title: 'AI Image Generation & Captioning Studio',
    aim: 'Develop an AI-enabled image generation or image captioning web application using publicly available AI APIs.',
    category: 'ai',
    categoryLabel: 'Generative AI',
    tech: 'Pollinations AI API, Gemini Vision API, Seed Reproducibility',
    route: '/exp12',
    concept: 'Text-to-image synthesis, prompt enhancements, multimodal vision analysis',
    dim: 'DIFFUSION SEED',
  },
  {
    num: 13,
    frame: 'FRAME 13 / 15',
    title: 'Deployment with GitHub, Vercel/Render & Version Control',
    aim: 'Deploy a full-stack AI-enabled web application using GitHub, Vercel/Render/Netlify, and implement version control.',
    category: 'devops',
    categoryLabel: 'DevOps & QA',
    tech: 'Git v1.0.0, Vercel Edge CDN, Render Web Service, Atlas',
    route: '/exp13',
    concept: 'Conventional commits, branch protection, CI/CD automated edge builds, release tags',
    dim: 'CI / CD EDGE',
  },
  {
    num: 14,
    frame: 'FRAME 14 / 15',
    title: 'Testing, Debugging, Performance & Security Analysis',
    aim: 'Perform testing, debugging, performance optimization, and security analysis of an AI-assisted web application using Generative AI tools.',
    category: 'devops',
    categoryLabel: 'DevOps & QA',
    tech: 'Node.js test runner (node:test), Lighthouse, OWASP Audit',
    route: '/exp14',
    concept: 'Unit test assertions, Core Web Vitals (LCP, CLS, INP), OWASP Top 10 hardening',
    dim: 'TEST RUNNER',
  },
  {
    num: 15,
    frame: 'FRAME 15 / 15',
    title: 'Complete AI-Enabled Full-Stack Capstone Application',
    aim: 'Develop and deploy a complete AI-enabled Full Stack Web Application integrating responsive frontend, backend, database, authentication, Generative AI API, and cloud deployment.',
    category: 'capstone',
    categoryLabel: 'Capstone',
    tech: 'Next.js App Router, Express REST, JWT RBAC, Gemini 1.5, MongoDB Atlas',
    route: '/exp15',
    concept: 'End-to-end full stack architecture, integrated creative studio, role-based records',
    dim: 'UNIFIED CAPSTONE',
  },
];

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%

  const categories = [
    { id: 'all', label: 'All 15', count: 15 },
    { id: 'frontend', label: '01–04 Frontend', count: 4 },
    { id: 'backend', label: '05–08 Backend & DB', count: 4 },
    { id: 'ai', label: '09–12 Generative AI', count: 4 },
    { id: 'devops', label: '13–14 DevOps & QA', count: 2 },
    { id: 'capstone', label: '15 Capstone', count: 1 },
  ];

  const filteredExperiments = useMemo(() => {
    return experiments.filter((exp) => {
      const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        exp.num.toString() === q ||
        exp.title.toLowerCase().includes(q) ||
        exp.aim.toLowerCase().includes(q) ||
        exp.tech.toLowerCase().includes(q) ||
        exp.concept.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Engineering Breadcrumbs & Technology Tags */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="blueprint-tag">[ HTML5 ]</span>
          <span className="blueprint-tag">[ Bootstrap 5 ]</span>
          <span className="blueprint-tag">[ Next.js 14 ]</span>
          <span className="blueprint-tag">[ Express 5 ]</span>
          <span className="blueprint-tag">[ MongoDB Atlas ]</span>
          <span className="blueprint-tag">[ Gemini 1.5 ]</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span>JECRC UNIVERSITY</span>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">BCO682A</span>
          <span>/</span>
          <span>LAB RECORD 2026–27</span>
        </div>
      </div>

      {/* Main Architectural Studio Hero Section */}
      <div className="mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-2 tracking-wide font-medium">
              [: Practical Lab Portfolio :]
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
              From code to{' '}
              <span className="blueprint-select-box">
                production.
                <span className="blueprint-dim-pill">512 × 96</span>
              </span>
            </h1>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            A design-engineered full-stack laboratory record for Web Development Using AI (Course: BCO682A). 15 production experiments synthesized across responsive interfaces, Node.js REST services, indexed persistence, and Generative AI.
          </p>
        </div>

        {/* Interactive Before/After Prototype Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Draggable/Interactive Prototype Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#d8d6ce] shadow-sm overflow-hidden">
            {/* Window title bar */}
            <div className="px-4 py-2.5 bg-[#f0eee6] border-b border-[#e2e0d7] flex items-center justify-between text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e87062]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f4be4f]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#62c554]"></span>
                <span className="ml-2 font-semibold text-zinc-800 text-[11px]">
                  Experiment 15 • AI Creative & Full-Stack Platform, desktop 1440
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400">Interactive Prototype • Mouse / Slider</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              </div>
            </div>

            {/* Split Screen Container */}
            <div className="relative h-[340px] sm:h-[380px] bg-[#faf9f6] select-none overflow-hidden">
              {/* Shipped / Production Design Layer (Full width underneath) */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                      AI
                    </div>
                    <span className="font-bold text-xs text-zinc-900">
                      AI Creative Studio • Gemini 1.5 & Express REST
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ● Online
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                      Shipped, week 9
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 my-auto">
                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 font-mono text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-zinc-900 text-[11px]">Exp 09/11: Gemini 1.5 LLM Engine</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">API ACTIVE</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 line-clamp-2 font-sans mb-3">
                      &quot;Synthesize full-stack REST microservice with JWT RBAC authorization and MongoDB B-tree indexes...&quot;
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px]">384 tokens</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">42ms latency</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px]">temp: 0.7</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 font-mono text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-zinc-900 text-[11px]">Exp 05/08: MongoDB & REST API</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">INDEXED</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 line-clamp-2 font-sans mb-3">
                      Compound B-tree indexing on student rollNo with lean aggregation pipeline and CORS middleware.
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px]">JWT: Verified</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold">18ms IXSCAN</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px]">Express 5</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between font-mono">
                  <span>✓ Active Pipeline: Bearer JWT authorized. End-to-end full stack architecture operational on Node.js & Next.js.</span>
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">PRODUCTION</span>
                </div>
              </div>

              {/* Wireframe / Prototype Layer (Clipped to slider percentage) */}
              <div
                className="absolute inset-y-0 left-0 bg-[#ebe9e1] border-r border-blue-600 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="w-[740px] p-6 sm:p-8 h-full flex flex-col justify-between font-mono">
                  <div className="flex items-center justify-between border-b border-zinc-300 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-zinc-400"></div>
                      <div className="w-48 h-3.5 bg-zinc-300 rounded"></div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-zinc-400 text-zinc-600 bg-white/70">
                      Wireframe, week 2
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-auto">
                    <div className="p-4 rounded-xl border border-zinc-300 bg-white/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-28 h-3 bg-zinc-300 rounded"></div>
                        <div className="w-12 h-3 bg-zinc-200 rounded"></div>
                      </div>
                      <div className="space-y-1 py-1">
                        <div className="w-full h-2.5 bg-zinc-200 rounded"></div>
                        <div className="w-4/5 h-2.5 bg-zinc-200 rounded"></div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <div className="w-14 h-5 bg-zinc-200 rounded"></div>
                        <div className="w-14 h-5 bg-zinc-300 rounded"></div>
                        <div className="w-14 h-5 bg-zinc-200 rounded"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-300 bg-white/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-28 h-3 bg-zinc-300 rounded"></div>
                        <div className="w-12 h-3 bg-zinc-200 rounded"></div>
                      </div>
                      <div className="space-y-1 py-1">
                        <div className="w-full h-2.5 bg-zinc-200 rounded"></div>
                        <div className="w-4/5 h-2.5 bg-zinc-200 rounded"></div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <div className="w-14 h-5 bg-zinc-200 rounded"></div>
                        <div className="w-14 h-5 bg-zinc-300 rounded"></div>
                        <div className="w-14 h-5 bg-zinc-200 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-200/60 rounded-lg border border-zinc-300 flex items-center justify-between">
                    <div className="w-64 h-3 bg-zinc-300 rounded"></div>
                    <div className="w-16 h-3 bg-zinc-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Slider Handle Pill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono shadow-md border-2 border-white">
                  ◀▶
                </div>
              </div>
            </div>

            {/* Slider control bar */}
            <div className="p-3 bg-[#f7f6f2] border-t border-[#e2e0d7] flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
                <span>Wireframe (W2)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-36 sm:w-48 h-1.5 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span>Shipped (W9)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSliderPos(0)}
                  className="px-2 py-0.5 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition"
                >
                  Shipped 100%
                </button>
                <button
                  onClick={() => setSliderPos(50)}
                  className="px-2 py-0.5 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition"
                >
                  50 / 50 Split
                </button>
                <button
                  onClick={() => setSliderPos(100)}
                  className="px-2 py-0.5 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition"
                >
                  Wireframe 100%
                </button>
              </div>
            </div>
          </div>

          {/* Academic Specification & AI Visual Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#d8d6ce] p-5 shadow-sm flex flex-col justify-between">
            <div>
              {/* AI Generated Hero Artwork matching the reference image layout */}
              <div className="relative rounded-xl overflow-hidden border border-[#d8d6ce] bg-zinc-950 mb-4 h-40 group shadow-2xs">
                <img
                  src="/images/ai-hero-visual.png"
                  alt="Web Development Using AI - Neural Architecture Artwork"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent flex items-end p-2.5">
                  <div className="text-white font-mono text-[10px] flex items-center justify-between w-full">
                    <span className="tracking-wider">WEB DEV USING AI</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[9px]">
                      AI GENERATED
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                  [ SPECIFICATION & EVALUATION ]
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  VERIFIED
                </span>
              </div>

              <div className="mb-3">
                <div className="text-3xl font-extrabold tracking-tight text-zinc-950 font-mono">
                  15 <span className="text-xs font-sans font-normal text-zinc-500">of 15</span>
                </div>
                <div className="text-xs text-zinc-600 font-medium mt-0.5">
                  Experiments implemented, tested & documented for college evaluation.
                </div>
              </div>

              <div className="space-y-1.5 py-2.5 border-t border-b border-zinc-100 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Candidate:</span>
                  <span className="font-bold text-zinc-900 font-sans">Mayank Goyal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Roll / Enroll:</span>
                  <span className="font-bold text-blue-600">23BCON1662</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Email:</span>
                  <span className="text-[10px] text-zinc-700 truncate max-w-[170px]" title="mayank.23bcon1662@jecrcu.edu.in">
                    mayank.23bcon1662@jecrcu.edu.in
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Section & Sem:</span>
                  <span className="text-zinc-800">Sec P • 7th Semester</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Course / Code:</span>
                  <span className="text-zinc-800">Web AI • BCO682A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Evaluator:</span>
                  <span className="font-sans font-semibold text-zinc-900">Mr. Mohit Parashar</span>
                </div>
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <Link
                href="/exp15"
                className="w-full py-2.5 px-4 bg-zinc-950 hover:bg-blue-600 text-white rounded-xl text-xs font-mono font-medium text-center transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>⚡</span> Launch Capstone Project (Exp 15)
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="http://localhost:5000/api-docs"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-3 border border-zinc-300 hover:border-zinc-400 bg-zinc-50 hover:bg-white text-zinc-800 rounded-xl text-[11px] font-mono text-center transition"
                >
                  Swagger Docs
                </a>
                <Link
                  href="/exp14"
                  className="py-1.5 px-3 border border-zinc-300 hover:border-zinc-400 bg-zinc-50 hover:bg-white text-zinc-800 rounded-xl text-[11px] font-mono text-center transition"
                >
                  QA & Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Strip with Segmented Progress Dash Bars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl border border-[#d8d6ce] p-5 shadow-2xs">
          <div className="blueprint-segmented-bar">
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">15</div>
          <div className="text-xs font-mono text-zinc-500 mt-1">Practicals Shipped</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl border border-[#d8d6ce] p-5 shadow-2xs">
          <div className="blueprint-segmented-bar">
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">100%</div>
          <div className="text-xs font-mono text-zinc-500 mt-1">Test Pass Rate (9/9)</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl border border-[#d8d6ce] p-5 shadow-2xs">
          <div className="blueprint-segmented-bar">
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
            <span className="blueprint-segmented-seg bg-blue-600"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">4</div>
          <div className="text-xs font-mono text-zinc-500 mt-1">Architecture Tiers</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl border border-[#d8d6ce] p-5 shadow-2xs">
          <div className="blueprint-segmented-bar">
            <span className="blueprint-segmented-seg border border-dashed border-zinc-300"></span>
            <span className="blueprint-segmented-seg border border-dashed border-zinc-300"></span>
            <span className="blueprint-segmented-seg border border-dashed border-zinc-300"></span>
            <span className="blueprint-segmented-seg border border-dashed border-zinc-300"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">0</div>
          <div className="text-xs font-mono text-zinc-500 mt-1">Build Errors & Warnings</div>
        </div>
      </div>

      {/* Selected Work / Frames Grid Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-1 font-semibold">
              Home / Selected work
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Selected work.
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              15 production experiments, each measured and verified for academic evaluation.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-950 text-white shadow-2xs font-bold'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiments, technologies, or concepts..."
              className="w-full bg-white border border-[#d8d6ce] rounded-xl px-4 py-2 pl-9 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-600 transition"
            />
            <span className="absolute left-3 top-2.5 text-xs text-zinc-400">⌕</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-zinc-400 hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Experiment Cards Grid */}
        {filteredExperiments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d8d6ce] p-12 text-center my-6">
            <div className="text-2xl mb-2 font-mono">⌕</div>
            <h3 className="font-bold text-zinc-900 text-sm">No practical experiments match your query</h3>
            <p className="text-xs text-zinc-500 mt-1 font-mono">Try searching for &quot;MongoDB&quot;, &quot;Gemini&quot;, or &quot;Bootstrap&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-mono font-semibold hover:bg-blue-100 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiments.map((exp) => {
              return (
                <div
                  key={exp.num}
                  className="bg-white rounded-2xl border border-[#d8d6ce] hover:border-blue-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5">
                    {/* Frame header */}
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-100">
                      <span className="font-mono text-[10px] text-blue-600 font-bold tracking-wider">
                        {exp.frame}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                        {exp.dim}
                      </span>
                    </div>

                    <h3 className="font-bold text-zinc-950 text-sm group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-2 line-clamp-3 leading-relaxed">
                      {exp.aim}
                    </p>
                  </div>

                  <div className="p-5 pt-0 flex flex-col gap-3">
                    <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200/80 text-[11px] font-mono space-y-1">
                      <div className="text-zinc-600">
                        <span className="font-bold text-zinc-800">Tech:</span> {exp.tech}
                      </div>
                      <div className="text-zinc-600">
                        <span className="font-bold text-blue-600">Focus:</span> {exp.concept}
                      </div>
                    </div>

                    <Link
                      href={exp.route}
                      className="w-full py-2 px-3 bg-zinc-950 hover:bg-blue-600 text-white rounded-xl text-xs font-mono font-medium text-center transition flex items-center justify-center gap-1.5"
                    >
                      <span>Open Practical</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
