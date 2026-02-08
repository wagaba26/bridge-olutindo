import Link from "next/link";

export function StickyCTA({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-300 px-3 text-sm font-semibold text-slate-800"
          >
            {secondaryLabel}
          </Link>
        )}
        <Link
          href={primaryHref}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-900 px-3 text-sm font-semibold text-white"
        >
          {primaryLabel}
        </Link>
      </div>
    </div>
  );
}
