"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { useSiteLanguage } from "@/components/site/language-provider";

const COPY = {
  en: {
    eyebrow: "Legal",
    title: "Terms of Service",
    updated: "Last updated: Feb 07, 2026",
    intro:
      "These terms explain how Bridge services work, your responsibilities, and our operating boundaries across Uganda and Japan pathways.",
    scopeTitle: "Service scope",
    scopeBody: "Language education, advisory support, and institutional coordination.",
    noGuaranteeTitle: "No guarantees",
    noGuaranteeBody: "Visas, admissions, and scholarships depend on external decisions.",
    lawTitle: "Applicable law",
    lawBody: "Operates under relevant Uganda and Japan legal frameworks.",
    sections: [
      { h: "1. Acceptance of Terms", b: "By accessing or using Bridge Olutindo services, you agree to these Terms of Service." },
      { h: "2. Scope of Services", b: "Bridge provides Japanese language education, advisory support, institutional coordination, and pathway information. Bridge does not guarantee visas, admissions, or scholarship outcomes." },
      { h: "3. Eligibility", b: "You must be at least 18 years old unless otherwise stated, provide accurate information, and comply with program rules." },
      { h: "4. User Responsibilities", b: "Users must attend required sessions, follow conduct standards, avoid misuse of materials, and avoid misrepresentation." },
      { h: "5. Fees and Payments", b: "Fees follow program terms. Late payments may suspend access. Fees are generally non-refundable once service starts." },
      { h: "6. Intellectual Property", b: "Program materials, website content, and brand assets are owned by Bridge or licensors and may not be reused without permission." },
      { h: "7. Limitation of Liability", b: "Bridge is not liable for visa denials, admissions decisions, or indirect and third-party losses." },
      { h: "8. Termination", b: "Bridge may suspend or terminate access where terms are violated or misconduct occurs." },
      { h: "9. Governing Law", b: "These terms are governed by applicable laws of Uganda and, where relevant, Japan." },
      { h: "10. Changes to Terms", b: "Bridge may update these terms. Continued use of services means acceptance of updates." },
      { h: "11. Contact", b: "For terms-related inquiries, use official contact channels on the website." },
    ],
  },
  ja: {
    eyebrow: "法務",
    title: "利用規約",
    updated: "最終更新日: 2026年2月7日",
    intro:
      "本規約は、Bridgeサービスの提供範囲、利用者責任、ウガンダ・日本間運用における基本条件を定めます。",
    scopeTitle: "サービス範囲",
    scopeBody: "語学教育、実務支援、機関連携調整。",
    noGuaranteeTitle: "保証について",
    noGuaranteeBody: "ビザ・合格・奨学金は外部審査結果に依存します。",
    lawTitle: "準拠法",
    lawBody: "ウガンダおよび日本の関連法令に基づいて運用します。",
    sections: [
      { h: "1. 規約への同意", b: "Bridge Olutindoのサービスを利用することで、本利用規約に同意したものとみなします。" },
      { h: "2. サービス内容", b: "Bridgeは日本語教育、実務支援、機関連携、進路情報提供を行います。ビザ・合否・奨学金の結果保証は行いません。" },
      { h: "3. 利用資格", b: "原則18歳以上（例外規定あり）で、正確な情報提供および各プログラム規定の遵守が必要です。" },
      { h: "4. 利用者の責任", b: "必要な参加・準備、適切な行動、教材やシステムの不正利用防止、外部での不適切な表示防止が求められます。" },
      { h: "5. 料金・支払い", b: "料金は各プログラム条件に従います。未払い・遅延時は一時停止となる場合があります。原則開始後返金不可です。" },
      { h: "6. 知的財産", b: "教材、サイトコンテンツ、ブランド資産の権利はBridgeまたはライセンサーに帰属し、無断利用はできません。" },
      { h: "7. 免責", b: "ビザ結果、入学判断、間接損害、第三者損害についてBridgeは責任を負いません。" },
      { h: "8. 利用停止・終了", b: "規約違反や不正行為が確認された場合、利用停止または終了措置を行う場合があります。" },
      { h: "9. 準拠法", b: "本規約はウガンダ法および必要に応じて日本法に準拠します。" },
      { h: "10. 規約変更", b: "本規約は必要に応じて改定されます。継続利用により改定内容に同意したものとみなされます。" },
      { h: "11. お問い合わせ", b: "規約に関する質問は公式連絡窓口をご利用ください。" },
    ],
  },
} as const;

export default function TermsPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-4 px-4 py-12 md:py-16">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.updated} />
          <p className="max-w-3xl text-sm text-slate-600">{copy.intro}</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-3xl space-y-8 px-4 text-sm leading-7 text-slate-700 md:text-base">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 md:grid-cols-3 md:text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">{copy.scopeTitle}</p>
              <p className="mt-1">{copy.scopeBody}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">{copy.noGuaranteeTitle}</p>
              <p className="mt-1">{copy.noGuaranteeBody}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">{copy.lawTitle}</p>
              <p className="mt-1">{copy.lawBody}</p>
            </div>
          </div>

          {copy.sections.map((section) => (
            <div key={section.h}>
              <h2>{section.h}</h2>
              <p>{section.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
