'use client';

import { useState } from 'react';

export default function StudioContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'web_dev',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.phone && formData.phone.trim().length > 0) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSubmitted(true);
    }
  };

  return (
    <div className="py-20 max-w-5xl mx-auto px-4">
      <div className="mb-12">
        <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Contact</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Tell us what you&apos;re building.</h1>
        <p className="text-sm text-slate-600 mt-2">
          The form below validates as you type and on submit — required fields, email format, phone pattern, and message length.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Send a message</h2>

          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center mx-auto mb-3">✓</div>
              <h3 className="font-bold text-slate-900 text-sm">Message received successfully!</h3>
              <p className="text-xs text-slate-600 mt-1">Our project lead will respond within one business day.</p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'web_dev', message: '' });
                }}
                className="mt-4 text-xs font-semibold text-blue-600 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NAME *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
                {errors.name && <p role="alert" className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">EMAIL *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p role="alert" className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">PHONE (optional)</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 555 010 2030"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
                {errors.phone && <p role="alert" className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">SUBJECT *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="web_dev">Web Development &amp; Architecture</option>
                  <option value="ai_agent">Generative AI Integration</option>
                  <option value="audit">Security &amp; Performance Audit</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">MESSAGE * (min 10 chars)</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project, timeline and budget..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
                {errors.message && <p role="alert" className="text-red-600 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-sm transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Direct Details & FAQ */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Direct details</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">Email:</span> hello@bluepeak.studio
              </div>
              <div>
                <span className="font-semibold text-slate-800">Phone:</span> +1 555 010 2030
              </div>
              <div>
                <span className="font-semibold text-slate-800">Studio:</span> Pier 9, Harbour District
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 text-sm mb-3">FAQ</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <div className="font-semibold text-slate-800">How fast can you start?</div>
                <div>We typically kick off new sprint cycles within 1-2 weeks of contract execution.</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">Do you offer post-launch support?</div>
                <div>Yes, all our deliveries include 60 days of guaranteed bug-fix and maintenance coverage.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
