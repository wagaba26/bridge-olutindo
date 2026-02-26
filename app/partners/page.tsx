"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Building2, BriefcaseBusiness, GraduationCap, Landmark, X } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { useEngagementPrompt } from "@/components/site/use-engagement-prompt";
import { useSiteLanguage } from "@/components/site/language-provider";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import { ENGAGEMENT_SIGNAL_KEYS, markEngagementSignal, trackEvent } from "@/lib/journey-analytics";

type SupportedLocale = "en" | "ja";

type PartnerType = {
  label: string;
  value: string;
  icon: typeof Landmark;
  summary: string;
  programs: string[];
  support: string[];
};

const COPY = {
  en: {
    navOverview: "Overview",
    navTypes: "Partner types",
    navModel: "Collaboration model",
    navForm: "Partner form",
    eyebrow: "Partners",
    title: "Build Uganda-Japan collaboration through one structured operating partner.",
    description: "We support institutions with practical program design, onboarding coordination, and execution support.",
    ctaA: "Explore partner tracks",
    ctaB: "Book consultation",
    chipA: "Education partnerships",
    chipB: "Cross-border coordination",
    chipC: "Execution support",
    sceneLabelA: "Collaboration",
    sceneCaptionA: "Institution-to-institution planning and delivery",
    sceneLabelB: "Scoping",
    sceneCaptionB: "Clear ownership and launch sequencing",
    partnerGridTitle: "Partners",
    partnerGridBody: "Select the collaboration type and we route your request.",
    programsLabel: "Programs",
    supportLabel: "Support",
    openFormCta: "Open interest form",
    typeHeading: "How collaboration works",
    step1: "1. Discovery",
    step1Body: "Align goals, participant profile, and timing.",
    step2: "2. Design",
    step2Body: "Define process, responsibilities, and communication cadence.",
    step3: "3. Launch",
    step3Body: "Start pilot operations and review performance jointly.",
    formTitle: "Partner interest form",
    formBody: "After reviewing partner tracks, submit your institution details and our team will respond with a scoped collaboration path.",
    partnerTypeLabel: "Partner type",
    partnerProgramLabel: "Program area",
    organizationLabel: "Organization",
    organizationPlaceholder: "Organization name",
    contactLabel: "Contact person",
    contactPlaceholder: "Full name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    regionLabel: "Region",
    regionPlaceholder: "Uganda / Japan / Other",
    detailLabel: "Goals and support needed",
    detailPlaceholder: "Share your objective, available programs, timeline, and support requirements.",
    submitInterest: "Submit interest",
    newsletterEyebrow: "Partners update",
    newsletterTitle: "Stay updated on new partner opportunities",
    newsletterBody: "Subscribe for partner updates or book a free consultation about your next move to Japan.",
    newsletterCta: "Get updates",
    popupConsultationCta: "Book free consultation",
    popupClose: "Close",
  },
  ja: {
    navOverview: "概要",
    navTypes: "パートナー種別",
    navModel: "連携モデル",
    navForm: "申請フォーム",
    eyebrow: "パートナー",
    title: "ひとつの運営パートナーで、ウガンダと日本の連携を実行可能な形に。",
    description: "制度設計、受け入れ準備、運用立ち上げまで、現場で機能する連携を支援します。",
    ctaA: "パートナー種別を見る",
    ctaB: "無料相談を予約",
    chipA: "教育連携",
    chipB: "越境運用",
    chipC: "実行支援",
    sceneLabelA: "連携",
    sceneCaptionA: "教育機関同士の計画と実行を一体で設計",
    sceneLabelB: "設計",
    sceneCaptionB: "役割分担と立ち上げ順序を明確化",
    partnerGridTitle: "パートナー",
    partnerGridBody: "連携タイプを選択いただくと、担当窓口へ適切に接続します。",
    programsLabel: "提供可能プログラム",
    supportLabel: "提供サポート",
    openFormCta: "申請フォームを開く",
    typeHeading: "連携の進め方",
    step1: "1. ヒアリング",
    step1Body: "目的、対象者像、開始時期を整理します。",
    step2: "2. 設計",
    step2Body: "進行手順、責任範囲、連絡体制を定義します。",
    step3: "3. 立ち上げ",
    step3Body: "パイロット運用を開始し、成果を共同で確認します。",
    formTitle: "パートナー連携フォーム",
    formBody: "パートナー種別をご確認のうえ、機関情報をご送信ください。内容に応じた連携案をご提案します。",
    partnerTypeLabel: "パートナー種別",
    partnerProgramLabel: "連携プログラム",
    organizationLabel: "組織名",
    organizationPlaceholder: "組織名を入力",
    contactLabel: "担当者名",
    contactPlaceholder: "氏名を入力",
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@example.com",
    regionLabel: "地域",
    regionPlaceholder: "ウガンダ / 日本 / その他",
    detailLabel: "目的・必要な支援",
    detailPlaceholder: "目的、想定プログラム、時期、必要な支援内容をご記入ください。",
    submitInterest: "送信する",
    newsletterEyebrow: "パートナー情報",
    newsletterTitle: "新しいパートナー機会の情報を受け取る",
    newsletterBody: "最新情報の配信登録、または日本進出・連携に関する無料相談をご予約ください。",
    newsletterCta: "更新情報を受け取る",
    popupConsultationCta: "無料相談を予約する",
    popupClose: "閉じる",
  },
} as const;

