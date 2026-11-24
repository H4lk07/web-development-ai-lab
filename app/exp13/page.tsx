import Link from 'next/link';

export default function DeploymentVersionControlPage() {
  const commitHistory = [
    { hash: 'e5f2a10', msg: 'feat(capstone): complete full-stack integration and release v1.0.0', author: 'Mayank Goyal', date: 'Just now', tag: 'v1.0.0' },
    { hash: 'c7428f1', msg: 'test(qa): add node:test suites, lighthouse benchmarks, and OWASP audit', author: 'Mayank Goyal', date: '1 hour ago' },
    { hash: 'a9821d3', msg: 'feat(ai): integrate Gemini 1.5, Pollinations image API, and helpdesk bot', author: 'Mayank Goyal', date: '3 hours ago' },
    { hash: 'b1490ee', msg: 'feat(api): implement student management system, product catalog, and JWT auth', author: 'Mayank Goyal', date: '5 hours ago' },
    { hash: '4f20811', msg: 'feat(frontend): build responsive portfolio, bootstrap landing, and DOM lab', author: 'Mayank Goyal', date: '1 day ago' },
    { hash: '18a42c0', msg: 'chore(init): initialize project structure, tailwind configuration, and gitignore', author: 'Mayank Goyal', date: '2 days ago' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 13 • CLOUD DEPLOYMENT &amp; VERSION CONTROL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Deployment &amp; Git Release Dashboard</h1>
          <p className="text-xs text-slate-500">
            Git v1.0.0 Tagging + Vercel Frontend + Render API Gateway + MongoDB Atlas.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      {/* Cloud Architecture Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900">Frontend Hosting</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Vercel Ready</span>
          </div>
          <div className="text-base font-extrabold text-slate-900">Next.js App Router</div>
          <div className="text-xs text-slate-500 mt-1 font-mono">https://lab-webdev-ai.vercel.app</div>
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            Edge-optimized worldwide CDN, automatic preview builds on pull requests, and instant zero-downtime rollbacks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900">Backend Web Service</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Render Active</span>
          </div>
          <div className="text-base font-extrabold text-slate-900">Express REST Gateway</div>
          <div className="text-xs text-slate-500 mt-1 font-mono">https://webdev-ai-backend.onrender.com</div>
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            Containerized Node.js service running on Linux, automated HTTPS certification, and /api/health monitoring.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900">Managed Database</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Atlas M0</span>
          </div>
          <div className="text-base font-extrabold text-slate-900">MongoDB Atlas</div>
          <div className="text-xs text-slate-500 mt-1 font-mono">mongodb+srv://cluster0...</div>
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            Triple-node replica set with automated backups, network IP whitelisting, and compound index performance.
          </p>
        </div>
      </div>

      {/* Git Commit History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Repository Commit Timeline</h2>
            <p className="text-xs text-slate-500">Structured conventional commits on main branch.</p>
          </div>
          <span className="text-xs font-mono bg-purple-100 text-purple-700 px-2.5 py-1 rounded font-bold border border-purple-200">
            TAG: v1.0.0
          </span>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
          {commitHistory.map((c, i) => (
            <div key={i} className="p-3.5 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-3">
                <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {c.hash}
                </span>
                <span className="font-medium text-slate-800">{c.msg}</span>
                {c.tag && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.2 rounded">
                    🏷️ {c.tag}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>{c.author}</span>
                <span>{c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment & Rollback Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 text-sm mb-3">DevOps Production Verification Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Pre-Deployment Verification</div>
            <div className="flex items-center gap-2 text-slate-700">✓ Automated node:test runner passed (9/9 tests)</div>
            <div className="flex items-center gap-2 text-slate-700">✓ TypeScript strict compilation verified (0 errors)</div>
            <div className="flex items-center gap-2 text-slate-700">✓ Sensitive secrets isolated from client bundle</div>
            <div className="flex items-center gap-2 text-slate-700">✓ CORS configured for both localhost and production Vercel origin</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Rollback &amp; Disaster Recovery Protocol</div>
            <div className="text-slate-600 leading-relaxed">
              If an uncaught runtime regression occurs in production, DevOps can revert to the previous verified deployment on Vercel with zero downtime in one click. Render automatically restarts failed worker instances with health probing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
