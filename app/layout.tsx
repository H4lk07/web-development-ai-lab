import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Web Development Using AI — College Practical Lab Record',
  description: '15 Practical Experiments for Web Development Using AI (2026-27), JECRC University',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-indigo-700 transition">
                  AI
                </div>
                <div>
                  <div className="font-semibold text-slate-900 leading-tight">Web Development Using AI</div>
                  <div className="text-xs text-slate-500">JECRC University • Lab Record 2026–27</div>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-indigo-600 transition">Dashboard</Link>
              <Link href="/exp1" className="hover:text-indigo-600 transition">Exp 1-4 (Frontend)</Link>
              <Link href="/exp5" className="hover:text-indigo-600 transition">Exp 5-8 (Backend & DB)</Link>
              <Link href="/exp9" className="hover:text-indigo-600 transition">Exp 9-12 (GenAI)</Link>
              <Link href="/exp13" className="hover:text-indigo-600 transition">Exp 13-14 (DevOps & QA)</Link>
              <Link href="/exp15" className="hover:text-indigo-600 font-semibold text-indigo-600 transition">Exp 15 (Capstone)</Link>
            </nav>

            <div className="flex items-center gap-3 text-xs">
              <div className="hidden sm:block text-right">
                <div className="font-medium text-slate-800">Mayank Goyal</div>
                <div className="text-slate-500">23BCON1662 • Sec P</div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                ● Live Ready
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-medium text-slate-700">Web Development Using AI (BCO682A) — College Practical Record 2026–27</p>
            <p className="mt-1">Developed by Mayank Goyal (23BCON1662) • Submitted to Mr. Mohit Parashar • JECRC University, Jaipur</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
