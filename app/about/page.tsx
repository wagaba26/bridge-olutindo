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
    teamEyebrow: "Leadership",
    teamTitle: "Leadership team and operating units.",
    teamBody:
      "Bridge Olutindo's leadership is headed by Ssenkumba Jacob (CEO, KUMBA Corporation), with cross-border execution managed across Uganda and Japan.",
    imageSlotLabel: "Image slot",
    members: [
      {
        name: "SSENKUMBA JACOB",
        role: "Chief Executive Officer, KUMBA Corporation",
        body: "Ssenkumba Jacob is the overall head of the leadership structure and provides strategic direction for BRIDGE operations and long-term Uganda-Japan growth.",
      },
      {
        name: COMPANY_PROFILE.contact.managerName,
        role: `${COMPANY_PROFILE.contact.managerRole}, BRIDGE`,
        body: `${COMPANY_PROFILE.contact.managerName} serves as General Manager and leads day-to-day cross-border delivery, partner execution, and quality control under ${COMPANY_PROFILE.parentCompany}.`,
      },
      {
        name: "Mr. Wagaba Emmanuel",
        role: "Country Manager, Uganda",
        body: "Mr. Wagaba Emmanuel is the Country Manager for BRIDGE in Uganda, specializing in social work, program coordination, and digital marketing. He established the organization's first African office and leads stakeholder coordination and growth execution.",
      },
      {
        name: "Mr. Sebadduka Ronald",
        role: "Human Resource Manager",
        body: "Mr. Sebadduka Ronald is the Human Resource Manager and partner focused on organizational growth and employee development. Based in Fukuoka, he supports a strong and efficient team structure across operations.",
      },
    ],
    ceoEyebrow: "CEO Message",
    ceoTitle: "Message from the CEO",
    ceoLead:
      "At KUMBA Corporation, we strive to serve as a bridge connecting Japan and the world. Our diverse activities include foreign language education, international exchange events, music performances, the \"BRIDGE\" project, and the promotion of fair trade coffee.",
    ceoBody:
      "Through music, travel, business support, and sustainable practices like fair trade coffee, we aim to foster connections that transcend cultural boundaries and contribute to a brighter, more sustainable future for all. We will continue to work tirelessly to meet your expectations and make a positive impact.",
    ceoCompany: "KUMBA Corporation",
    ceoRole: "CEO",
    ceoName: "SSENKUMBA JACOB",
    unitsTitle: "Program and support units",
    groups: [
      {
        title: "Uganda Program Team",
        body: "Learner support, applicant readiness, language and study preparation, and local coordination in Kampala.",
      },
      {
        title: "Japan Partnerships Team",
        body: "Coordination with schools and institutions in Japan for onboarding, continuity, and partner communication.",
      },
      {
        title: "Education Desk",
        body: "Language pathways and study planning support, including scholarship and admissions guidance.",
      },
      {
        title: "Business Desk",
        body: "Uganda-Japan business advisory support and program structuring for institutional and private-sector partners.",
      },
      {
        title: "Community & Media",
        body: "Public communication, awareness content, and community engagement for learners and partners.",
      },
      {
        title: "Operations Support",
        body: "Cross-functional execution support across documents, partner timelines, and service quality control.",
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
    teamEyebrow: "リーダーシップ",
    teamTitle: "経営チームと運用体制。",
    teamBody:
      "Bridge Olutindoは、KUMBA株式会社CEOのSSENKUMBA JACOB氏をトップとし、ウガンダと日本の越境体制で教育・連携支援を実行しています。",
    imageSlotLabel: "画像差し替え枠",
    members: [
      {
        name: "SSENKUMBA JACOB",
        role: "Chief Executive Officer, KUMBA Corporation",
        body: "SSENKUMBA JACOB氏はリーダーシップ体制の最高責任者として、BRIDGEの戦略方針とウガンダ・日本間の中長期成長を統括します。",
      },
      {
        name: COMPANY_PROFILE.contact.managerName,
        role: `${COMPANY_PROFILE.contact.managerRole}（BRIDGE）`,
        body: `${COMPANY_PROFILE.contact.managerName}はゼネラルマネージャーとして、${COMPANY_PROFILE.parentCompany}の運営方針に基づき、日々の越境実行、提携運用、品質管理を統括します。`,
      },
      {
        name: "Mr. Wagaba Emmanuel",
        role: "Country Manager, Uganda",
        body: "ワガバ・エマニュエル氏は、BRIDGEウガンダのカントリーマネージャーとして、ソーシャルワーク、プログラム調整、デジタルマーケティングに精通しています。アフリカ初のオフィス設立を主導し、関係者連携と運用成長を推進しています。",
      },
      {
        name: "Mr. Sebadduka Ronald",
        role: "Human Resource Manager",
        body: "セバドゥカ・ロナルド氏は、人事マネージャー兼パートナーとして、組織の成長と人材育成を担っています。福岡拠点での専門知見を活かし、強く効率的なチーム体制づくりを支えています。",
      },
    ],
    ceoEyebrow: "CEOメッセージ",
    ceoTitle: "代表メッセージ",
    ceoLead:
      "KUMBA株式会社は、日本と世界をつなぐ架け橋として、外国語教育、国際交流イベント、音楽活動、「BRIDGE」プロジェクト、そしてフェアトレードコーヒーの普及など、多様な取り組みを行っています。",
    ceoBody:
      "音楽、旅、ビジネス支援、フェアトレードコーヒーのような持続可能な実践を通じて、文化の境界を越えるつながりを育み、より明るく持続可能な未来に貢献していきます。これからも皆さまの期待に応え、社会に前向きな価値を生み出すために尽力してまいります。",
    ceoCompany: "KUMBA株式会社",
    ceoRole: "代表取締役社長",
    ceoName: "SSENKUMBA JACOB",
    unitsTitle: "プログラム・運用ユニット",
    groups: [
      {
        title: "ウガンダ運営チーム",
        body: "学習者支援、出願準備、日本語・留学準備、カンパラ現地調整を担当します。",
      },
      {
        title: "日本提携チーム",
        body: "日本側の学校・機関との連携調整、受け入れ導線、提携先コミュニケーションを担当します。",
      },
      {
        title: "教育デスク",
        body: "語学パスウェイと進学計画支援、奨学金・出願に関する実務を担当します。",
      },
      {
        title: "ビジネスデスク",
        body: "ウガンダ・日本間の事業連携支援と、機関・民間向けの運用設計を担当します。",
      },
      {
        title: "コミュニティ・メディア",
        body: "情報発信、認知向上コンテンツ、コミュニティ連携を通じて意思決定を支援します。",
      },
      {
        title: "オペレーションサポート",
        body: "書類、提携進行、サービス品質管理など、横断的な実行支援を担当します。",
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
        compact
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
            {copy.members.map((member, index) => (
              <FadeIn key={member.name} delay={0.03 * (index % 4)}>
                <Card className="h-full">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {copy.imageSlotLabel}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-700">{member.role}</p>
                      <p className="mt-3 text-sm text-slate-700">{member.body}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.05}>
            <Card>
              <CardHeader>
                <CardDescription>{copy.ceoEyebrow}</CardDescription>
                <CardTitle>{copy.ceoTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
                <div className="space-y-4 text-sm text-slate-700">
                  <p>{copy.ceoLead}</p>
                  <p>{copy.ceoBody}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {copy.imageSlotLabel}
                  </div>
                  <div className="text-right text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">{copy.ceoCompany}</p>
                    <p>{copy.ceoRole}</p>
                    <p className="font-semibold">{copy.ceoName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.unitsTitle}</h3>
          </div>
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
