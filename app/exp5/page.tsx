'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  done: boolean;
  createdAt: string;
}

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [search, setSearch] = useState('');
  const [filterDone, setFilterDone] = useState<string>('');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  const fetchTasks = async () => {
    try {
      let url = '/api/tasks?limit=50';
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (filterDone !== '') url += `&done=${filterDone}`;

      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setTasks(json.data || []);
        setApiOnline(true);
      } else {
        setApiOnline(false);
      }
    } catch (err) {
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, filterDone]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority })
      });
      if (res.ok) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDone = async (task: Task) => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !task.done })
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 5 • CRUD APPLICATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Task Manager</h1>
          <p className="text-xs text-slate-500">
            React UI at Express.js REST API with persistent Mongoose/MongoDB data storage.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      {/* API Status Banner */}
      <div className={`p-3 rounded-lg text-xs mb-6 flex items-center justify-between ${apiOnline ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="font-semibold">{apiOnline ? 'API online — CRUD operations are live' : 'Connecting to Express backend on port 5000...'}</span>
        </div>
        <span className="font-mono text-[10px]">http://localhost:5000/api/tasks</span>
      </div>

      {/* Create Task Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">POST /api/tasks — Create Task</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <input
                type="text"
                placeholder="Task title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm whitespace-nowrap transition"
            >
              + Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Task Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search (GET ?search=...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 w-full sm:w-64"
        />
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterDone('')}
            className={`px-3 py-1 rounded font-medium transition ${filterDone === '' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterDone('false')}
            className={`px-3 py-1 rounded font-medium transition ${filterDone === 'false' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilterDone('true')}
            className={`px-3 py-1 rounded font-medium transition ${filterDone === 'true' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading tasks from database...</div>
        ) : tasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No tasks found. Create one above!</div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleDone(task)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${task.done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                  )}
                  <span className="text-[10px] text-slate-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
