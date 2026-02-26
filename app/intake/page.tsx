"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { IntakeForm } from "@/components/site/intake-form";
import { useSiteLanguage } from "@/components/site/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { getVisibleIntakeFocusOptions, type IntakeFocus } from "@/lib/intake";

const COPY = {
  en: {
    eyebrow: "Structured Intake",
    title: "Share your baseline, target pathway, and next 90-day objective.",
    description:
      "Submit structured details so your request is routed to the correct desk with clear, measurable next steps.",
  },
  ja: {
    eyebrow: "インテーク",
    title: "現状、希望ルート、今後90日の目標を共有してください。",
    description:
      "必要情報を整理して送信いただくと、適切な担当窓口へ接続し、実行可能な次のステップをご案内します。",
  },
} as const;

function IntakePageContent() {
  const searchParams = useSearchParams();
  const { locale } = useSiteLanguage();
  const language = locale === "ja" ? "ja" : "en";
  const copy = COPY[language];

  const focusOptions = useMemo(() => getVisibleIntakeFocusOptions(), []);
  const requestedFocus = searchParams.get("focus") ?? "learn";
  const initialFocus = focusOptions.some((option) => option.value === requestedFocus)
    ? (requestedFocus as IntakeFocus)
    : "learn";
  const program = searchParams.get("program") ?? "";

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <IntakeForm initialFocus={initialFocus} initialProgram={program} focusOptions={focusOptions} />
        </div>
      </section>
    </div>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <IntakePageContent />
    </Suspense>
  );
}