const PARTNER_TYPES: Record<SupportedLocale, PartnerType[]> = {
  en: [
    {
      label: "UG Schools",
      value: "ug_institution",
      icon: Landmark,
      summary:
        "Local universities, colleges, and polytechnics coordinating Uganda-based intake, language readiness, and transition support.",
      programs: [
        "Language pathway cohorts (N5-N3) with local delivery",
        "Admissions readiness pipeline and document preparation",
        "Scholarship screening and placement alignment",
      ],
      support: [
        "Program design, curriculum mapping, and co-branded intake",
        "Verification workflows, reporting cadence, and quality checks",
        "On-ground coordination with Bridge advisors",
      ],
    },
    {
      label: "JP Schools",
      value: "jp_institution",
      icon: Building2,
      summary:
        "Japanese universities, colleges, and language schools seeking verified candidate pipelines and structured coordination.",
      programs: [
        "Candidate matching and pre-arrival readiness screening",
        "Language placement alignment with JLPT targets",
        "Onboarding coordination and arrival support",
      ],
      support: [
        "Pipeline management, documentation tracking, and compliance support",
        "Joint intake calendars and application timelines",
        "Feedback loops on cohort performance",
      ],
    },
    {
      label: "Company",
      value: "company",
      icon: BriefcaseBusiness,
      summary:
        "Employers and corporate partners exploring talent pipelines, training programs, and cross-border coordination.",
      programs: [
        "Workforce readiness tracks (language + cultural training)",
        "Specialized intake aligned to role requirements",
        "Talent pipeline management and interview coordination",
      ],
      support: [
        "Skill mapping, readiness assessments, and onboarding design",
        "Partner communications and execution oversight",
        "Ongoing reporting and cohort performance reviews",
      ],
    },
    {
      label: "School",
      value: "school",
      icon: GraduationCap,
      summary: "Secondary schools and academies building long-term Japan pathways and language readiness tracks.",
      programs: [
        "Foundational Japanese curriculum rollout",
        "Student readiness workshops and parent briefings",
        "Study pathway advisories and progression planning",
      ],
      support: [
        "Instructor enablement and study planning frameworks",
        "Progress reporting and guidance on next steps",
        "Coordination with Japan-based partner institutions",
      ],
    },
  ],
  ja: [
    {
      label: "UG教育機関",
      value: "ug_institution",
      icon: Landmark,
      summary: "ウガンダ側の大学・カレッジ・専門学校向け。募集、語学準備、渡航前後の移行支援を一体で設計します。",
      programs: [
        "N5-N3到達を目標にした語学パスウェイ運用",
        "出願準備・書類整備の実行フロー構築",
        "奨学金候補者の選定と進路マッチング",
      ],
      support: [
        "共同プログラム設計とカリキュラム接続",
        "確認業務・進捗レポート・品質管理の標準化",
        "Bridgeアドバイザーによる現地運用支援",
      ],
    },
    {
      label: "JP教育機関",
      value: "jp_institution",
      icon: Building2,
      summary: "日本側の大学・専門学校・日本語学校向け。候補者パイプラインを可視化し、受け入れ業務を標準化します。",
      programs: [
        "候補者マッチングと渡航前準備評価",
        "JLPT目標に合わせた語学配置設計",
        "受け入れ手続きと来日後オンボーディング支援",
      ],
      support: [
        "応募書類・進捗・運用基準の管理支援",
        "募集カレンダーと申請スケジュールの共同運用",
        "コホート成果のレビューと改善ループ設計",
      ],
    },
    {
      label: "企業",
      value: "company",
      icon: BriefcaseBusiness,
      summary: "企業パートナー向け。採用目的に合わせた育成設計と越境運用を実行レベルで支援します。",
      programs: [
        "語学・文化理解を組み合わせた就業準備トラック",
        "職種要件に合わせた選抜・育成設計",
        "人材パイプライン管理と面談調整",
      ],
      support: [
        "スキル定義、適性評価、受け入れ設計",
        "関係者間コミュニケーションと進行管理",
        "実施後のレポートと成果レビュー運用",
      ],
    },
    {
      label: "学校",
      value: "school",
      icon: GraduationCap,
      summary: "中等教育機関・アカデミー向け。日本進学ルートを見据えた基礎育成と保護者連携を支援します。",
      programs: [
        "基礎日本語カリキュラムの導入",
        "進路準備ワークショップと保護者説明会",
        "進学パスの設計と段階別学習計画",
      ],
      support: [
        "教員向け運用ガイドと授業設計支援",
        "学習進捗の可視化と伴走サポート",
        "日本側教育機関との連携調整",
      ],
    },
  ],
};

