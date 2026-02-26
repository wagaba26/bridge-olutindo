"use client";

import { useSiteLanguage } from "@/components/site/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useSiteLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 border border-black bg-white px-0.5",
        compact ? "h-7" : "h-8"
      )}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={cn(
          "text-[0.7rem] font-semibold transition",
          compact ? "px-1.5 py-0.5" : "px-1.5 py-0.5",
          locale === "en" ? "bg-black text-white" : "text-black hover:bg-neutral-100"
        )}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "ja"}
        onClick={() => setLocale("ja")}
        className={cn(
          "text-[0.7rem] font-semibold transition",
          compact ? "px-1.5 py-0.5" : "px-1.5 py-0.5",
          locale === "ja" ? "bg-black text-white" : "text-black hover:bg-neutral-100"
        )}
      >
        {compact ? "JP" : "\u65e5\u672c\u8a9e"}
      </button>
    </div>
  );
}
