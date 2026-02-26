"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";

import { useSiteLanguage } from "@/components/site/language-provider";
import { StudyBuddies } from "@/components/site/study-buddies";
import { useEngagementPrompt } from "@/components/site/use-engagement-prompt";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ENGAGEMENT_SIGNAL_KEYS, markEngagementSignal, trackEvent } from "@/lib/journey-analytics";
import { RESOURCE_ARTICLES } from "@/lib/resources";

const HOME_COPY = {
  en: {
    heroKicker: "Bridge Olutindo",
    heroTitleMobile: "Practical Japanese academy for language and study growth.",
    heroTitle:
      "A practical Japanese academy for language growth, study planning, and transition readiness.",
    heroBodyMobile: "Clear weekly flow built for mobile-first learning.",
    heroBody:
      "Start from a baseline, follow a clear weekly model, and track measurable progression across each phase.",
    primaryCta: "Start intake",
    secondaryCta: "Book consultation",
    logicA: "N5-N3 structured progression",
    logicB: "Immersion mode by level",
    logicC: "Level-aware review logic",
    quizTitle: "Quiz practice",
    quizBody: "Short daily speaking, listening, and reading rounds designed for mobile-first users.",
    quizPrimary: "Open daily quiz",
    quizSecondary: "Open self-study",
    spotlightA: "Study Route",
    spotlightATitle: "Plan admissions and school transitions with practical timelines.",
    spotlightABody:
      "Align intake targets, documents, and scholarship strategy before committing to a path.",
    spotlightAHighlights: [
      "Admissions timeline planning by intake cycle",
      "Document readiness and quality checklist",
      "Scholarship positioning based on profile strength",
    ],
    spotlightB: "Institutional Collaboration",
    spotlightBTitle:
      "Coordinate Uganda-Japan partnerships through a clear operating sequence.",
    spotlightBBody:
      "Define partner roles, onboarding cadence, and launch steps with shared accountability.",
    spotlightBHighlights: [
      "Role ownership across Uganda and Japan teams",
      "Execution cadence and reporting checkpoints",
      "Launch sequencing from pilot to scale",
    ],
    resourceKicker: "Resources",
    resourceTitle: "Read practical guides before major decisions.",
    readGuide: "Read guide",
    openAll: "Open all resources",
    openStudy: "Open study page",
    openPartners: "Open partners page",
    latestLabel: "Latest",
    resourceNotes: [
      "Research-backed guidance before major decisions",
      "Practical checklists for applications and interviews",
      "Bilingual reading path for teams and families",
    ],
    popupEyebrow: "Updates and consultation",
    popupTitle: "Get updates or book your free consultation.",
    popupBody: "Stay informed on pathways, partner opportunities, and practical next steps for Japan.",
    popupPrimary: "Get updates",
    popupSecondary: "Book free consultation",
    popupClose: "Close",
    popupChip: "Updates and free consultation",
    popupLater: "Not now",
  },
  ja: {
    heroKicker: "\u30d6\u30ea\u30c3\u30b8\u30fb\u30aa\u30eb\u30c6\u30a3\u30f3\u30c9",
    heroTitleMobile:
      "\u8a9e\u5b66\u6210\u9577\u3068\u7559\u5b66\u6e96\u5099\u3092\u4e00\u3064\u3067\u9032\u3081\u308b\u5b9f\u8df5\u578b\u30a2\u30ab\u30c7\u30df\u30fc\u3002",
    heroTitle:
      "\u8a9e\u5b66\u6210\u9577\u3001\u7559\u5b66\u8a08\u753b\u3001\u79fb\u884c\u6e96\u5099\u307e\u3067\u3092\u4e00\u3064\u306b\u3064\u306a\u3050\u5b9f\u8df5\u578b\u30a2\u30ab\u30c7\u30df\u30fc\u3002",
    heroBodyMobile:
      "\u30e2\u30d0\u30a4\u30eb\u5b66\u7fd2\u3067\u3082\u9031\u6b21\u306e\u9032\u6357\u304c\u898b\u3048\u308b\u8a2d\u8a08\u3002",
    heroBody:
      "\u307e\u305a\u73fe\u72b6\u3092\u8a3a\u65ad\u3057\u3001\u9031\u6b21\u30e2\u30c7\u30eb\u3067\u5b66\u7fd2\u3092\u9032\u884c\u3002\u5404\u30d5\u30a7\u30fc\u30ba\u306e\u6210\u679c\u3092\u6e2c\u5b9a\u3057\u306a\u304c\u3089\u6b21\u306b\u3064\u306a\u3052\u307e\u3059\u3002",
    primaryCta: "\u30a4\u30f3\u30c6\u30fc\u30af\u958b\u59cb",
    secondaryCta: "\u76f8\u8ac7\u3092\u4e88\u7d04",
    logicA: "N5-N3 \u4f53\u7cfb\u5b66\u7fd2",
    logicB: "\u30ec\u30d9\u30eb\u5225\u6ca1\u5165\u30e2\u30fc\u30c9",
    logicC: "\u30ec\u30d9\u30eb\u5225\u5fa9\u7fd2\u30ed\u30b8\u30c3\u30af",
    quizTitle: "\u30af\u30a4\u30ba\u5b9f\u8df5",
    quizBody:
      "\u30e2\u30d0\u30a4\u30eb\u4e2d\u5fc3\u306e\u5b66\u7fd2\u3067\u3001\u6bce\u65e5\u306e\u767a\u8a71\u30fb\u8074\u89e3\u30fb\u8aad\u89e3\u3092\u77ed\u6642\u9593\u3067\u56de\u305b\u308b\u8a2d\u8a08\u3067\u3059\u3002",
    quizPrimary: "\u6bce\u65e5\u30af\u30a4\u30ba\u3092\u958b\u304f",
    quizSecondary: "\u72ec\u5b66\u30da\u30fc\u30b8\u3092\u958b\u304f",
    spotlightA: "\u7559\u5b66\u30eb\u30fc\u30c8",
    spotlightATitle:
      "\u5b9f\u884c\u53ef\u80fd\u306a\u30bf\u30a4\u30e0\u30e9\u30a4\u30f3\u3067\u3001\u51fa\u9858\u3068\u79fb\u884c\u3092\u6574\u7406\u3057\u307e\u3059\u3002",
    spotlightABody:
      "\u5165\u5b66\u6642\u671f\u3001\u5fc5\u8981\u66f8\u985e\u3001\u5956\u5b66\u91d1\u6226\u7565\u3092\u5148\u306b\u6574\u5408\u3055\u305b\u307e\u3059\u3002",
    spotlightAHighlights: [
      "\u5165\u5b66\u6642\u671f\u5225\u306e\u51fa\u9858\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u8a2d\u8a08",
      "\u66f8\u985e\u6e96\u5099\u30c1\u30a7\u30c3\u30af\u30ea\u30b9\u30c8\u3068\u5b8c\u6210\u57fa\u6e96",
      "\u5956\u5b66\u91d1\u7533\u8acb\u306b\u5411\u3051\u305f\u4f18\u5148\u9806\u4f4d\u4ed8\u3051",
    ],
    spotlightB: "\u6a5f\u95a2\u9023\u643a",
    spotlightBTitle:
      "\u30a6\u30ac\u30f3\u30c0\u3068\u65e5\u672c\u306e\u9023\u643a\u3092\u3001\u660e\u78ba\u306a\u904b\u7528\u624b\u9806\u3067\u63a8\u9032\u3002",
    spotlightBBody:
      "\u5f79\u5272\u5206\u62c5\u3001\u5c0e\u5165\u30da\u30fc\u30b9\u3001\u958b\u59cb\u624b\u9806\u3092\u540c\u3058\u57fa\u6e96\u3067\u5408\u610f\u3057\u307e\u3059\u3002",
    spotlightBHighlights: [
      "\u30a6\u30ac\u30f3\u30c0\u30fb\u65e5\u672c\u4e21\u5074\u306e\u5f79\u5272\u8cac\u4efb\u3092\u660e\u78ba\u5316",
      "\u904b\u7528\u30ab\u30c7\u30f3\u30b9\u3068\u30ec\u30dd\u30fc\u30c8\u57fa\u6e96\u306e\u7d71\u4e00",
      "\u30d1\u30a4\u30ed\u30c3\u30c8\u304b\u3089\u62e1\u5f35\u307e\u3067\u306e\u5b9f\u884c\u9806\u5e8f\u8a2d\u8a08",
    ],
    resourceKicker: "\u8cc7\u6599",
    resourceTitle: "\u91cd\u8981\u306a\u610f\u601d\u6c7a\u5b9a\u306e\u524d\u306b\u3001\u5b9f\u52d9\u30ac\u30a4\u30c9\u3092\u78ba\u8a8d\u3002",
    readGuide: "\u30ac\u30a4\u30c9\u3092\u898b\u308b",
    openAll: "\u8cc7\u6599\u4e00\u89a7\u3078",
    openStudy: "\u7559\u5b66\u30da\u30fc\u30b8\u3092\u958b\u304f",
    openPartners: "\u30d1\u30fc\u30c8\u30ca\u30fc\u30da\u30fc\u30b8\u3092\u958b\u304f",
    latestLabel: "\u6700\u65b0",
    resourceNotes: [
      "\u610f\u601d\u6c7a\u5b9a\u524d\u306b\u8aad\u3080\u3079\u304d\u5b9f\u52d9\u30ac\u30a4\u30c9\u3092\u6574\u7406",
      "\u51fa\u9858\u30fb\u9762\u63a5\u3067\u4f7f\u3048\u308b\u30c1\u30a7\u30c3\u30af\u30ea\u30b9\u30c8\u3092\u53ce\u9332",
      "\u5b66\u7fd2\u8005\u30fb\u4fdd\u8b77\u8005\u30fb\u6a5f\u95a2\u5411\u3051\u306e\u65e5\u82f1\u4e21\u5bfe\u5fdc",
    ],
    popupEyebrow: "\u66f4\u65b0\u60c5\u5831\u3068\u76f8\u8ac7",
    popupTitle: "\u6700\u65b0\u60c5\u5831\u306e\u53d7\u3051\u53d6\u308a\u307e\u305f\u306f\u7121\u6599\u76f8\u8ac7\u3092\u4e88\u7d04",
    popupBody: "\u7559\u5b66\u30fb\u9023\u643a\u60c5\u5831\u3068\u3001\u6b21\u306e\u4e00\u624b\u3092\u30b7\u30f3\u30d7\u30eb\u306b\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002",
    popupPrimary: "\u66f4\u65b0\u60c5\u5831\u3092\u53d7\u3051\u53d6\u308b",
    popupSecondary: "\u7121\u6599\u76f8\u8ac7\u3092\u4e88\u7d04\u3059\u308b",
    popupClose: "\u9589\u3058\u308b",
    popupChip: "\u66f4\u65b0\u60c5\u5831\u3068\u7121\u6599\u76f8\u8ac7",
    popupLater: "\u3042\u3068\u3067\u898b\u308b",
  },
} as const;

