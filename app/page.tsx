import Link from 'next/link';

const experiments = [
  {
    num: 1,
    title: 'Responsive Personal Portfolio Website',
    aim: 'Write a program to create a responsive personal portfolio website using HTML5, CSS3, and Generative AI tools for code generation.',
    category: 'frontend',
    tech: 'HTML5, CSS3, Tailwind CSS, Responsive Design',
    route: '/exp1',
    concept: 'Semantic tags, viewport breakpoints, form validation'
  },
  {
    num: 2,
    title: 'Responsive Startup Landing Page with Bootstrap',
    aim: 'Develop a responsive landing page for a startup/business using Bootstrap and AI-assisted UI design tools.',
    category: 'frontend',
    tech: 'Bootstrap 5.3, Responsive Grid, Carousel, Cards',
    route: '/exp2',
    concept: 'Bootstrap grid system, utility classes, dynamic components'
  },
  {
    num: 3,
    title: 'Interactive Web Page with JavaScript & DOM Manipulation',
    aim: 'Design and implement an interactive web page using JavaScript, DOM manipulation, and AI-generated scripts.',
    category: 'frontend',
    tech: 'Vanilla JS, DOM APIs, IntersectionObserver, rAF',
    route: '/exp3',
    concept: 'Event delegation, timer intervals, requestAnimationFrame'
  },
  {
    num: 4,
    title: 'Multi-Page Website with Navigation, Forms & Validation',
    aim: 'Create a multi-page website with navigation menu, forms, validation, and responsive layouts using AI-assisted development tools.',
    category: 'frontend',
    tech: 'Next.js App Router, Client Validation, Accessibility',
    route: '/exp4',
    concept: 'Route transitions, pure validation modules, aria tags'
  },
  {
    num: 5,
    title: 'CRUD Web Application with Node.js, Express & MongoDB',
    aim: 'Develop a CRUD-based web application using Node.js, Express.js, and MongoDB with AI-assisted code generation.',
    category: 'backend',
    tech: 'Express.js, MongoDB, Mongoose, RESTful API',
    route: '/exp5',
    concept: 'HTTP verbs, Mongoose models, status code mapping'
  },
  {
    num: 6,
    title: 'User Authentication & Authorization (Login/Registration)',
    aim: 'Implement user authentication and authorization (Login/Registration) using Express.js, MongoDB, and AI coding assistants.',
    category: 'backend',
    tech: 'JWT, bcryptjs, Role-Based Access Control, Auth Guard',
    route: '/exp6',
    concept: 'Password hashing, Bearer tokens, protected routes'
  },
  {
    num: 7,
    title: 'RESTful APIs Tested with Postman & Swagger',
    aim: 'Develop RESTful APIs for a web application and test them using Postman with AI-generated API documentation.',
    category: 'backend',
    tech: 'Swagger UI, OpenAPI 3.0, Postman Collection v2.1',
    route: '/exp7',
    concept: 'Contract-first documentation, collection automated tests'
  },
  {
    num: 8,
    title: 'Database-Driven Student Management System',
    aim: 'Create a database-driven Student Management System using MongoDB and Express.js with AI-assisted debugging and optimization.',
    category: 'backend',
    tech: 'MongoDB Indexes, Aggregation Pipeline, .lean() Queries',
    route: '/exp8',
    concept: 'Query optimization, compound indexes, duplicate roll detection'
  },
  {
    num: 9,
    title: 'AI-Powered Text Generation Studio',
    aim: 'Integrate the OpenAI/Gemini API into a web application for AI-powered text generation.',
    category: 'ai',
    tech: 'Google Gemini 1.5, OpenAI GPT-4o, Express Proxy',
    route: '/exp9',
    concept: 'Server-side provider abstraction, system prompts, modes'
  },
  {
    num: 10,
    title: 'AI-Powered Chatbot for College Website',
    aim: 'Develop an AI-powered chatbot for a college or business website using Generative AI APIs.',
    category: 'ai',
    tech: 'Conversational Memory, Persona Engineering, Helpdesk API',
    route: '/exp10',
    concept: 'Session store memory, admissions FAQ fallback, streaming'
  },
  {
    num: 11,
    title: 'AI-Based Multi-Format Content Generator',
    aim: 'Create an AI-based content generation web application for blogs, emails, or social media posts.',
    category: 'ai',
    tech: 'Prompt Engineering, Multi-Format Templates, Tone Controls',
    route: '/exp11',
    concept: 'Structured prompt synthesis, tone modulation, copy/export'
  },
  {
    num: 12,
    title: 'AI Image Generation & Captioning Studio',
    aim: 'Develop an AI-enabled image generation or image captioning web application using publicly available AI APIs.',
    category: 'ai',
    tech: 'Pollinations AI API, Gemini Vision, Seed Control',
    route: '/exp12',
    concept: 'Style prompts, seed reproducibility, image captioning'
  },
  {
    num: 13,
    title: 'Deployment with GitHub, Vercel/Render & Version Control',
    aim: 'Deploy a full-stack AI-enabled web application using GitHub, Vercel/Render/Netlify, and implement version control.',
    category: 'devops',
    tech: 'Git v1.0.0, Vercel Hosting, Render Web Service, Atlas',
    route: '/exp13',
    concept: 'Production CI/CD pipelines, secret isolation, CORS'
  },
  {
    num: 14,
    title: 'Testing, Debugging, Performance & Security Analysis',
    aim: 'Perform testing, debugging, performance optimization, and security analysis of an AI-assisted web application using Generative AI tools.',
    category: 'devops',
    tech: 'node:test Runner, Playwright, Lighthouse, OWASP Audit',
    route: '/exp14',
    concept: 'Unit test suites, Lighthouse performance, OWASP Top 10'
  },
  {
    num: 15,
    title: 'Complete AI-Enabled Full-Stack Capstone Application',
    aim: 'Develop and deploy a complete AI-enabled Full Stack Web Application integrating responsive frontend, backend, database, authentication, Generative AI API, and cloud deployment.',
    category: 'capstone',
    tech: 'Next.js App Router, Express REST, JWT Auth, GenAI Suite',
    route: '/exp15',
    concept: 'End-to-end full stack architecture, integrated workspace'
  }
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* College & Lab Record Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl mb-10 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              JECRC UNIVERSITY • DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Web Development Using AI
            </h1>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              Practical Lab Record (Course Code: <span className="text-indigo-400 font-mono">BCO682A</span>) — Academic Session 2026–27.
              A unified showcase of 15 fully functional practical experiments integrating responsive frontend engineering, scalable Node.js REST services, database persistence, and cutting-edge Generative AI APIs.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 text-xs space-y-2 min-w-[260px]">
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Academic Record Details</div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-slate-300">Student Name:</span>
              <span className="font-semibold text-white">Mayank Goyal</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-slate-300">Roll / Enrollment:</span>
              <span className="font-mono font-semibold text-indigo-300">23BCON1662</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-slate-300">Course / Branch:</span>
              <span className="text-white">B.Tech CSE (Sec P)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-slate-300">Semester:</span>
              <span className="text-white">7th Semester</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Submitted To:</span>
              <span className="font-semibold text-white">Mr. Mohit Parashar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">All 15 Practical Experiments</h2>
          <p className="text-sm text-slate-500">Click any experiment to open its interactive application or demonstration.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/exp15"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
          >
            Launch Capstone (Exp 15) →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((exp) => (
          <div
            key={exp.num}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center">
                  #{exp.num}
                </span>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {exp.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition">
                {exp.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {exp.aim}
              </p>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
              <div className="text-[11px] text-slate-500 mt-3">
                <span className="font-semibold text-slate-700">Tech:</span> {exp.tech}
              </div>
              <div className="text-[11px] text-indigo-600 font-medium">
                <span className="font-semibold text-slate-700">Viva Focus:</span> {exp.concept}
              </div>
              <Link
                href={exp.route}
                className="w-full mt-2 inline-flex items-center justify-center py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm transition"
              >
                Open Experiment {exp.num} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
