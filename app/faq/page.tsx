"use client";

import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useSiteLanguage } from "@/components/site/language-provider";

const FAQ_COPY = {
  en: {
    eyebrow: "FAQs",
    title: "Answers to common questions about Uganda-Japan pathways.",
    description: "Practical explanations on how language, study, advisory, and partnership workflows operate.",
    askDirect: "Ask a direct question",
    book: "Book free consultation",
    helpEyebrow: "Still need help?",
    helpTitle: "Get advice for your exact pathway.",
    helpBody:
      "If your question is situation-specific, the team can guide your next step for language, study planning, or institutional collaboration.",
    contactTeam: "Contact Bridge team",
    schedule: "Schedule free consultation",
    groups: [
      {
        id: "general",
        title: "General",
        items: [
          {
            q: "What is Bridge Olutindo?",
            a: "Bridge Olutindo connects Uganda and Japan through language education, study planning, advisory support, and institutional partnerships.",
          },
          {
            q: "Does Bridge guarantee outcomes, visas, or admissions?",
            a: "No. Outcomes depend on eligibility, language level, partner requirements, and decisions made by official authorities.",
          },
        ],
      },
      {
        id: "language",
        title: "Language Programs",
        items: [
          {
            q: "Who can join the Japanese language program?",
            a: "Anyone committed to learning Japanese and meeting program requirements can apply. Some tracks are tailored to study-focused learners.",
          },
          {
            q: "What is JLCAT?",
            a: "JLCAT is an online Japanese language assessment that issues a score report. Bridge prepares learners for JLCAT but does not administer the test.",
          },
          {
            q: "Can I join a program midway?",
            a: "Yes, depending on available cohort structure and your current level. Make-up support may be required.",
          },
        ],
      },
      {
        id: "payments",
        title: "Payments",
        items: [
          {
            q: "What payment methods are accepted?",
            a: "Uganda payments are currently supported via mobile money, with additional methods added as available.",
          },
          {
            q: "Are fees refundable?",
            a: "In most cases, fees are non-refundable once a program has started. Limited exceptions may be reviewed case by case.",
          },
          {
            q: "What currency is used?",
            a: "Fees are listed in USD for consistency. Indicative UGX conversion may be provided for convenience.",
          },
        ],
      },
      {
        id: "study",
        title: "Study & Exchange",
        items: [
          {
            q: "Does Bridge support university admissions?",
            a: "Bridge provides preparation, planning, and coordination support. Admissions decisions remain with schools and institutions.",
          },
          {
            q: "Are scholarships guaranteed?",
            a: "No. Scholarships are externally decided and depend on each institution's criteria.",
          },
        ],
      },
      {
        id: "partners",
        title: "Partners",
        items: [
          {
            q: "Who can become a Bridge partner?",
            a: "Ugandan and Japanese institutions, schools, universities, companies, NGOs, sponsors, and support service providers.",
          },
          {
            q: "Is there a standard partner fee?",
            a: "Partnership terms vary by scope, structure, and engagement model.",
          },
        ],
      },
    ],
  },
  ja: {
    eyebrow: "よくある質問",
    title: "ウガンダ・日本間の進路設計で、よくいただく質問への回答。",
    description: "語学、留学、アドバイザリー、提携運用の進め方を実務ベースで整理しています。",
    askDirect: "直接質問する",
    book: "無料相談を予約",
    helpEyebrow: "まだ不明点がありますか？",
    helpTitle: "あなたの状況に合わせて個別にご案内します。",
    helpBody:
      "個別事情がある場合は、語学・留学計画・機関連携の次の一手をチームが一緒に整理します。",
    contactTeam: "Bridgeチームへ連絡",
    schedule: "無料相談を予約",
    groups: [
      {
        id: "general",
        title: "全般",
        items: [
          {
            q: "Bridge Olutindoとは？",
            a: "Bridge Olutindoは、語学教育、留学計画、実務支援、機関連携を通じてウガンダと日本をつなぐ運営チームです。",
          },
          {
            q: "ビザ・合格・進学結果は保証されますか？",
            a: "保証はできません。結果は本人条件、語学力、提携機関要件、行政判断に依存します。",
          },
        ],
      },
      {
        id: "language",
        title: "語学プログラム",
        items: [
          {
            q: "日本語プログラムは誰でも参加できますか？",
            a: "学習意欲があり、各プログラム要件を満たす方は参加可能です。進学志向向けトラックもあります。",
          },
          {
            q: "JLCATとは？",
            a: "JLCATはオンライン日本語評価試験です。Bridgeは準備支援を行いますが、試験実施機関ではありません。",
          },
          {
            q: "途中参加はできますか？",
            a: "空き枠と現在レベルに応じて可能です。必要に応じて補講対応をご案内します。",
          },
        ],
      },
      {
        id: "payments",
        title: "支払い",
        items: [
          {
            q: "利用可能な支払い方法は？",
            a: "現在は主にウガンダ側のモバイルマネー対応です。順次手段を拡張しています。",
          },
          {
            q: "返金は可能ですか？",
            a: "原則として開始後は返金不可です。例外は個別審査します。",
          },
          {
            q: "通貨表示は？",
            a: "基本はUSD表示で統一し、必要に応じて参考UGX換算を提示します。",
          },
        ],
      },
      {
        id: "study",
        title: "留学・交流",
        items: [
          {
            q: "大学出願支援はありますか？",
            a: "準備・計画・運用支援を提供しますが、最終合否判断は各学校・機関が行います。",
          },
          {
            q: "奨学金は保証されますか？",
            a: "保証はありません。奨学金は各機関の審査基準に基づき決定されます。",
          },
        ],
      },
      {
        id: "partners",
        title: "提携",
        items: [
          {
            q: "どのような組織が提携可能ですか？",
            a: "ウガンダ・日本の学校、大学、企業、NGO、スポンサー、支援事業者などが対象です。",
          },
          {
            q: "提携費用は固定ですか？",
            a: "固定ではありません。範囲、体制、連携モデルに応じて設計します。",
          },
        ],
      },
    ],
  },
} as const;

export default function FaqPage() {
  const { locale } = useSiteLanguage();
  const copy = FAQ_COPY[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_8%,rgba(27,59,102,0.10),transparent_42%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_45%,#f7f9fd_100%)]">
      <section className="border-b border-slate-300/70 bg-white/88">
        <div className="container mx-auto space-y-5 px-4 py-12 md:py-16">
          <FadeIn>
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-2 text-xs">
              {copy.groups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex h-9 items-center rounded-full border border-slate-300 bg-white px-3 font-medium text-slate-700"
                >
                  {group.title}
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="/contact">{copy.askDirect}</Link>
              </Button>
              <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
                <Link href="/consultation">{copy.book}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-10 px-4">
          {copy.groups.map((group, groupIndex) => (
            <FadeIn key={group.id} delay={0.03 * (groupIndex % 4)}>
              <div id={group.id} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl md:text-3xl">{group.title}</h2>
                <Accordion type="single" collapsible className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {group.items.map((item) => (
                    <AccordionItem key={item.q} value={item.q}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.helpEyebrow}</p>
              <h2 className="mt-2 text-2xl">{copy.helpTitle}</h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">{copy.helpBody}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/contact">{copy.contactTeam}</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/consultation">{copy.schedule}</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