const PROMPT_COOLDOWN_MS = 1000 * 60 * 60 * 24;

export default function Home() {
  const { locale } = useSiteLanguage();
  const copy = HOME_COPY[locale];
  const feature = RESOURCE_ARTICLES[0];
  const latest = RESOURCE_ARTICLES.slice(1, 3);
  const {
    modalOpen: showHomePrompt,
    chipVisible: showHomePromptChip,
    openModal: openHomePrompt,
    closeModal: closeHomePrompt,
    dismissForNow: dismissHomePrompt,
  } = useEngagementPrompt({
    key: "home_prompt_v2",
    cooldownMs: PROMPT_COOLDOWN_MS,
    chipDelayMs: 450,
    autoOpenAfterMs: 900,
    autoOpenScrollRatio: 0.05,
    suppressionSignals: [
      { key: ENGAGEMENT_SIGNAL_KEYS.formSubmittedAt, withinMs: 1000 * 60 * 60 * 24 * 7 },
    ],
  });

  useEffect(() => {
    if (!showHomePrompt) return;
    trackEvent("engagement_prompt_viewed", { page: "home" });
  }, [showHomePrompt]);

  function trackPrimaryIntent(target: string) {
    markEngagementSignal(ENGAGEMENT_SIGNAL_KEYS.primaryIntentAt);
    trackEvent("primary_intent_click", { page: "home", target });
  }

  function handleOpenPromptChip() {
    trackEvent("engagement_prompt_chip_open", { page: "home" });
    openHomePrompt();
  }

  function handleDismissPrompt(action = "close") {
    trackEvent("engagement_prompt_dismiss", { page: "home", action });
    dismissHomePrompt();
  }

  function handlePostponePrompt() {
    trackEvent("engagement_prompt_dismiss", { page: "home", action: "later" });
    closeHomePrompt();
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-black bg-white pt-0 md:pt-10">
        <div className="container mx-auto">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <FadeIn delay={0.04} className="order-1 lg:order-2">
              <div className="-mx-4 -mt-px border-y border-black bg-neutral-50 md:mx-0 md:mt-0 md:border md:border-black">
                <div className="h-[clamp(96px,20vh,150px)] bg-neutral-50 md:h-[360px] lg:h-[420px]" />
              </div>
            </FadeIn>

            <FadeIn className="order-2 pb-8 pt-2 text-left md:pt-10 lg:order-1 lg:pb-12">
              <div className="space-y-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-neutral-600">{copy.heroKicker}</p>
                <h1 className="max-w-[13.5ch] text-balance text-[clamp(1.7rem,8.1vw,2.45rem)] leading-[0.98] tracking-[-0.02em] md:hidden">
                  {copy.heroTitleMobile}
                </h1>
                <h1 className="hidden max-w-3xl text-balance text-[clamp(2.6rem,5.2vw,4.2rem)] leading-[0.95] tracking-[-0.02em] md:block">
                  {copy.heroTitle}
                </h1>
                <p className="max-w-[33ch] text-[0.92rem] leading-[1.75] text-neutral-600 md:hidden">
                  {copy.heroBodyMobile}
                </p>
                <p className="hidden max-w-xl text-[0.98rem] leading-7 text-neutral-600 md:block">
                  {copy.heroBody}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="h-12 px-6">
                    <Link href="/intake" onClick={() => trackPrimaryIntent("intake")}>
                      {copy.primaryCta}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 px-6 border-black">
                    <Link href="/consultation" onClick={() => trackPrimaryIntent("consultation")}>
                      {copy.secondaryCta}
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-px border border-neutral-300 bg-neutral-300 text-sm text-neutral-700 md:grid-cols-2 lg:grid-cols-3">
                  {[copy.logicA, copy.logicB, copy.logicC].map((item, index) => (
                    <div
                      key={item}
                      className="flex h-full items-center gap-2 bg-white px-4 py-3 text-[0.8rem] font-semibold"
                    >
                      <span className="flex h-6 w-6 items-center justify-center border border-black text-[0.7rem] text-black">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-b border-black bg-white py-7 md:py-8">
        <div className="container mx-auto">
          <FadeIn>
            <div className="grid gap-4 border border-neutral-300 bg-white p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{copy.quizTitle}</p>
                <p className="mt-2 text-sm leading-7 text-neutral-700">{copy.quizBody}</p>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <StudyBuddies className="justify-center md:justify-end" />
                <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-end">
                  <Button asChild variant="outline" className="h-10 border-black px-4 text-sm">
                    <Link href="/quiz" onClick={() => trackEvent("journey_navigation_click", { page: "home", target: "quiz" })}>
                      {copy.quizPrimary}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-10 border-black px-4 text-sm">
                    <Link href="/learn/self-study" onClick={() => trackEvent("journey_navigation_click", { page: "home", target: "self-study" })}>
                      {copy.quizSecondary}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-black bg-white py-12">
        <div className="container mx-auto grid gap-px border border-neutral-300 bg-neutral-300 p-px lg:grid-cols-2">
          <FadeIn>
            <article className="space-y-4 bg-white p-6">
              <div className="h-[200px] border border-black bg-white" aria-hidden="true" />
              <p className="text-sm font-semibold text-black">{copy.spotlightA}</p>
              <h2 className="text-[1.85rem] leading-[1.08]">{copy.spotlightATitle}</h2>
              <p className="text-base leading-7 text-neutral-600">{copy.spotlightABody}</p>
              <Button asChild variant="outline" className="h-12 px-6 border-black">
                <Link href="/study" onClick={() => trackEvent("journey_navigation_click", { page: "home", target: "study" })}>
                  {copy.openStudy}
                </Link>
              </Button>
            </article>
          </FadeIn>

          <FadeIn delay={0.05}>
            <article className="space-y-4 bg-white p-6">
              <div className="h-[200px] border border-black bg-white" aria-hidden="true" />
              <p className="text-sm font-semibold text-black">{copy.spotlightB}</p>
              <h2 className="text-[1.85rem] leading-[1.08]">{copy.spotlightBTitle}</h2>
              <p className="text-base leading-7 text-neutral-600">{copy.spotlightBBody}</p>
              <Button asChild variant="outline" className="h-12 px-6 border-black">
                <Link href="/partners" onClick={() => trackEvent("journey_navigation_click", { page: "home", target: "partners" })}>
                  {copy.openPartners}
                </Link>
              </Button>
            </article>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <article className="overflow-hidden border border-black bg-white">
              <div className="grid gap-px bg-neutral-300 md:grid-cols-[1fr_1fr]">
                <div className="bg-white p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {copy.resourceKicker}
                  </p>
                  <h2 className="mt-2 text-neutral-900">{copy.resourceTitle}</h2>
                  <p className="mt-2 text-sm text-neutral-600">{feature.excerpt}</p>
                  <Link
                    href={`/blog/${feature.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:underline"
                  >
                    {copy.readGuide}
                  </Link>
                </div>
                <div className="h-[220px] border border-black bg-white md:h-full" aria-hidden="true" />
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="border border-black bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">{copy.latestLabel}</p>
              <div className="mt-4 grid gap-px bg-neutral-300">
                {latest.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block bg-white p-4 hover:bg-neutral-100"
                  >
                    <p className="text-xs font-semibold text-neutral-500">{item.category}</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="mt-1 text-xs text-neutral-600">{item.readTime}</p>
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-4 h-12 w-full border-black">
                <Link href="/blog">{copy.openAll}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {showHomePrompt ? (
        <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-4 sm:w-[min(30rem,calc(100vw-2rem))]">
          <div role="dialog" aria-modal="false" aria-label={copy.popupEyebrow} className="relative w-full border border-slate-300 bg-white px-5 pb-5 pt-14 sm:px-6">
            <button
              type="button"
              aria-label={copy.popupClose}
              className="absolute right-2 top-2 inline-flex h-12 w-12 items-center justify-center border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => {
                handleDismissPrompt("close-icon");
              }}
            >
              <X className="size-7" />
            </button>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.popupEyebrow}</p>
            <h2 className="mt-2 text-[1.55rem] leading-tight">{copy.popupTitle}</h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">{copy.popupBody}</p>
            <div className="mt-5 grid gap-2">
              <Button asChild className="h-12 px-5 text-sm">
                <Link
                  href="/contact"
                  onClick={() => {
                    trackEvent("engagement_prompt_cta_click", { page: "home", target: "updates" });
                    handleDismissPrompt("primary-cta");
                  }}
                >
                  {copy.popupPrimary}
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-5 text-sm">
                <Link
                  href="/consultation"
                  onClick={() => {
                    trackPrimaryIntent("consultation_popup");
                    trackEvent("engagement_prompt_cta_click", { page: "home", target: "consultation" });
                    handleDismissPrompt("secondary-cta");
                  }}
                >
                  {copy.popupSecondary}
                </Link>
              </Button>
              <button
                type="button"
                className="h-10 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 hover:text-slate-800"
                onClick={handlePostponePrompt}
              >
                {copy.popupLater}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showHomePromptChip && !showHomePrompt ? (
        <div className="fixed inset-x-3 bottom-3 z-[65] sm:inset-x-auto sm:right-4">
          <button
            type="button"
            className="h-12 w-full border border-black bg-white px-4 text-left text-sm font-semibold text-black hover:bg-neutral-100 sm:w-auto sm:min-w-[260px]"
            onClick={handleOpenPromptChip}
          >
            {copy.popupChip}
          </button>
        </div>
      ) : null}
    </div>
  );
}
