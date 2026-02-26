"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { useSiteLanguage } from "@/components/site/language-provider";

const COPY = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: Feb 07, 2026",
    intro: "This policy explains what data we collect, why we collect it, and how we handle information across Uganda and Japan service operations.",
    scopeTitle: "Scope",
    scopeBody: "Applies to language, study, consultancy, and partnership services.",
    regionsTitle: "Data regions",
    regionsBody: "Data may be processed in Uganda and Japan for service delivery.",
    contactTitle: "Contact path",
    contactBody: "Use the official contact channels on this website for requests.",
    sections: [
      {
        h: "1. Introduction",
        b: "Bridge Olutindo (\"Bridge\", \"we\", \"us\") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, store, and share information when you use our services.",
      },
      {
        h: "2. Information We Collect",
        b: "We may collect personal, program-related, and technical information including contact details, educational background, payment-related records through approved providers, and usage analytics.",
      },
      {
        h: "3. How We Use Your Information",
        b: "We use information to deliver services, communicate updates, assess eligibility, process payments, and improve operations.",
      },
      {
        h: "4. Data Sharing",
        b: "We share limited data only when necessary with partner institutions, approved providers, or authorities where required by law. We do not sell personal data.",
      },
      {
        h: "5. International Data Transfers",
        b: "Because Bridge supports operations across Uganda and Japan, data may be processed in either country with reasonable safeguards.",
      },
      {
        h: "6. Data Retention",
        b: "We keep personal data only for as long as needed for service delivery and legal obligations.",
      },
      {
        h: "7. Your Rights",
        b: "Depending on applicable law, you may request access, correction, deletion, or consent withdrawal.",
      },
      {
        h: "8. Data Security",
        b: "We use reasonable administrative and technical safeguards, but no system can be fully guaranteed.",
      },
      {
        h: "9. Children's Privacy",
        b: "Services are primarily intended for users aged 18 and above, except institutionally approved programs.",
      },
      {
        h: "10. Changes to This Policy",
        b: "We may update this policy from time to time. Changes are posted on this page.",
      },
      {
        h: "11. Contact",
        b: "For privacy-related inquiries, use the official contact channels listed on the website.",
      },
    ],
  },
  ja: {
    eyebrow: "法務",
    title: "プライバシーポリシー",
    updated: "最終更新日: 2026年2月7日",
    intro: "本ポリシーは、収集するデータの種類、利用目的、ウガンダ・日本間での取扱い方法を説明します。",
    scopeTitle: "適用範囲",
    scopeBody: "語学、留学、コンサルティング、提携支援に適用されます。",
    regionsTitle: "データ処理地域",
    regionsBody: "サービス提供のため、ウガンダおよび日本で処理される場合があります。",
    contactTitle: "問い合わせ経路",
    contactBody: "開示・訂正等の申請は本サイトの公式連絡窓口をご利用ください。",
    sections: [
      {
        h: "1. はじめに",
        b: "Bridge Olutindo（以下「Bridge」）は、個人情報保護を重視しています。本ポリシーは、サービス利用時の収集・利用・保管・共有について定めます。",
      },
      {
        h: "2. 収集する情報",
        b: "氏名、連絡先、学習・出願関連情報、決済に関する情報（認可プロバイダー経由）、利用分析データ等を収集する場合があります。",
      },
      {
        h: "3. 利用目的",
        b: "サービス提供、連絡対応、適格性確認、決済処理、運用品質の改善に利用します。",
      },
      {
        h: "4. 情報共有",
        b: "必要最小限の範囲で提携機関、認可業務委託先、法令に基づく当局に共有する場合があります。個人情報の販売は行いません。",
      },
      {
        h: "5. 国際データ移転",
        b: "ウガンダ・日本間で運用するため、いずれかの国でデータ処理される場合があります。合理的な保護措置を講じます。",
      },
      {
        h: "6. 保管期間",
        b: "サービス提供および法令順守に必要な期間のみ保管します。",
      },
      {
        h: "7. 利用者の権利",
        b: "適用法に基づき、開示、訂正、削除、同意撤回を請求できる場合があります。",
      },
      {
        h: "8. セキュリティ",
        b: "合理的な管理的・技術的対策を講じますが、完全な安全性を保証するものではありません。",
      },
      {
        h: "9. 未成年者の利用",
        b: "原則18歳以上を対象とします（機関承認プログラムを除く）。",
      },
      {
        h: "10. 改定",
        b: "本ポリシーは必要に応じて更新され、更新内容は本ページに掲載します。",
      },
      {
        h: "11. お問い合わせ",
        b: "プライバシーに関するお問い合わせは公式連絡窓口をご利用ください。",
      },
    ],
  },
} as const;

export default function PrivacyPage() {
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
              <p className="font-semibold text-slate-900">{copy.regionsTitle}</p>
              <p className="mt-1">{copy.regionsBody}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">{copy.contactTitle}</p>
              <p className="mt-1">{copy.contactBody}</p>
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
