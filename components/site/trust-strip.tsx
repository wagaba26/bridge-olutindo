interface TrustStripItem {
  label: string;
  value: string;
}

export function TrustStrip({
  items,
  className = "",
}: {
  items: TrustStripItem[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4 md:p-5 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">{item.value}</p>
          <p className="text-xs text-slate-600 md:text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
