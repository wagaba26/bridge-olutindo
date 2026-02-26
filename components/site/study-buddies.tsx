import { cn } from "@/lib/utils";

export function StudyBuddies({
  speaking = false,
  className,
}: {
  speaking?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-4", speaking && "buddy-speaking", className)}>
      <svg
        viewBox="0 0 140 160"
        role="img"
        aria-label="Animated study assistant"
        className="buddy-idle h-24 w-24"
      >
        <g fill="none" fillRule="evenodd">
          <rect x="18" y="78" width="92" height="70" rx="32" fill="#7dd3fc" stroke="#1f2937" strokeWidth="3" />
          <circle cx="64" cy="56" r="34" fill="#fde68a" stroke="#1f2937" strokeWidth="3" />
          <path d="M36 56c8-16 22-24 36-24 16 0 28 8 34 22-10-4-20-6-32-6-14 0-26 2-38 8z" fill="#1f2937" />
          <circle className="buddy-eye" cx="54" cy="56" r="4" fill="#1f2937" />
          <circle className="buddy-eye" cx="76" cy="56" r="4" fill="#1f2937" />
          <rect className="buddy-mouth" x="56" y="70" width="16" height="5" rx="2.5" fill="#1f2937" />
          <circle cx="48" cy="66" r="4" fill="#fbcfe8" />
          <circle cx="82" cy="66" r="4" fill="#fbcfe8" />
        </g>
      </svg>

      <svg
        viewBox="0 0 140 160"
        role="img"
        aria-label="Animated study assistant"
        className="buddy-idle h-24 w-24"
      >
        <g fill="none" fillRule="evenodd">
          <rect x="30" y="82" width="92" height="70" rx="32" fill="#fda4af" stroke="#1f2937" strokeWidth="3" />
          <circle cx="92" cy="58" r="32" fill="#a7f3d0" stroke="#1f2937" strokeWidth="3" />
          <path d="M70 58c6-14 18-22 32-22 14 0 24 6 30 18-8-4-18-6-30-6-12 0-22 2-32 8z" fill="#1f2937" />
          <circle className="buddy-eye" cx="84" cy="58" r="4" fill="#1f2937" />
          <circle className="buddy-eye" cx="104" cy="58" r="4" fill="#1f2937" />
          <rect className="buddy-mouth" x="86" y="72" width="16" height="5" rx="2.5" fill="#1f2937" />
          <circle cx="78" cy="68" r="4" fill="#fecdd3" />
          <circle cx="110" cy="68" r="4" fill="#fecdd3" />
        </g>
      </svg>
    </div>
  );
}
