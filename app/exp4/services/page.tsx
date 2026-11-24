export default function StudioServicesPage() {
  const services = [
    { title: 'Custom Web Applications', price: 'from $4,500', desc: 'Bespoke Next.js & React platforms with authentication, APIs, and analytics.' },
    { title: 'AI Assistant Integration', price: 'from $3,200', desc: 'Enterprise conversational bots trained on company knowledge bases and documentation.' },
    { title: 'REST & GraphQL APIs', price: 'from $2,800', desc: 'Secure, scalable Node.js microservices with automated Postman test suites.' },
    { title: 'Cloud Infrastructure & DevOps', price: 'from $3,500', desc: 'CI/CD pipeline automation, Docker containerization, and managed database clusters.' },
    { title: 'UI/UX Design Systems', price: 'from $2,500', desc: 'Figma prototypes, accessible design tokens, and modular frontend components.' },
    { title: 'Application Security & Audits', price: 'from $1,800', desc: 'OWASP vulnerability scans, penetration testing, and performance profiling.' }
  ];

  return (
    <div className="py-20 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Our Services</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Tailored Software Solutions</h1>
        <p className="text-sm text-slate-600 mt-3">From MVP prototypes to production enterprise systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 shadow-sm transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{s.price}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
