'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Exp4Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/exp4' },
    { name: 'About', href: '/exp4/about' },
    { name: 'Services', href: '/exp4/services' },
    { name: 'Contact', href: '/exp4/contact' },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && /^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col justify-between">
      {/* Studio Header Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/exp4" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
              B
            </span>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">Bluepeak Studio</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/exp4/contact"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Slot */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Studio Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                B
              </span>
              <span className="font-bold text-white text-base">Bluepeak Studio</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Award-winning digital product design and web development agency. Part of Experiment 4 multi-page architecture.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Studio Pages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/exp4" className="hover:text-white transition">Home Showcase</Link></li>
              <li><Link href="/exp4/about" className="hover:text-white transition">About Our Team</Link></li>
              <li><Link href="/exp4/services" className="hover:text-white transition">Design &amp; Dev Services</Link></li>
              <li><Link href="/exp4/contact" className="hover:text-white transition">Contact &amp; Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Newsletter</h4>
            {newsletterSubscribed ? (
              <p className="text-xs text-emerald-400">✓ Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter work email"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
