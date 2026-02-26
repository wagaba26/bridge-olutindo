export function SkillProgressBreakdown() {
  const rows = [
    { label: "Reading comprehension", value: 62 },
    { label: "Listening accuracy", value: 54 },
    { label: "Vocabulary retention", value: 68 },
    { label: "Speaking consistency", value: 49 },
  ];

  return (
    <section aria-labelledby="skill-progress-title" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <h3 id="skill-progress-title" className="text-lg font-semibold text-slate-900">
        Skill Progress Breakdown
      </h3>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-700">{row.label}</span>
              <span className="font-semibold text-slate-900">{row.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-brand-700 transition-all duration-300"
                style={{ width: `${row.value}%` }}
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
