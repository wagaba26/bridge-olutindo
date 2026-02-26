"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { PageHero } from "@/components/site/page-hero";
import { useSiteLanguage } from "@/components/site/language-provider";
import { COMPANY_PROFILE } from "@/lib/company-profile";
import { ALLOWED_CONSULTATION_DESKS } from "@/lib/service-policy";

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Talk to the Bridge Olutindo team.",
    description: "Whether you are a learner, parent, or institutional partner, share your context and we will route you to the right desk.",
    chips: ["Response target: 24-72 hours", "Uganda and Japan support desks", "Free consultation available"],
    messageTitle: "Send a message",
    fullName: "Full name",
    fullNamePlaceholder: "Your name",
    email: "Email",
    phone: "Phone (optional)",
    routeDesk: "Route to desk",
    inquiryType: "Inquiry type",
    inquiryHint: "We route this directly to the responsible desk.",
    message: "Message",
    messagePlaceholder: "Share your goals, current stage, and what support you need.",
    send: "Send message",
    responseTime: "Response time: usually within 24-72 business hours.",
    callTitle: "Prefer a call?",
    callBody: "Book a free desk-specific consultation and pick the best slot for your team.",
    callCta: "Schedule free consultation",
    offices: "Offices",
    ugOfficeTitle: "Kampala, Uganda",
    ugOfficeBody: "Primary learner and program support coordination hub.",
    jpOfficeTitle: "Tokyo, Japan",
    jpOfficeBody: "Partnership and Japan-side coordination support desk.",
    directContacts: "Direct contacts",
    deskLabels: {
      language: "Language Desk",
      study: "Study and Exchange Desk",
      partners: "Partnerships Desk",
      business: "Business Consultancy Desk",
    },
    inquiryOptions: {
      general: "General Question",
      admissions: "Admissions Planning",
      language_programs: "Language Programs",
      partnership: "Partnership Request",
      business_consulting: "Business Consulting",
      technical_support: "Portal / Technical Support",
    },
  },
  ja: {
    eyebrow: "お問い合わせ",
    title: "Bridge Olutindoチームに相談する。",
    description: "学習者・保護者・機関パートナーのいずれでも、状況を共有いただければ適切な窓口へ接続します。",
    chips: ["回答目安: 24-72時間", "ウガンダ・日本の両窓口", "無料相談対応"],
    messageTitle: "お問い合わせを送信",
    fullName: "氏名",
    fullNamePlaceholder: "お名前",
    email: "メールアドレス",
    phone: "電話番号（任意）",
    routeDesk: "窓口選択",
    inquiryType: "問い合わせ種別",
    inquiryHint: "内容に応じて担当窓口へ直接ルーティングします。",
    message: "お問い合わせ内容",
    messagePlaceholder: "目的、現在の状況、必要な支援内容をご記入ください。",
    send: "送信する",
    responseTime: "回答目安: 通常24-72営業時間以内。",
    callTitle: "通話で相談しますか？",
    callBody: "窓口別の無料相談を予約し、ご都合に合う時間を選択できます。",
    callCta: "無料相談を予約",
    offices: "拠点情報",
    ugOfficeTitle: "カンパラ（ウガンダ）",
    ugOfficeBody: "学習者支援とプログラム調整の主要拠点。",
    jpOfficeTitle: "東京（日本）",
    jpOfficeBody: "提携調整と日本側運用の支援窓口。",
    directContacts: "直接連絡先",
    deskLabels: {
      language: "語学デスク",
      study: "留学・交流デスク",
      partners: "提携デスク",
      business: "ビジネス相談デスク",
    },
    inquiryOptions: {
      general: "一般相談",
      admissions: "出願計画",
      language_programs: "語学プログラム",
      partnership: "提携依頼",
      business_consulting: "ビジネス相談",
      technical_support: "ポータル / 技術サポート",
    },
  },
} as const;

export default function ContactPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_6%,rgba(200,169,107,0.13),transparent_42%),linear-gradient(180deg,#f6f8fc_0%,#fdfaf3_45%,#f6f8fc_100%)]">
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        chips={copy.chips}
        scenes={[
          { src: "/images/hero/contextual/pathway-counseling.jpg", label: "Contact", caption: "Structured routing across support desks" },
          { src: "/images/hero/contextual/digital-guidance.jpg", label: "Flow", caption: "Clear intake and follow-up process" },
        ]}
      />

      <section className="py-10 md:py-12">
        <div className="container mx-auto grid items-start gap-8 px-4 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <FadeIn>
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>{copy.messageTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="/api/contact" method="post">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.fullName}</label>
                      <Input name="full_name" placeholder={copy.fullNamePlaceholder} required />
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.email}</label>
                      <Input name="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.phone}</label>
                      <Input name="phone" placeholder="+256..." />
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.routeDesk}</label>
                      <Select name="routing_desk" defaultValue={ALLOWED_CONSULTATION_DESKS[0] ?? "language"} className="h-11 rounded-xl">
                        {ALLOWED_CONSULTATION_DESKS.map((desk) => (
                          <option key={desk} value={desk}>
                            {copy.deskLabels[desk as keyof typeof copy.deskLabels] ?? desk}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">{copy.inquiryType}</label>
                    <Select name="inquiry_type" defaultValue="general" className="h-11 rounded-xl">
                      <option value="general">{copy.inquiryOptions.general}</option>
                      <option value="admissions">{copy.inquiryOptions.admissions}</option>
                      <option value="language_programs">{copy.inquiryOptions.language_programs}</option>
                      <option value="partnership">{copy.inquiryOptions.partnership}</option>
                      <option value="business_consulting">{copy.inquiryOptions.business_consulting}</option>
                      <option value="technical_support">{copy.inquiryOptions.technical_support}</option>
                    </Select>
                    <p className="text-xs text-slate-500">{copy.inquiryHint}</p>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">{copy.message}</label>
                    <textarea
                      className="min-h-[150px] w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      name="message"
                      placeholder={copy.messagePlaceholder}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-11 rounded-xl px-5">
                    {copy.send}
                  </Button>
                  <p className="text-xs text-muted-foreground">{copy.responseTime}</p>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="space-y-4 md:sticky md:top-24">
            <FadeIn delay={0.04}>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.callTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-700">
                  <p>{copy.callBody}</p>
                  <Button asChild variant="secondary" className="h-11 w-full rounded-xl">
                    <Link href="/consultation">{copy.callCta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.offices}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4" />
                    <div>
                      <p className="font-medium text-slate-900">{copy.ugOfficeTitle}</p>
                      <p>{copy.ugOfficeBody}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4" />
                    <div>
                      <p className="font-medium text-slate-900">{copy.jpOfficeTitle}</p>
                      <p>{copy.jpOfficeBody}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.directContacts}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{COMPANY_PROFILE.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Uganda: {COMPANY_PROFILE.contact.ugandaPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Japan / WhatsApp: {COMPANY_PROFILE.contact.japanPhoneWhatsApp}</span>
                  </div>
                  <p className="pt-2 font-medium text-slate-900">
                    {COMPANY_PROFILE.contact.managerName} - {COMPANY_PROFILE.contact.managerRole}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
