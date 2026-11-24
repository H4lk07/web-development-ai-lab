import Link from 'next/link';

export default function StudioHomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
            EXPERIMENT 4 • MULTI-PAGE APPLICATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            We build digital products that drive measurable impact.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bluepeak Studio combines human-centered UI/UX design with scalable full-stack web engineering and AI workflows.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/exp4/services"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md transition"
            >
              Explore Services
            </Link>
            <Link
              href="/exp4/contact"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Service Preview Cards */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900">What We Do Best</h2>
          <p className="text-xs text-slate-500 mt-1">End-to-end design and web engineering capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Full-Stack Web Engineering', desc: 'High-throughput Next.js, Node.js, and TypeScript architectures optimized for speed.' },
            { title: 'Generative AI Integration', desc: 'Custom LLM workflows, conversational assistants, and automated content engines.' },
            { title: 'Design Systems & UI/UX', desc: 'Accessible, scalable component libraries built to modern WCAG accessibility standards.' }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 shadow-sm transition">
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
