"use client";

import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { useSiteLanguage } from "@/components/site/language-provider";
import { COMPANY_PROFILE } from "@/lib/company-profile";

const COPY = {
  en: {
    eyebrow: "About Bridge Olutindo",
    title: "A bridge between Ugandan potential and Japanese opportunity.",
    description:
      `${COMPANY_PROFILE.name}, operated by ${COMPANY_PROFILE.parentCompany}, provides practical pathways across education, study, business, and cross-border collaboration between Uganda and Japan.`,
    chips: ["Cross-border operations", "Education pathways", "Institutional collaboration"],
    storyTitle: "Our story",
    storyBodyA:
      "Bridge Olutindo was started by Ugandans and partners who had lived and studied in Japan. They saw how difficult it was to find reliable information, trustworthy intermediaries, and programs tailored to Ugandan realities.",
    storyBodyB:
      "The company was built to reduce that friction with clearer guidance, better preparation, and stronger cross-border coordination from first inquiry to execution.",
    mission: "Mission",
    vision: "Vision",
    glance: "At a glance",
    glanceBody: "Core qualities behind our operating model.",
    glanceItems: [
      "Practical understanding of Ugandan and Japanese systems.",
      "One ecosystem across language, study, and advisory support.",
      "Compliance-aware planning and transparent process flow.",
      "Long-term capability building, not short-term transactions.",
    ],
    parentCompany: "Parent company",
    parentBody: "Bridge operates under KUMBA Co., Ltd.",
    parentText: "KUMBA oversees strategy and supports service-quality governance across programs.",
    parentLink: "View KUMBA profile",
    milestonesEyebrow: "Milestones",
    milestonesTitle: "Growing a trusted bridge, phase by phase.",
    milestonesBody: "A practical timeline of how the platform has evolved.",
    phase1: "Launched initial Japanese language cohorts in Uganda with structured class pathways.",
    phase2: "Expanded institutional collaboration and practical planning support for cross-border education.",
    phase3: "Introduced broader advisory services across study planning and Uganda-Japan business coordination.",
    teamEyebrow: "Team",
    teamTitle: "People behind the bridge.",
    teamBody: "Bridge Olutindo operates as a cross-border team with dedicated responsibilities in Uganda and Japan.",
    groups: [
      {
        title: "Leadership & Strategy",
        body: `${COMPANY_PROFILE.contact.managerName} (${COMPANY_PROFILE.contact.managerRole}) leads cross-border execution and partner alignment under ${COMPANY_PROFILE.parentCompany}.`,
      },
      {
        title: "Uganda Program Team",
        body: "Handles learner support, applicant readiness, language and study preparation, and local coordination in Kampala.",
      },
      {
        title: "Japan Partnerships Team",
        body: "Coordinates schools and institutions in Japan to ensure smooth onboarding and continuity.",
      },
      {
        title: "Education Desk",
        body: "Supports language pathways and study planning, including scholarship and admissions guidance.",
      },
      {
        title: "Business Desk",
        body: "Supports Uganda-Japan business advisory engagements and program structuring for institutional partners.",
      },
      {
        title: "Community & Media",
        body: "Runs communication channels and community engagement to keep applicants and partners informed.",
      },
    ],
  },
  ja: {
    eyebrow: "Bridge Olutindoについて",
    title: "ウガンダの可能性と日本の機会をつなぐ実務の架け橋。",
    description:
      `${COMPANY_PROFILE.name}（運営: ${COMPANY_PROFILE.parentCompany}）は、教育・留学・事業連携を横断し、ウガンダと日本をつなぐ実行支援を提供します。`,
    chips: ["越境オペレーション", "教育パスウェイ", "機関連携"],
    storyTitle: "私たちの背景",
    storyBodyA:
      "Bridge Olutindoは、日本での生活や学習経験を持つウガンダ出身メンバーとパートナーによって立ち上げられました。信頼できる情報や適切な支援導線の不足を、現場で強く実感したことが出発点です。",
    storyBodyB:
      "この課題を解消するため、初期相談から実行段階までを一貫して支える、明確で実務的な運用モデルを構築しました。",
    mission: "ミッション",
    vision: "ビジョン",
    glance: "要点",
    glanceBody: "私たちの運用モデルを支える中核要素。",
    glanceItems: [
      "ウガンダと日本双方の制度・現場に対する実務理解。",
      "語学・留学・アドバイザリーを一体で支える体制。",
      "コンプライアンスを意識した透明な進行設計。",
      "短期成果よりも長期的な能力形成を重視。",
    ],
    parentCompany: "運営会社",
    parentBody: "BridgeはKUMBA株式会社の運営体制下で提供されています。",
    parentText: "KUMBAは戦略と品質基準の整備を担い、各プログラムの運用品質を統括します。",
    parentLink: "KUMBAプロフィールを見る",
    milestonesEyebrow: "沿革",
    milestonesTitle: "段階的に築いてきた信頼の基盤。",
    milestonesBody: "サービス拡張の流れを実務視点で整理しています。",
    phase1: "ウガンダで日本語コホートを開始し、段階型学習フローを整備。",
    phase2: "教育機関連携を拡張し、越境進学支援の運用設計を強化。",
    phase3: "留学計画に加え、ウガンダ・日本間の事業連携支援を拡充。",
    teamEyebrow: "チーム",
    teamTitle: "この橋を支えるメンバー。",
    teamBody: "Bridge Olutindoは、ウガンダと日本の両拠点で役割分担された越境チームで運営しています。",
    groups: [
      {
        title: "戦略・統括",
        body: `${COMPANY_PROFILE.contact.managerName}（${COMPANY_PROFILE.contact.managerRole}）が、${COMPANY_PROFILE.parentCompany}の運営方針のもとで越境実行と提携運用を統括します。`,
      },
      {
        title: "ウガンダ運営チーム",
        body: "学習者支援、出願準備、日本語・留学準備、カンパラ現地調整を担当します。",
      },
      {
        title: "日本提携チーム",
        body: "日本側の学校・機関との連携調整と受け入れ導線を担当します。",
      },
      {
        title: "教育デスク",
        body: "語学パスウェイと進学計画、奨学金・出願に関する実務支援を担当します。",
      },
      {
        title: "ビジネスデスク",
        body: "ウガンダ・日本間の事業連携や機関向け運用設計を支援します。",
      },
      {
        title: "コミュニティ・メディア",
        body: "情報発信とコミュニティ連携を通じて、学習者・機関双方の意思決定を支援します。",
      },
    ],
  },
} as const;

