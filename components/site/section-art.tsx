import { cn } from "@/lib/utils";

export function SectionArt({ type, className }: { type: "learn" | "study" | "partners" | "resources"; className?: string }) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50", className)}>
      <svg viewBox="0 0 320 240" role="img" aria-label={`${type} illustration`} className="h-full w-full">
        <rect width="320" height="240" fill="#f8fafc" />
        <rect x="0" y="170" width="320" height="70" fill="#e2e8f0" />
        {type === "learn" ? (
          <>
            <rect x="35" y="58" width="160" height="98" rx="12" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="50" y="76" width="130" height="12" rx="4" fill="#1f3a63" />
            <rect x="50" y="96" width="88" height="10" rx="4" fill="#94a3b8" />
            <circle cx="242" cy="120" r="35" fill="#dbeafe" stroke="#93c5fd" />
            <rect x="224" y="109" width="37" height="8" rx="4" fill="#1e3a8a" />
          </>
        ) : null}
        {type === "study" ? (
          <>
            <rect x="34" y="62" width="118" height="94" rx="10" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="168" y="74" width="116" height="82" rx="10" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="183" y="88" width="86" height="10" rx="3" fill="#1f3a63" />
            <rect x="183" y="106" width="68" height="8" rx="3" fill="#94a3b8" />
            <circle cx="92" cy="109" r="24" fill="#e0e7ff" stroke="#a5b4fc" />
          </>
        ) : null}
        {type === "partners" ? (
          <>
            <circle cx="95" cy="108" r="28" fill="#dbeafe" stroke="#93c5fd" />
            <circle cx="225" cy="108" r="28" fill="#fee2e2" stroke="#fca5a5" />
            <rect x="124" y="103" width="72" height="10" rx="5" fill="#1f3a63" />
            <rect x="66" y="151" width="58" height="9" rx="4" fill="#64748b" />
            <rect x="196" y="151" width="58" height="9" rx="4" fill="#64748b" />
          </>
        ) : null}
        {type === "resources" ? (
          <>
            <rect x="44" y="56" width="72" height="104" rx="8" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="126" y="56" width="72" height="104" rx="8" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="208" y="56" width="72" height="104" rx="8" fill="#ffffff" stroke="#cbd5e1" />
            <rect x="54" y="72" width="52" height="9" rx="3" fill="#1f3a63" />
            <rect x="136" y="72" width="52" height="9" rx="3" fill="#1f3a63" />
            <rect x="218" y="72" width="52" height="9" rx="3" fill="#1f3a63" />
            <rect x="54" y="90" width="40" height="7" rx="3" fill="#94a3b8" />
            <rect x="136" y="90" width="40" height="7" rx="3" fill="#94a3b8" />
            <rect x="218" y="90" width="40" height="7" rx="3" fill="#94a3b8" />
          </>
        ) : null}
      </svg>
    </div>
  );
}