const PROGRAM_OPTIONS = {
  en: [
    { value: "training_pipeline", label: "Training pipeline" },
    { value: "student_exchange", label: "Student exchange" },
    { value: "language_program", label: "Language program collaboration" },
    { value: "joint_program", label: "Joint institutional program" },
    { value: "business_advisory", label: "Business advisory" },
  ],
  ja: [
    { value: "training_pipeline", label: "育成パイプライン" },
    { value: "student_exchange", label: "学生交流" },
    { value: "language_program", label: "語学プログラム連携" },
    { value: "joint_program", label: "共同教育プログラム" },
    { value: "business_advisory", label: "事業アドバイザリー" },
  ],
} as const;

const PROMPT_COOLDOWN_MS = 1000 * 60 * 60 * 24;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PartnerFormErrors = Partial<
  Record<"organization" | "contact_name" | "email" | "details", string>
>;

const FORM_ERROR_COPY = {
  en: {
    organization: "Enter an organization name (minimum 2 characters).",
    contact_name: "Enter a contact person name (minimum 2 characters).",
    email: "Enter a valid email address.",
    details: "Share details in at least 20 characters so we can scope support correctly.",
  },
  ja: {
    organization: "\u7d44\u7e54\u540d\u30922\u6587\u5b57\u4ee5\u4e0a\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    contact_name: "\u62c5\u5f53\u8005\u540d\u30922\u6587\u5b57\u4ee5\u4e0a\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    email: "\u6709\u52b9\u306a\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    details: "\u8a73\u7d30\u306a\u652f\u63f4\u5185\u5bb9\u3092\u5224\u65ad\u3067\u304d\u308b\u3088\u3046\u300120\u6587\u5b57\u4ee5\u4e0a\u3067\u3054\u8a18\u5165\u304f\u3060\u3055\u3044\u3002",
  },
} as const;

