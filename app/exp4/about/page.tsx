export default function StudioAboutPage() {
  return (
    <div className="py-20 max-w-5xl mx-auto px-4">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">About Bluepeak Studio</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Designing the Future of Digital Interaction</h1>
        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          Founded with a mission to bridge cutting-edge artificial intelligence with intuitive user design, Bluepeak Studio builds robust applications for forward-thinking enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          { title: 'Rigorous Engineering', desc: 'Every application is backed by automated test suites, type-safety, and performance benchmarks.' },
          { title: 'Accessibility First', desc: 'We build for everyone, adhering strictly to semantic HTML5 standards and WCAG 2.1 guidelines.' },
          { title: 'AI-Enhanced Velocity', desc: 'We integrate generative AI into our software lifecycle, cutting boilerplate development time in half.' },
          { title: 'Radical Transparency', desc: 'Predictable sprint schedules, open communication, and shared repository accountability.' }
        ].map((val, idx) => (
          <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm">{val.title}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
