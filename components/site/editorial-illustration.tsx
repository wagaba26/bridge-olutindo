import { cn } from "@/lib/utils";

type IllustrationVariant = "language" | "study" | "partners" | "resources";

export function EditorialIllustration({
  variant,
  className,
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f5f5]",
        className
      )}
    >
      <svg
        viewBox="0 0 420 300"
        role="img"
        aria-label={`${variant} illustration`}
        className="h-full w-full"
      >
        <rect width="420" height="300" fill="#f3f4f6" />
        <ellipse cx="360" cy="235" rx="90" ry="42" fill="#a5f3fc" />
        <ellipse cx="300" cy="228" rx="80" ry="38" fill="#fda4af" />

        {variant === "language" ? (
          <>
            <circle cx="300" cy="90" r="34" fill="#f472b6" />
            <rect x="270" y="122" width="70" height="88" rx="28" fill="#111827" />
            <rect x="252" y="145" width="24" height="76" rx="12" fill="#f472b6" />
            <rect x="334" y="145" width="24" height="76" rx="12" fill="#f472b6" />
            <circle cx="208" cy="136" r="24" fill="#fde68a" />
            <rect x="187" y="158" width="44" height="62" rx="14" fill="#fb7185" />
            <rect x="158" y="186" width="44" height="34" rx="8" fill="#fcd34d" />
            <rect x="226" y="182" width="45" height="38" rx="8" fill="#60a5fa" />
          </>
        ) : null}

        {variant === "study" ? (
          <>
            <circle cx="245" cy="104" r="28" fill="#f97316" />
            <rect x="220" y="126" width="54" height="84" rx="18" fill="#f3f4f6" stroke="#d1d5db" />
            <path d="M162 210c14-25 26-35 42-35 18 0 34 14 50 35" fill="#c7d2fe" />
            <rect x="110" y="92" width="85" height="110" rx="10" fill="#ffffff" stroke="#d1d5db" />
            <rect x="126" y="110" width="52" height="8" rx="4" fill="#1f3a63" />
            <rect x="126" y="125" width="44" height="6" rx="3" fill="#94a3b8" />
            <rect x="126" y="138" width="54" height="6" rx="3" fill="#94a3b8" />
            <rect x="282" y="168" width="78" height="44" rx="8" fill="#fca5a5" />
            <rect x="292" y="177" width="38" height="25" rx="4" fill="#111827" />
          </>
        ) : null}

        {variant === "partners" ? (
          <>
            <circle cx="210" cy="108" r="24" fill="#7dd3fc" />
            <circle cx="286" cy="108" r="24" fill="#f9a8d4" />
            <rect x="188" y="132" width="42" height="74" rx="14" fill="#1f2937" />
            <rect x="264" y="132" width="42" height="74" rx="14" fill="#334155" />
            <rect x="230" y="150" width="36" height="12" rx="6" fill="#111827" />
            <rect x="130" y="170" width="60" height="42" rx="8" fill="#fff" stroke="#d1d5db" />
            <rect x="138" y="180" width="42" height="7" rx="3" fill="#1f3a63" />
            <rect x="138" y="193" width="34" height="6" rx="3" fill="#94a3b8" />
            <rect x="310" y="170" width="64" height="42" rx="8" fill="#fff" stroke="#d1d5db" />
            <rect x="318" y="180" width="45" height="7" rx="3" fill="#1f3a63" />
            <rect x="318" y="193" width="34" height="6" rx="3" fill="#94a3b8" />
          </>
        ) : null}

        {variant === "resources" ? (
          <>
            <rect x="70" y="58" width="82" height="112" rx="10" fill="#ffffff" stroke="#d1d5db" />
            <rect x="168" y="58" width="82" height="112" rx="10" fill="#ffffff" stroke="#d1d5db" />
            <rect x="266" y="58" width="82" height="112" rx="10" fill="#ffffff" stroke="#d1d5db" />
            <rect x="84" y="77" width="52" height="9" rx="4" fill="#1f3a63" />
            <rect x="182" y="77" width="52" height="9" rx="4" fill="#1f3a63" />
            <rect x="280" y="77" width="52" height="9" rx="4" fill="#1f3a63" />
            <rect x="84" y="92" width="42" height="7" rx="3" fill="#94a3b8" />
            <rect x="182" y="92" width="42" height="7" rx="3" fill="#94a3b8" />
            <rect x="280" y="92" width="42" height="7" rx="3" fill="#94a3b8" />
            <circle cx="114" cy="132" r="15" fill="#bae6fd" />
            <circle cx="212" cy="132" r="15" fill="#fbcfe8" />
            <circle cx="310" cy="132" r="15" fill="#fde68a" />
          </>
        ) : null}
      </svg>
    </div>
  );
}