export default function PartnersPage() {
  const { locale } = useSiteLanguage();
  const language: SupportedLocale = locale === "ja" ? "ja" : "en";
  const copy = COPY[language];
  const promptChipLabel =
    language === "ja" ? "\u63d0\u643a\u66f4\u65b0\u60c5\u5831\u3068\u7121\u6599\u76f8\u8ac7" : "Partner updates and free consultation";
  const promptLaterLabel = language === "ja" ? "\u3042\u3068\u3067\u898b\u308b" : "Not now";
  const formErrorCopy = FORM_ERROR_COPY[language];
  const partnerTypes = PARTNER_TYPES[language];
  const programOptions = PROGRAM_OPTIONS[language];
  const [selectedPartnerType, setSelectedPartnerType] = useState("ug_institution");
  const [formErrors, setFormErrors] = useState<PartnerFormErrors>({});
  const suppressionSignals = useMemo(
    () => [
      { key: ENGAGEMENT_SIGNAL_KEYS.formSubmittedAt, withinMs: 1000 * 60 * 60 * 24 * 7 },
    ],
    []
  );
  const {
    modalOpen: showPartnerPrompt,
    chipVisible: showPartnerPromptChip,
    openModal: openPartnerPrompt,
    closeModal: closePartnerPrompt,
    dismissForNow: dismissPartnerPrompt,
  } = useEngagementPrompt({
    key: "partners_prompt_v2",
    cooldownMs: PROMPT_COOLDOWN_MS,
    chipDelayMs: 450,
    autoOpenAfterMs: 900,
    autoOpenScrollRatio: 0.05,
    suppressionSignals,
  });

  useEffect(() => {
    if (!showPartnerPrompt) return;
    trackEvent("engagement_prompt_viewed", { page: "partners" });
  }, [showPartnerPrompt]);

  function trackPrimaryIntent(target: string) {
    markEngagementSignal(ENGAGEMENT_SIGNAL_KEYS.primaryIntentAt);
    trackEvent("primary_intent_click", { page: "partners", target });
  }

  function openPartnerForm(partnerType: string) {
    trackPrimaryIntent("partner_form");
    trackEvent("partner_type_form_open", { partnerType });
    setSelectedPartnerType(partnerType);
    document.getElementById("partner-interest-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearFieldError(field: keyof PartnerFormErrors) {
    setFormErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validatePartnerForm(formData: FormData) {
    const errors: PartnerFormErrors = {};
    const organization = String(formData.get("organization") ?? "").trim();
    const contactName = String(formData.get("contact_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();

    if (organization.length < 2) errors.organization = formErrorCopy.organization;
    if (contactName.length < 2) errors.contact_name = formErrorCopy.contact_name;
    if (!EMAIL_REGEX.test(email)) errors.email = formErrorCopy.email;
    if (details.length < 20) errors.details = formErrorCopy.details;

    return errors;
  }

  function handlePartnerFormSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const errors = validatePartnerForm(formData);
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFormErrors(errors);
      trackEvent("partner_interest_submit_failed", {
        reason: "validation",
        fields: Object.keys(errors).join(","),
      });
      return;
    }

    setFormErrors({});
    trackEvent("partner_interest_submit_started", {
      partnerType: String(formData.get("institution_type") ?? ""),
      program: String(formData.get("partnership_focus") ?? ""),
    });
  }

  function openPartnerPromptFromChip() {
    trackEvent("engagement_prompt_chip_open", { page: "partners" });
    openPartnerPrompt();
  }

  function dismissPartnerPromptWithTracking(action: string) {
    trackEvent("engagement_prompt_dismiss", { page: "partners", action });
    dismissPartnerPrompt();
  }

  return (
    <div className="min-h-screen bg-white">
      <div id="partner-overview" />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        showImages={false}
        hideVisualPanel
        compact
        mobileImageFirst
        mergeWithHeaderOnMobile
        ctas={[
          { label: copy.ctaA, href: "#partner-types", onClick: () => trackEvent("journey_navigation_click", { page: "partners", target: "partner-types" }) },
          { label: copy.ctaB, href: "/consultation", variant: "secondary", onClick: () => trackPrimaryIntent("consultation") },
        ]}
        chips={[copy.chipA, copy.chipB, copy.chipC]}
        scenes={[
          { src: "/images/partners/partners-hero.jpg", label: copy.sceneLabelA, caption: copy.sceneCaptionA },
          { src: "/images/hero/contextual/pathway-counseling.jpg", label: copy.sceneLabelB, caption: copy.sceneCaptionB },
        ]}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 md:justify-start" aria-label="Partners section links">
            <a href="#partner-overview" className="font-medium hover:text-slate-900">
              {copy.navOverview}
            </a>
            <span className="text-slate-400">/</span>
            <a href="#partner-types" className="font-medium hover:text-slate-900">
              {copy.navTypes}
            </a>
            <span className="text-slate-400">/</span>
            <a href="#collaboration-model" className="font-medium hover:text-slate-900">
              {copy.navModel}
            </a>
            <span className="text-slate-400">/</span>
            <a href="#partner-interest-form" className="font-medium hover:text-slate-900">
              {copy.navForm}
            </a>
          </nav>
        </div>
      </section>

      <section id="partner-types" className="py-8 md:py-10">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div className="foundation-grid">
              <div className="foundation-grid__layout">
                <div className="foundation-grid__label">
                  <p className="foundation-grid__title">{copy.partnerGridTitle}</p>
                  <p className="foundation-grid__body">{copy.partnerGridBody}</p>
                </div>
                <div className="foundation-grid__cells md:grid-cols-2">
                  {partnerTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <article
                        key={type.label}
                        className="foundation-grid__cell foundation-grid__cell--media foundation-grid__cell--media-compact"
                        id={`partner-${type.value}`}
                      >
                        <Icon className="size-5 text-slate-700" />
                        <p className="mt-3 text-sm font-semibold text-slate-900">{type.label}</p>
                        <p className="text-sm text-slate-600">{type.summary}</p>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.programsLabel}</p>
                          <ul className="space-y-1 text-sm text-slate-700">
                            {type.programs.map((program) => (
                              <li key={program}>{program}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.supportLabel}</p>
                          <ul className="space-y-1 text-sm text-slate-700">
                            {type.support.map((support) => (
                              <li key={support}>{support}</li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2 h-11 px-5"
                          onClick={() => openPartnerForm(type.value)}
                        >
                          {copy.openFormCta}
                        </Button>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div id="collaboration-model" className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.typeHeading}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{copy.step1}</p>
                  <p className="mt-1">{copy.step1Body}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{copy.step2}</p>
                  <p className="mt-1">{copy.step2Body}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{copy.step3}</p>
                  <p className="mt-1">{copy.step3Body}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div id="partner-interest-form" className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
              <h2 className="text-2xl">{copy.formTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.formBody}</p>
              <form className="mt-6 grid gap-4 md:grid-cols-2" action="/api/partners" method="post" onSubmit={handlePartnerFormSubmit} noValidate>
                <input type="hidden" name="routing_desk" value="partners" />

                <div className="space-y-1.5">
                  <label htmlFor="partner-type" className="text-sm font-medium text-slate-700">
                    {copy.partnerTypeLabel}
                  </label>
                  <select
                    id="partner-type"
                    name="institution_type"
                    value={selectedPartnerType}
                    onChange={(event) => setSelectedPartnerType(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm"
                  >
                    {partnerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-program" className="text-sm font-medium text-slate-700">
                    {copy.partnerProgramLabel}
                  </label>
                  <select
                    id="partner-program"
                    name="partnership_focus"
                    defaultValue="training_pipeline"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm"
                  >
                    {programOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-organization" className="text-sm font-medium text-slate-700">
                    {copy.organizationLabel}
                  </label>
                  <Input
                    id="partner-organization"
                    name="organization"
                    placeholder={copy.organizationPlaceholder}
                    className="h-11 rounded-xl"
                    required
                    aria-invalid={Boolean(formErrors.organization)}
                    aria-describedby={formErrors.organization ? "partner-organization-error" : undefined}
                    onInput={() => clearFieldError("organization")}
                  />
                  {formErrors.organization ? (
                    <p id="partner-organization-error" className="text-xs text-slate-700">
                      {formErrors.organization}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-contact" className="text-sm font-medium text-slate-700">
                    {copy.contactLabel}
                  </label>
                  <Input
                    id="partner-contact"
                    name="contact_name"
                    placeholder={copy.contactPlaceholder}
                    className="h-11 rounded-xl"
                    required
                    aria-invalid={Boolean(formErrors.contact_name)}
                    aria-describedby={formErrors.contact_name ? "partner-contact-error" : undefined}
                    onInput={() => clearFieldError("contact_name")}
                  />
                  {formErrors.contact_name ? (
                    <p id="partner-contact-error" className="text-xs text-slate-700">
                      {formErrors.contact_name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-email" className="text-sm font-medium text-slate-700">
                    {copy.emailLabel}
                  </label>
                  <Input
                    id="partner-email"
                    name="email"
                    type="email"
                    placeholder={copy.emailPlaceholder}
                    className="h-11 rounded-xl"
                    required
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "partner-email-error" : undefined}
                    onInput={() => clearFieldError("email")}
                  />
                  {formErrors.email ? (
                    <p id="partner-email-error" className="text-xs text-slate-700">
                      {formErrors.email}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="partner-region" className="text-sm font-medium text-slate-700">
                    {copy.regionLabel}
                  </label>
                  <Input id="partner-region" name="region" placeholder={copy.regionPlaceholder} className="h-11 rounded-xl" />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="partner-details" className="text-sm font-medium text-slate-700">
                    {copy.detailLabel}
                  </label>
                  <textarea
                    id="partner-details"
                    name="details"
                    required
                    className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                    placeholder={copy.detailPlaceholder}
                    aria-invalid={Boolean(formErrors.details)}
                    aria-describedby={formErrors.details ? "partner-details-error" : undefined}
                    onInput={() => clearFieldError("details")}
                  />
                  {formErrors.details ? (
                    <p id="partner-details-error" className="text-xs text-slate-700">
                      {formErrors.details}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" className="h-11 px-5">
                    {copy.submitInterest}
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {showPartnerPrompt ? (
        <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-4 sm:w-[min(32rem,calc(100vw-2rem))]">
          <div
            role="dialog"
            aria-modal="false"
            aria-label={copy.newsletterEyebrow}
            className="relative w-full border-2 border-black bg-white px-5 pb-5 pt-14 outline outline-1 outline-slate-300 sm:px-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 border-b border-black bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              aria-label={copy.popupClose}
              className="absolute right-2 top-2 inline-flex h-12 w-12 items-center justify-center border border-black text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => dismissPartnerPromptWithTracking("close-icon")}
            >
              <X className="size-7" />
            </button>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.newsletterEyebrow}</p>
            <h2 className="mt-2 text-[1.55rem] leading-tight">{copy.newsletterTitle}</h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">{copy.newsletterBody}</p>
            <div className="mt-5 grid gap-2">
              <Button asChild className="h-12 px-5 text-sm">
                <Link
                  href="/contact"
                  onClick={() => {
                    trackEvent("engagement_prompt_cta_click", { page: "partners", target: "updates" });
                    dismissPartnerPromptWithTracking("primary-cta");
                  }}
                >
                  {copy.newsletterCta}
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-5 text-sm">
                <Link
                  href="/consultation"
                  onClick={() => {
                    trackPrimaryIntent("consultation_popup");
                    trackEvent("engagement_prompt_cta_click", { page: "partners", target: "consultation" });
                    dismissPartnerPromptWithTracking("secondary-cta");
                  }}
                >
                  {copy.popupConsultationCta}
                </Link>
              </Button>
              <button
                type="button"
                className="h-10 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 hover:text-slate-800"
                onClick={() => {
                  trackEvent("engagement_prompt_dismiss", { page: "partners", action: "later" });
                  closePartnerPrompt();
                }}
              >
                {promptLaterLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPartnerPromptChip && !showPartnerPrompt ? (
        <div className="fixed inset-x-3 bottom-3 z-[65] sm:inset-x-auto sm:right-4">
          <button
            type="button"
            className="h-12 w-full border-2 border-black bg-white px-4 text-left text-sm font-semibold text-black outline outline-1 outline-slate-300 hover:bg-neutral-100 sm:w-auto sm:min-w-[260px]"
            onClick={openPartnerPromptFromChip}
          >
            {promptChipLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
