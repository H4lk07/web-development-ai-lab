'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('admin@demo.dev');
  const [password, setPassword] = useState('AdminPass123!');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('admin');
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Login failed');
        return;
      }
      setToken(data.token);
      setCurrentUser(data.user);
      setSuccessMsg(`Logged in successfully as ${data.user.name} (${data.user.role})`);
    } catch (err: any) {
      setErrorMsg('Failed to connect to authentication service.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed');
        return;
      }
      setToken(data.token);
      setCurrentUser(data.user);
      setSuccessMsg(`Registered and authenticated as ${data.user.name} (${data.user.role})`);
    } catch (err: any) {
      setErrorMsg('Failed to connect to registration service.');
    }
  };

  const handleFetchAdminUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminUsers(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setAdminUsers([]);
    setSuccessMsg('Logged out successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 6 • AUTHENTICATION &amp; AUTHORIZATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Secure User Auth</h1>
          <p className="text-xs text-slate-500">
            Express.js + MongoDB + Bcrypt + JWT — Registration, Login, and Role-Based Guards.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      {/* Online indicator */}
      <div className="p-3 rounded-lg text-xs mb-6 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">API online — Auth routes live on port 5000</span>
        </div>
        <span className="font-mono text-[10px]">JWT (HS256)</span>
      </div>

      {currentUser ? (
        /* Authenticated Session Dashboard */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400">GET /api/auth/me — ACTIVE SESSION</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{currentUser.name}</h2>
                <div className="text-xs text-slate-500">{currentUser.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs uppercase font-mono px-2.5 py-1 rounded font-bold ${currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700'}`}>
                  ROLE: {currentUser.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Token preview */}
            <div>
              <span className="text-[10px] font-mono text-slate-400">Raw JWT Token (Bearer Auth):</span>
              <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200 text-[10px] font-mono text-slate-600 break-all">
                {token}
              </div>
            </div>
          </div>

          {/* Admin Role Section */}
          {currentUser.role === 'admin' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-purple-600 uppercase font-bold">GET /api/users — ADMIN ONLY ACCESS</span>
                  <h3 className="text-sm font-bold text-slate-900">Registered System Users</h3>
                </div>
                <button
                  onClick={handleFetchAdminUsers}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow transition"
                >
                  List Users
                </button>
              </div>

              {adminUsers.length > 0 && (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {adminUsers.map(u => (
                    <div key={u.id} className="p-3 flex items-center justify-between bg-slate-50/50 text-xs">
                      <div>
                        <span className="font-semibold text-slate-900">{u.name}</span>
                        <span className="text-slate-400 ml-2 font-mono">{u.email}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-700'}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Login / Register Card */
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => { setTab('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition ${tab === 'login' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition ${tab === 'register' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Register New User
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 mb-4 rounded-lg bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
              {successMsg}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow transition"
              >
                Sign In With JWT
              </button>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div className="font-semibold text-slate-700">Pre-seeded Test Credentials:</div>
                <div>Admin: <span className="font-mono text-indigo-600">admin@demo.dev</span> / <span className="font-mono text-slate-600">AdminPass123!</span></div>
                <div>Student: <span className="font-mono text-indigo-600">mayank@demo.dev</span> / <span className="font-mono text-slate-600">StudentPass123!</span></div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Mayank Goyal"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@example.com"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min 8 characters"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="user">Normal User (Student)</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow transition"
              >
                Register &amp; Generate Token
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