export default function AboutPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_8%,rgba(201,93,69,0.11),transparent_40%),linear-gradient(180deg,#f6f8fc_0%,#fdfaf3_45%,#f6f8fc_100%)]">
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        chips={copy.chips}
        scenes={[
          { src: "/images/hero/contextual/pathway-counseling.jpg", label: "Bridge", caption: "Cross-border coordination and operating flow" },
          { src: "/images/partners/partners-hero.jpg", label: "Partners", caption: "Institutional collaboration for long-term outcomes" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <FadeIn>
            <div className="space-y-8 text-slate-700">
              <div>
                <h2>{copy.storyTitle}</h2>
                <p className="mt-4">{copy.storyBodyA}</p>
                <p className="mt-4">{copy.storyBodyB}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{copy.mission}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{COMPANY_PROFILE.mission}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{copy.vision}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{COMPANY_PROFILE.vision}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{copy.glance}</CardTitle>
                  <CardDescription>{copy.glanceBody}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  {copy.glanceItems.map((item) => (
                    <p key={item}>- {item}</p>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.parentCompany}</CardTitle>
                  <CardDescription>{copy.parentBody}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-700">
                  <p>{copy.parentText}</p>
                  <Link href={COMPANY_PROFILE.contact.kumbaLink} target="_blank" className="font-semibold text-brand-700 hover:underline">
                    {copy.parentLink}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white/70 py-14 md:py-18">
        <div className="container mx-auto space-y-8 px-4">
          <FadeIn>
            <SectionHeading
              eyebrow={copy.milestonesEyebrow}
              title={copy.milestonesTitle}
              description={copy.milestonesBody}
            />
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { phase: "Phase 1", body: copy.phase1, color: "border-brand-red" },
              { phase: "Phase 2", body: copy.phase2, color: "border-brand-blue" },
              { phase: "Phase 3", body: copy.phase3, color: "border-brand-orange" },
            ].map((item, index) => (
              <FadeIn key={item.phase} delay={0.04 * index}>
                <article className={`rounded-2xl border ${item.color} bg-white p-5`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{item.phase}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto space-y-8 px-4">
          <FadeIn>
            <SectionHeading
              eyebrow={copy.teamEyebrow}
              title={copy.teamTitle}
              description={copy.teamBody}
            />
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.groups.map((group, index) => (
              <FadeIn key={group.title} delay={0.03 * (index % 5)}>
                <Card>
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700">{group.body}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
