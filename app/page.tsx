'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

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

  // Pointer drag handler for interactive before/after split canvas
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (sliderContainerRef.current) {
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPos(Math.round((x / rect.width) * 100));
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      if (sliderContainerRef.current) {
        const rect = sliderContainerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPos(Math.round((x / rect.width) * 100));
      }
    },
    [isDragging]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
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

      {/* Main Studio Signature Hero Section */}
      <div className="mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-2 tracking-wide font-medium">
              [+ The signature hero]
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950 leading-[1.08]">
              From prompt to{' '}
              <span className="blueprint-select-box font-extrabold text-zinc-950">
                <span className="blueprint-handle blueprint-handle-tl" />
                <span className="blueprint-handle blueprint-handle-tr" />
                <span className="blueprint-handle blueprint-handle-bl" />
                <span className="blueprint-handle blueprint-handle-br" />
                shipped.
                <span className="blueprint-dim-pill">512 × 96</span>
              </span>
            </h1>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              The same laboratory platform as a grey wireframe and as the shipped production design. Drag the line, swipe it, or use the arrow keys.
            </p>
          </div>
        </div>

        {/* Interactive Before/After Prototype Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Draggable Split-Screen Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#d8d6ce] shadow-sm overflow-hidden">
            {/* Window title bar */}
            <div className="px-4 py-2.5 bg-[#f0eee6] border-b border-[#e2e0d7] flex items-center justify-between text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e87062]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f4be4f]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#62c554]"></span>
                <span className="ml-2 font-semibold text-zinc-800 text-[11px]">
                  WebDev AI Studio • Full-Stack Platform, desktop 1440
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-600 font-medium bg-white/80 px-2 py-0.5 rounded border border-zinc-200">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></span>
                  Mouse, touch and arrow keys
                </span>
              </div>
            </div>

            {/* Split Screen Container (Interactive pointer events) */}
            <div
              ref={sliderContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-valuenow={sliderPos}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Before and after prototype comparison slider"
              className="relative h-[360px] sm:h-[400px] bg-white select-none overflow-hidden cursor-ew-resize focus:outline-none"
            >
              {/* Shipped / Production Design Layer (Full width underneath) */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-white">
                {/* Internal App Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs">
                      AI
                    </div>
                    <div>
                      <div className="font-bold text-xs text-zinc-900 leading-tight">
                        WebDev AI Studio Platform
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        Gemini 1.5 & Express REST Gateway
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-600 bg-zinc-100 font-medium">
                      Step 2 of 4
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ● Online
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                      Shipped, week 9
                    </span>
                  </div>
                </div>

                {/* Subtitle inside mockup */}
                <div className="text-[11px] font-mono text-zinc-500 font-medium">
                  Select Core Engineering Module • Course: BCO682A
                </div>

                {/* 2 Core Component Cards (1:1 aligned with wireframe) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Card 1: AI Engine */}
                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/70 font-mono text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                          AI
                        </span>
                        <div>
                          <div className="font-bold text-zinc-950 text-[11px]">Generative AI Studio</div>
                          <div className="text-[9px] text-zinc-500">Google Gemini 1.5 LLM</div>
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-200/60">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px] text-zinc-700">384 tokens</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">42ms latency</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px] text-zinc-700">temp: 0.7</span>
                    </div>
                  </div>

                  {/* Card 2: MongoDB REST */}
                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/70 font-mono text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                          DB
                        </span>
                        <div>
                          <div className="font-bold text-zinc-950 text-[11px]">MongoDB & REST API</div>
                          <div className="text-[9px] text-zinc-500">Express 5 • B-Tree Index</div>
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        INDEXED
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-200/60">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px] text-zinc-700">JWT: Bearer</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold">18ms IXSCAN</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 text-[9px] text-zinc-700">Express 5</span>
                    </div>
                  </div>
                </div>

                {/* 8 Action/Endpoint Buttons Grid (aligned with Wireframe) */}
                <div className="grid grid-cols-4 gap-2 font-mono text-[10px]">
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    GET /tasks
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    POST /auth
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-[#065f46] text-white text-center font-bold shadow-xs">
                    GET /students
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    POST /generate
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    GET /health
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    POST /chat
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    GET /metrics
                  </div>
                  <div className="py-1.5 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 text-center font-medium">
                    POST /audit
                  </div>
                </div>

                {/* Bottom Status Banner */}
                <div className="p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between font-mono">
                  <span>✓ Active Pipeline: Bearer JWT authorized • MongoDB B-tree indexed • 15 microservices passing.</span>
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                    PRODUCTION
                  </span>
                </div>
              </div>

              {/* Wireframe / Prototype Layer (Clipped precisely to slider percentage) */}
              <div
                className="absolute inset-y-0 left-0 bg-[#ebe9e1] border-r-2 border-blue-600 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Exactly identical width & padding as Shipped layer to guarantee 1:1 wipe alignment */}
                <div className="w-[740px] p-6 sm:p-8 h-full flex flex-col justify-between font-mono">
                  {/* Internal App Header (Wireframe) */}
                  <div className="flex items-center justify-between border-b border-zinc-300 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-zinc-400"></div>
                      <div className="space-y-1">
                        <div className="w-40 h-3 bg-zinc-300 rounded"></div>
                        <div className="w-28 h-2 bg-zinc-300/70 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-4 bg-zinc-200 rounded"></div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-zinc-400 text-zinc-600 bg-white/70">
                        Wireframe, week 2
                      </span>
                    </div>
                  </div>

                  {/* Subtitle wireframe bar */}
                  <div className="w-56 h-2.5 bg-zinc-300 rounded"></div>

                  {/* 2 Core Component Cards (Wireframe skeleton matching Shipped grid) */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Card 1 Skeleton */}
                    <div className="p-4 rounded-xl border border-zinc-300 bg-white/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-zinc-400"></div>
                          <div className="space-y-1">
                            <div className="w-24 h-3 bg-zinc-400 rounded"></div>
                            <div className="w-16 h-2 bg-zinc-300 rounded"></div>
                          </div>
                        </div>
                        <div className="w-12 h-4 bg-zinc-300 rounded"></div>
                      </div>
                      <div className="flex gap-1.5 pt-2 border-t border-zinc-300/60">
                        <div className="w-14 h-4 bg-zinc-300 rounded"></div>
                        <div className="w-14 h-4 bg-zinc-400 rounded"></div>
                        <div className="w-14 h-4 bg-zinc-300 rounded"></div>
                      </div>
                    </div>

                    {/* Card 2 Skeleton */}
                    <div className="p-4 rounded-xl border border-zinc-300 bg-white/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-zinc-400"></div>
                          <div className="space-y-1">
                            <div className="w-24 h-3 bg-zinc-400 rounded"></div>
                            <div className="w-16 h-2 bg-zinc-300 rounded"></div>
                          </div>
                        </div>
                        <div className="w-12 h-4 bg-zinc-300 rounded"></div>
                      </div>
                      <div className="flex gap-1.5 pt-2 border-t border-zinc-300/60">
                        <div className="w-14 h-4 bg-zinc-300 rounded"></div>
                        <div className="w-14 h-4 bg-zinc-400 rounded"></div>
                        <div className="w-14 h-4 bg-zinc-300 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* 8 Action Buttons Skeleton (Wireframe) */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-400 border border-zinc-500"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                    <div className="h-6 rounded-lg bg-zinc-300/80 border border-zinc-400"></div>
                  </div>

                  {/* Bottom Banner Skeleton */}
                  <div className="p-3 bg-zinc-200/70 rounded-lg border border-zinc-300 flex items-center justify-between">
                    <div className="w-64 h-3 bg-zinc-400 rounded"></div>
                    <div className="w-16 h-4 bg-zinc-400 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Slider Handle Pill (Circular Cyan Thumb matching Reference) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono shadow-lg border-2 border-white select-none">
                  ◀▶
                </div>
              </div>
            </div>

            {/* Slider control bar */}
            <div className="p-3 bg-[#f7f6f2] border-t border-[#e2e0d7] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
                <span>Wireframe (W2)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-32 sm:w-48 h-1.5 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span>Shipped (W9)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSliderPos(0)}
                  className="px-2.5 py-1 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition"
                >
                  Shipped 100%
                </button>
                <button
                  onClick={() => setSliderPos(50)}
                  className="px-2.5 py-1 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition font-bold"
                >
                  50 / 50 Split
                </button>
                <button
                  onClick={() => setSliderPos(100)}
                  className="px-2.5 py-1 rounded font-mono text-[10px] border border-zinc-300 hover:bg-white text-zinc-700 transition"
                >
                  Wireframe 100%
                </button>
              </div>
            </div>
          </div>

          {/* Academic Evaluation & Studio ID Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#d8d6ce] p-5 shadow-sm flex flex-col justify-between">
            <div>
              {/* Studio Artwork matching reference style */}
              <div className="relative rounded-xl overflow-hidden border border-[#d8d6ce] bg-slate-50 mb-4 h-40 group shadow-2xs">
                <img
                  src="/images/ai-hero-visual.png"
                  alt="Web Development Using AI - Studio Specification Artwork"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition duration-500"
                />
              </div>

              {/* Sub-header metric header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                  RESULT, FINAL LAB EVALUATION
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="mb-3">
                <div className="text-4xl font-extrabold tracking-tight text-zinc-950 font-mono">
                  15 <span className="text-xl font-normal text-zinc-400">of 15</span>
                </div>
                <div className="text-xs text-zinc-600 font-medium mt-1 leading-snug">
                  of curriculum experiments verified across responsive design, REST microservices, indexed persistence, and Generative AI.
                </div>
              </div>

              {/* Candidate Metadata Specs - High-Contrast Black & White Print Optimized */}
              <div className="space-y-2 py-3 border-t-2 border-b-2 border-zinc-950 text-xs font-mono bg-[#f7f6f2] p-3 rounded-xl my-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-950 font-bold uppercase text-[11px]">Candidate:</span>
                  <span className="font-black text-zinc-950 font-sans text-sm uppercase">Mayank Goyal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-950 font-bold uppercase text-[11px]">Roll / Enroll:</span>
                  <span className="font-black text-white bg-zinc-950 px-2 py-0.5 rounded text-xs">23BCON1662</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-950 font-bold uppercase text-[11px]">Section &amp; Sem:</span>
                  <span className="text-zinc-950 font-extrabold text-xs">Sec P • 7th Semester</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-950 font-bold uppercase text-[11px]">Course Code:</span>
                  <span className="text-zinc-950 font-extrabold text-xs">Web AI (BCO682A)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-950 font-bold uppercase text-[11px]">Evaluator:</span>
                  <span className="font-sans font-black text-zinc-950 text-xs">Mr. Mohit Parashar</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
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

      {/* 4-QUADRANT FEATURE SHOWCASE (INSPIRED BY REFERENCE IMAGE 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
        {/* Quadrant 1: Inside the Record (Preview of 4 Tiers) */}
        <div className="bg-white rounded-2xl border border-[#d8d6ce] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-1 font-semibold">
              [: Inside the record :]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">
              A full record. 15 Practicals across 4 engineering tiers.
            </h2>
            <p className="text-xs text-zinc-600 font-mono mb-6">
              Every practical includes documented prompts, executable code, live test suites, and academic verification.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 text-center">
                <div className="font-mono font-bold text-sm text-zinc-900">01–04</div>
                <div className="text-[10px] font-mono text-blue-600 font-semibold mt-0.5">Frontend</div>
                <div className="text-[9px] text-zinc-500 mt-1">HTML5, CSS, DOM</div>
              </div>
              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 text-center">
                <div className="font-mono font-bold text-sm text-zinc-900">05–08</div>
                <div className="text-[10px] font-mono text-blue-600 font-semibold mt-0.5">Backend & DB</div>
                <div className="text-[9px] text-zinc-500 mt-1">Express, MongoDB</div>
              </div>
              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 text-center">
                <div className="font-mono font-bold text-sm text-zinc-900">09–12</div>
                <div className="text-[10px] font-mono text-blue-600 font-semibold mt-0.5">Generative AI</div>
                <div className="text-[9px] text-zinc-500 mt-1">Gemini 1.5, GPT-4o</div>
              </div>
              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 text-center">
                <div className="font-mono font-bold text-sm text-zinc-900">13–15</div>
                <div className="text-[10px] font-mono text-blue-600 font-semibold mt-0.5">DevOps & Cap</div>
                <div className="text-[9px] text-zinc-500 mt-1">CI/CD & Capstone</div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Course Code: BCO682A</span>
            <span className="text-zinc-800 font-bold">15 / 15 Complete</span>
          </div>
        </div>

        {/* Quadrant 2: Four Tiers, Measured */}
        <div className="bg-white rounded-2xl border border-[#d8d6ce] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-1 font-semibold">
              [: Work / Measured :]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">
              Four tiers,{' '}
              <span className="blueprint-select-box">
                <span className="blueprint-handle blueprint-handle-tl" />
                <span className="blueprint-handle blueprint-handle-tr" />
                <span className="blueprint-handle blueprint-handle-bl" />
                <span className="blueprint-handle blueprint-handle-br" />
                measured.
                <span className="blueprint-dim-pill">436 × 74</span>
              </span>
            </h2>
            <p className="text-xs text-zinc-600 font-mono mb-4">
              Every practical names the tech stack, prompt strategy, and verified execution metrics.
            </p>

            <ul className="space-y-1.5 text-xs text-zinc-700 font-mono mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></span>
                <span>Verified execution metric on every practical card</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></span>
                <span>Wireframe to production prototype split slider</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></span>
                <span>Prompt engineering analysis for every laboratory exercise</span>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-zinc-200 bg-[#f7f6f2]">
                <div className="text-2xl font-extrabold text-zinc-950 font-mono">100%</div>
                <div className="text-[11px] font-mono text-zinc-600">Mobile Responsive</div>
              </div>
              <div className="p-3 rounded-xl border border-zinc-200 bg-[#f7f6f2]">
                <div className="text-2xl font-extrabold text-zinc-950 font-mono">18ms</div>
                <div className="text-[11px] font-mono text-zinc-600">MongoDB IXSCAN Query</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Evaluated by Mr. Mohit Parashar</span>
            <span className="text-emerald-600 font-bold">● Zero Regressions</span>
          </div>
        </div>

        {/* Quadrant 3: Fits Every Screen (Iconic Royal Blue Section) */}
        <div className="rounded-2xl bg-[#0d5bf5] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-blue-200 font-semibold tracking-wider">
                [: RESPONSIVE :]
              </span>
              <div className="blueprint-frame-box border-blue-200 text-white bg-blue-700/50 text-[10px]">
                Frame 09 / 15
                <span className="blueprint-dim-pill bg-white text-blue-600">360 × 800</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Fits every screen.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-mono max-w-md leading-relaxed mb-6">
              Every practical interface restacks gracefully for smartphones, tablets, and ultra-wide desktops. The wipes work seamlessly by touch. Checked from 360px.
            </p>

            {/* Responsive device mockups */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
                <div className="font-mono text-xs font-bold text-white">Mobile</div>
                <div className="text-[10px] text-blue-200 font-mono mt-0.5">360px – 480px</div>
                <div className="text-[9px] text-white/80 mt-1">Fluid vertical stack</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
                <div className="font-mono text-xs font-bold text-white">Tablet</div>
                <div className="text-[10px] text-blue-200 font-mono mt-0.5">768px – 1024px</div>
                <div className="text-[9px] text-white/80 mt-1">2-Column adaptive</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
                <div className="font-mono text-xs font-bold text-white">Desktop</div>
                <div className="text-[10px] text-blue-200 font-mono mt-0.5">1440px – 1920px</div>
                <div className="text-[9px] text-white/80 mt-1">Full 12-col grid</div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-blue-400/30 flex items-center justify-between text-xs font-mono text-blue-100 relative z-10">
            <span>Tailwind Breakpoints (sm, md, lg, xl)</span>
            <span className="font-bold">✓ 100% Mobile Ready</span>
          </div>
        </div>

        {/* Quadrant 4: How a Project Runs (Workflow Timeline) */}
        <div className="bg-white rounded-2xl border border-[#d8d6ce] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-blue-600 mb-1 font-semibold">
              [: Process / Lifecycle :]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">
              How a practical runs.
            </h2>
            <p className="text-xs text-zinc-600 font-mono mb-6">
              A systematic 4-step AI-assisted software engineering lifecycle applied across all 15 laboratory experiments.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">01. Listen</span>
                <div className="font-bold text-xs text-zinc-900">Prompt</div>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">
                  Syllabus constraints &amp; prompt design.
                </p>
              </div>

              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">02. Frame</span>
                <div className="font-bold text-xs text-zinc-900">Synthesize</div>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">
                  Next.js, Express &amp; MongoDB code.
                </p>
              </div>

              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">03. Test</span>
                <div className="font-bold text-xs text-zinc-900">Audit &amp; QA</div>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">
                  Automated test suites &amp; OWASP check.
                </p>
              </div>

              <div className="p-3 bg-[#f7f6f2] rounded-xl border border-zinc-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">04. Ship</span>
                <div className="font-bold text-xs text-zinc-900">Release</div>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">
                  Edge CDN deploy &amp; 49-pg lab record.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Engineering Methodology</span>
            <span className="text-zinc-900 font-bold">Reproducible &amp; Verified</span>
          </div>
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
