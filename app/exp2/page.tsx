'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BootstrapLandingPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "AuraMetrics transformed our microservice latency profiling. We detected bottlenecks 4x faster before they affected production.",
      author: "Sarah Chen",
      role: "VP of Engineering at CloudWave"
    },
    {
      quote: "The automated anomaly detection alerts our DevOps team in real time. We achieved 99.99% uptime for four quarters straight.",
      author: "Marcus Vance",
      role: "Lead Site Reliability Engineer"
    },
    {
      quote: "Seamless integration with our Node.js and Next.js services. The best cloud observability tool we have deployed this year.",
      author: "Elena Rostova",
      role: "Chief Technology Officer at Synapse"
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Bootstrap Scoped Custom Styling Link */}
      <style jsx global>{`
        .bs-hero-gradient {
          background: linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #1d3557 100%);
        }
        .bs-badge-glow {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }
      `}</style>

      {/* Bootstrap-Style Sticky Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-slate-900/90 border-b border-slate-800 sticky-top py-3 backdrop-blur">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/exp2" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-extrabold text-white">
              ◆
            </span>
            AuraMetrics AI
          </Link>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white border border-slate-700 rounded-lg"
            type="button"
          >
            ☰
          </button>

          <div className={`${navOpen ? 'block' : 'hidden'} lg:flex items-center gap-6 mt-4 lg:mt-0 text-sm`}>
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#stats" className="text-slate-300 hover:text-white transition">Telemetry</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition">Reviews</a>
            <div className="flex items-center gap-3 mt-3 lg:mt-0">
              <Link href="/" className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs">
                ← Dashboard
              </Link>
              <button className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bs-hero-gradient py-20 lg:py-28 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="row items-center flex flex-col lg:flex-row gap-12">
            <div className="col-lg-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4 bs-badge-glow">
                ✨ Next-Gen AI Telemetry & Observability
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Observability that acts <span className="text-indigo-400 underline decoration-indigo-500/50">before</span> downtime occurs.
              </h1>
              <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                AuraMetrics converts millions of distributed traces, metrics, and application logs into actionable root-cause insights with zero manual instrumentation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition">
                  Start 14-Day Free Trial
                </button>
                <button className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition">
                  Schedule Technical Demo
                </button>
              </div>
            </div>

            {/* Mock Dashboard Visual */}
            <div className="col-lg-6">
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-slate-300">aurametrics-live-cluster</span>
                  </div>
                  <span className="text-emerald-400 font-medium">● 99.99% Healthy</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Requests / Sec</div>
                    <div className="text-lg font-bold text-white mt-1">42,850</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">↑ 12% vs avg</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">p99 Latency</div>
                    <div className="text-lg font-bold text-white mt-1">48ms</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Optimal</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Error Rate</div>
                    <div className="text-lg font-bold text-white mt-1">0.002%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Sub-nominal</div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center mb-2 font-semibold text-slate-300">
                    <span>AI Anomaly Prediction Engine</span>
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">Live Active</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Analyzing database query queue for MongoDB Atlas replica sets. Prediction horizon: 4 hours ahead. No degradation predicted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section id="stats" className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">4.2B+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Events Processed / Mo</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">2,100+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">DevOps Teams Onboard</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">&lt; 312ms</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">p95 Query Latency</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">99.99%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Historical SLA Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4 border-b border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Enterprise Features</span>
          <h2 className="text-3xl font-bold text-white mt-2">Engineered for High-Scale Applications</h2>
          <p className="text-sm text-slate-400 mt-2">Comprehensive toolset built on the Bootstrap responsive grid standard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '⚡', title: 'Automated Root-Cause AI', desc: 'Identifies faulty commits, memory leaks, and query lockups within 3 seconds of occurrence.' },
            { icon: '🛡️', title: 'Zero-Overhead Agents', desc: 'Lightweight sidecar agents that run with under 12MB memory footprint and zero CPU degradation.' },
            { icon: '📊', title: 'Cross-Service Tracing', desc: 'Trace requests across Next.js frontends, Express APIs, and MongoDB clusters with OpenTelemetry.' },
            { icon: '🔔', title: 'Smart Escalation Alerts', desc: 'Noise-free PagerDuty and Slack notifications routed dynamically based on on-call team schedules.' },
            { icon: '🔒', title: 'SOC-2 & GDPR Certified', desc: 'End-to-end encryption at rest and in transit with automated PII masking on log streams.' },
            { icon: '🚀', title: 'Instant Cloud Deployment', desc: 'Deploy with one click via Vercel integration, Render Docker services, or AWS ECS manifests.' }
          ].map((f, idx) => (
            <div key={idx} className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center text-xl mb-4 border border-indigo-800/50">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-white">{f.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20 max-w-6xl mx-auto px-4 border-b border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Transparent Pricing</span>
          <h2 className="text-3xl font-bold text-white mt-2">Simple Tiers for Teams of Every Size</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Starter */}
          <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">For student developers and hobby apps.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever free</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ 1 Million Events / month</li>
                <li className="flex items-center gap-2">✓ 3-Day Log Retention</li>
                <li className="flex items-center gap-2">✓ Community Discord Support</li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-white transition">
              Get Started Free
            </button>
          </div>

          {/* Pro (Highlighted) */}
          <div className="bg-gradient-to-b from-indigo-900/50 to-slate-900 rounded-2xl p-8 border-2 border-indigo-500 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider py-0.5 px-3 rounded-full shadow">
              Most Popular
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Professional</h3>
              <p className="text-xs text-indigo-200 mt-1">For growing startups and production systems.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-xs text-slate-300">/ month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">✓ 50 Million Events / month</li>
                <li className="flex items-center gap-2">✓ 30-Day Log Retention</li>
                <li className="flex items-center gap-2">✓ AI Automated Anomaly Detection</li>
                <li className="flex items-center gap-2">✓ Priority Email & Slack Support</li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg transition">
              Start 14-Day Pro Trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-1">For high-throughput organizations.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$199</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Unlimited Event Telemetry</li>
                <li className="flex items-center gap-2">✓ 365-Day Long-term Retention</li>
                <li className="flex items-center gap-2">✓ Custom SLA & Dedicated Architect</li>
                <li className="flex items-center gap-2">✓ On-premise VPC deployment</li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-white transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20 max-w-4xl mx-auto px-4 text-center border-b border-slate-800">
        <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Testimonials</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-8">Trusted by Modern Engineering Teams</h2>

        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/60 backdrop-blur relative">
          <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
            &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
          </p>
          <div className="mt-6">
            <div className="font-bold text-white text-sm">{testimonials[activeTestimonial].author}</div>
            <div className="text-xs text-indigo-400">{testimonials[activeTestimonial].role}</div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${activeTestimonial === i ? 'bg-indigo-500 w-6' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Band */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-slate-900 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white">Ready to streamline your application telemetry?</h2>
          <p className="text-sm text-indigo-200 mt-2">Deploy AuraMetrics in under 5 minutes with zero configuration changes.</p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-6 py-2.5 bg-white text-indigo-950 font-bold rounded-lg text-xs hover:bg-slate-100 transition shadow">
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
