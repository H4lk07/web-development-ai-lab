'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Student {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  course: 'CSE' | 'ECE' | 'ME' | 'CE';
  year: number;
  gpa: number;
  createdAt: string;
}

interface Stats {
  totalStudents: number;
  courseBreakdown: { [key: string]: number };
  averageGPA: number;
}

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState<'CSE' | 'ECE' | 'ME' | 'CE'>('CSE');
  const [year, setYear] = useState(4);
  const [gpa, setGpa] = useState(8.5);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/students/stats');
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      let url = '/api/students?limit=50';
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (selectedCourse !== 'ALL') url += `&course=${selectedCourse}`;

      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setStudents(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchStudents();
  }, [search, selectedCourse]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rollNo, email, course, year, gpa })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.details?.rollNo || data.details?.email || data.error || 'Failed to add student');
        return;
      }
      setShowAddModal(false);
      setName('');
      setRollNo('');
      setEmail('');
      fetchStats();
      fetchStudents();
    } catch (err: any) {
      setErrorMsg('Failed to connect to database API');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStats();
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 8 • DATABASE-DRIVEN STUDENT MANAGEMENT SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Students Directory</h1>
          <p className="text-xs text-slate-500">
            MongoDB + Express.js — Indexed queries, Aggregation Statistics, and Duplicate Prevention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            + Add Student
          </button>
          <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Database Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Students</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.totalStudents}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1">Indexed Documents</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Average GPA</div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">{stats.averageGPA}</div>
            <div className="text-[10px] text-slate-500 mt-1">Scale of 0.0 – 10.0</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">CSE Department</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.courseBreakdown?.CSE || 0}</div>
            <div className="text-[10px] text-slate-500 mt-1">Primary Department</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">ECE / ME / CE</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {(stats.courseBreakdown?.ECE || 0) + (stats.courseBreakdown?.ME || 0) + (stats.courseBreakdown?.CE || 0)}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Allied Engineering</div>
          </div>
        </div>
      )}

      {/* Filter Matrix */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search name / roll / email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 w-full sm:w-72"
        />

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          {['ALL', 'CSE', 'ECE', 'ME', 'CE'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCourse(c)}
              className={`px-3 py-1 rounded font-semibold transition ${selectedCourse === c ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">GPA</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">Loading student directory...</td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">No student records match the filter criteria.</td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-mono font-semibold text-indigo-700">{s.rollNo}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{s.name}</div>
                      <div className="text-slate-400 text-[11px] font-mono">{s.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 font-mono text-[11px] px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                        {s.course}
                      </span>
                    </td>
                    <td className="py-3 px-4">{s.year}th Year</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{s.gpa.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-red-600 hover:text-red-700 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-base">Add New Student Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-mono">✕</button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mayank Goyal"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number (Unique) *</label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                  placeholder="23BCON1662"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@jecrcu.edu.in"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value) || 1)}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={10}
                    value={gpa}
                    onChange={(e) => setGpa(parseFloat(e.target.value) || 0)}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow transition"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
