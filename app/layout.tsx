import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Web Development Using AI — College Practical Lab Record (BCO682A)',
  description: '15 Practical Experiments for Web Development Using AI (2026-27), JECRC University. Developed by Mayank Goyal (23BCON1662).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://webdevrecord.531800.xyz/" hrefLang="x-default" rel="alternate" />
        <link href="https://fr.webdevrecord.531800.xyz/" hrefLang="fr" rel="alternate" />
        <link href="https://ka.webdevrecord.531800.xyz/" hrefLang="ka" rel="alternate" />
        <link href="https://it.webdevrecord.531800.xyz/" hrefLang="it" rel="alternate" />
        <script
          src="https://script-cdn.multilipi.com/static/JS/page_translations.js"
          {...{
            'multilipi-key': '3f74a306-71c0-4411-9f89-103d730d2a8f',
            mode: 'auto',
            'data-pos-x': '50',
            'data-pos-y': '50',
          }}
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased bg-[#f7f6f2] text-zinc-900 selection:bg-blue-600 selection:text-white">
        <header className="sticky top-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-md border-b border-[#e5e4de]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex items-center gap-1 p-1.5 rounded-lg border border-blue-600/30 bg-blue-50/50 group-hover:bg-blue-100/50 transition">
                  <span className="w-2.5 h-4 rounded-[2px] bg-blue-600"></span>
                  <span className="w-2.5 h-4 rounded-[2px] border border-blue-600"></span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold tracking-tight text-lg text-zinc-950 font-mono">WebDev AI</span>
                  <span className="text-xs font-mono text-zinc-400 hidden sm:inline">/ practical-record</span>
                </div>
              </Link>
            </div>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-zinc-600">
              <Link href="/" className="hover:text-blue-600 transition text-zinc-900 font-semibold">Dashboard</Link>
              <Link href="/exp1" className="hover:text-blue-600 transition">01–04 Frontend</Link>
              <Link href="/exp5" className="hover:text-blue-600 transition">05–08 Backend</Link>
              <Link href="/exp9" className="hover:text-blue-600 transition">09–12 GenAI</Link>
              <Link href="/exp13" className="hover:text-blue-600 transition">13–14 DevOps</Link>
              <Link href="/exp15" className="hover:text-blue-600 text-blue-600 font-bold transition">15 Capstone</Link>
            </nav>

            {/* Student Frame Badge & Academic Status */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                <div className="blueprint-frame-box">
                  <span className="blueprint-handle blueprint-handle-tl" />
                  <span className="blueprint-handle blueprint-handle-tr" />
                  <span className="blueprint-handle blueprint-handle-bl" />
                  <span className="blueprint-handle blueprint-handle-br" />
                  Frame 01 / 15
                  <span className="blueprint-dim-pill">1920 × 1080</span>
                </div>
              </div>

              <div className="text-right text-xs pl-3 border-l border-zinc-200">
                <div className="font-bold text-zinc-900 leading-tight">Mayank Goyal</div>
                <div className="text-[10px] font-mono text-zinc-500">23BCON1662 • Sec P</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow blueprint-canvas">
          {children}
        </main>

        <footer className="bg-[#f7f6f2] border-t border-[#e5e4de] py-8 text-xs text-zinc-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2 h-3 rounded-[1px] bg-blue-600"></span>
                <span className="w-2 h-3 rounded-[1px] border border-blue-600"></span>
              </div>
              <span className="font-mono font-bold text-zinc-900">WebDev AI Lab</span>
              <span className="text-zinc-400">•</span>
              <span>Web Development Using AI (BCO682A)</span>
            </div>

            <div className="text-center md:text-right font-mono text-[11px] text-zinc-500">
              <p>Candidate: <strong className="text-zinc-800">Mayank Goyal</strong> (23BCON1662) • <a href="mailto:mayank.23bcon1662@jecrcu.edu.in" className="text-blue-600 hover:underline">mayank.23bcon1662@jecrcu.edu.in</a></p>
              <p className="mt-0.5">Evaluator: <strong className="text-zinc-800">Mr. Mohit Parashar</strong> • JECRC University, Jaipur (Session 2026–27)</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
