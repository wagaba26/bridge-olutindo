"use client";

import { useMemo, useState, useEffect } from "react";

import { useSiteLanguage } from "@/components/site/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type SupportedLocale = "en" | "ja";

type DeskOption = {
  value: string;
  label: string;
};

const COPY = {
  en: {
    heroEyebrow: "Consultation",
    heroTitle: "Book a free consultation with the right Bridge desk.",
    heroDescription: "Choose your area of interest, then pick a date and available time slot that fits your schedule.",
    heroChips: ["Language desk", "Study desk", "Partnerships desk", "Business desk"],
    sceneA: "Advisor desk",
    sceneACaption: "Route your inquiry to language, study, partners, or business desks",
    sceneB: "Scheduling",
    sceneBCaption: "Pick an available slot and lock your next practical step",
    requestTitle: "Consultation request",
    chooseDesk: "Choose desk",
    month: "Month",
    day: "Day",
    timezone: "Time zone",
    timezoneValue: "Africa/Kampala (UG time)",
    slots: "Available time slots",
    noSlots: "No available slots for this desk/date. Pick another date or contact us directly.",
    loadingSlots: "Checking availability...",
    liveSlots: "Live availability from Google Calendar.",
    fallbackSlots: "Showing fallback schedule. Live calendar sync activates once configured.",
    fullName: "Full name",
    email: "Email",
    phone: "Phone or WhatsApp",
    notes: "Notes (optional)",
    notesPlaceholder: "What would you like to discuss during the consultation?",
    submit: "Confirm free consultation",
    bookingTitle: "Booking details",
    bookingDesk: "Desk",
    bookingDate: "Date",
    bookingTime: "Time",
    selectDate: "Select a date",
    selectSlot: "Select a slot",
    fee: "Consultation fee: Free",
    bookingHelp: "Your selected slot is reserved after your request is confirmed by our team.",
    desks: [
      { value: "language", label: "Language Desk" },
      { value: "study", label: "Study and Exchange Desk" },
      { value: "partners", label: "Partnerships Desk" },
      { value: "business", label: "Business Consultancy Desk" },
    ] satisfies DeskOption[],
  },
  ja: {
    heroEyebrow: "無料相談",
    heroTitle: "目的に合ったBridge窓口へ、無料相談を予約する。",
    heroDescription: "相談テーマを選び、都合の良い日程と空き時間を指定してください。",
    heroChips: ["語学デスク", "留学デスク", "提携デスク", "ビジネスデスク"],
    sceneA: "相談窓口",
    sceneACaption: "語学・留学・提携・ビジネスの担当へ適切に接続",
    sceneB: "日程調整",
    sceneBCaption: "空き枠を選んで、次の実務ステップを確定",
    requestTitle: "相談予約フォーム",
    chooseDesk: "窓口を選択",
    month: "月",
    day: "日",
    timezone: "タイムゾーン",
    timezoneValue: "Africa/Kampala（ウガンダ時間）",
    slots: "予約可能な時間枠",
    noSlots: "この窓口・日付では空き枠がありません。別日程を選択するか、お問い合わせください。",
    loadingSlots: "空き状況を確認中...",
    liveSlots: "Googleカレンダーの最新空き枠を表示中。",
    fallbackSlots: "暫定スケジュールを表示中。設定完了後にリアルタイム連携へ切り替わります。",
    fullName: "氏名",
    email: "メールアドレス",
    phone: "電話番号またはWhatsApp",
    notes: "相談内容（任意）",
    notesPlaceholder: "当日相談したい内容をご記入ください。",
    submit: "無料相談を予約する",
    bookingTitle: "予約内容",
    bookingDesk: "窓口",
    bookingDate: "日付",
    bookingTime: "時間",
    selectDate: "日付を選択",
    selectSlot: "時間枠を選択",
    fee: "相談料: 無料",
    bookingHelp: "予約枠はチーム確認後に確定されます。",
    desks: [
      { value: "language", label: "語学デスク" },
      { value: "study", label: "留学・交流デスク" },
      { value: "partners", label: "提携デスク" },
      { value: "business", label: "ビジネス相談デスク" },
    ] satisfies DeskOption[],
  },
} as const;

const FALLBACK_SLOT_TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function getUpcomingWeekdays(days: number) {
  const results: string[] = [];
  const current = new Date();
  for (let i = 0; i < days; i += 1) {
    const next = new Date(current);
    next.setDate(current.getDate() + i);
    const day = next.getDay();
    if (day !== 0 && day !== 6) {
      results.push(next.toISOString().slice(0, 10));
    }
  }
  return results.slice(0, 10);
}

function formatDateDisplay(value: string, locale: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDayLabel(value: string, locale: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
  }).format(date);
}

export default function ConsultationPage() {
  const { locale } = useSiteLanguage();
  const language: SupportedLocale = locale === "ja" ? "ja" : "en";
  const copy = COPY[language];
  const formatLocale = language === "ja" ? "ja-JP" : "en-UG";

  const dates = useMemo(() => getUpcomingWeekdays(20), []);
  const [selectedDesk, setSelectedDesk] = useState(copy.desks[0]?.value ?? "language");
  const [selectedDate, setSelectedDate] = useState(dates[0] ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>(FALLBACK_SLOT_TIMES);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [usingGoogleCalendar, setUsingGoogleCalendar] = useState(false);

  useEffect(() => {
    if (!copy.desks.some((item) => item.value === selectedDesk)) {
      setSelectedDesk(copy.desks[0]?.value ?? "language");
    }
  }, [copy.desks, selectedDesk]);

  const monthOptions = useMemo(() => {
    const seen = new Set<string>();
    return dates
      .map((value) => {
        const monthKey = value.slice(0, 7);
        if (seen.has(monthKey)) return null;
        seen.add(monthKey);
        const [year, month] = monthKey.split("-").map(Number);
        return {
          value: monthKey,
          label: new Intl.DateTimeFormat(formatLocale, { month: "long", year: "numeric" }).format(
            new Date(year, month - 1, 1)
          ),
        };
      })
      .filter((item): item is { value: string; label: string } => Boolean(item));
  }, [dates, formatLocale]);

  const selectedMonth = selectedDate ? selectedDate.slice(0, 7) : monthOptions[0]?.value ?? "";

  const dayOptions = useMemo(() => {
    return dates.filter((value) => value.startsWith(selectedMonth));
  }, [dates, selectedMonth]);

  useEffect(() => {
    if (!selectedDate) return;

    let mounted = true;

    async function loadAvailability() {
      setSlotsLoading(true);
      setSlotError(null);

      try {
        const response = await fetch(
          `/api/consultations/availability?desk=${encodeURIComponent(selectedDesk)}&date=${encodeURIComponent(selectedDate)}`
        );
        const payload = (await response.json()) as {
          slots?: string[];
          source?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Could not load available slots");
        }

        if (!mounted) return;
        const slots = payload.slots ?? [];
        setAvailableSlots(slots);
        setUsingGoogleCalendar(payload.source === "google-calendar");

        setSelectedTime((current) => (slots.includes(current) ? current : slots[0] ?? ""));
      } catch (error) {
        if (!mounted) return;
        setAvailableSlots(FALLBACK_SLOT_TIMES);
        setUsingGoogleCalendar(false);
        setSlotError(error instanceof Error ? error.message : "Could not load available slots");
        setSelectedTime((current) => (FALLBACK_SLOT_TIMES.includes(current) ? current : FALLBACK_SLOT_TIMES[0]));
      } finally {
        if (mounted) {
          setSlotsLoading(false);
        }
      }
    }

    loadAvailability();
    return () => {
      mounted = false;
    };
  }, [selectedDesk, selectedDate]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_8%,rgba(16,39,68,0.10),transparent_42%),linear-gradient(180deg,#f6f8fc_0%,#fdfaf3_45%,#f6f8fc_100%)]">
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        chips={copy.heroChips}
        scenes={[
          { src: "/images/hero/contextual/pathway-counseling.jpg", label: copy.sceneA, caption: copy.sceneACaption },
          { src: "/images/hero/contextual/digital-guidance.jpg", label: copy.sceneB, caption: copy.sceneBCaption },
        ]}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_330px]">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>{copy.requestTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="/api/consultations" method="post">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">{copy.chooseDesk}</label>
                    <Select name="desk" value={selectedDesk} onChange={(event) => setSelectedDesk(event.target.value)}>
                      {copy.desks.map((desk) => (
                        <option key={desk.value} value={desk.value}>
                          {desk.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.month}</label>
                      <Select
                        value={selectedMonth}
                        onChange={(event) => {
                          const nextMonth = event.target.value;
                          const firstDayInMonth = dates.find((value) => value.startsWith(nextMonth));
                          setSelectedDate(firstDayInMonth ?? "");
                        }}
                      >
                        {monthOptions.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.day}</label>
                      <Select name="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)}>
                        {dayOptions.map((date) => (
                          <option key={date} value={date}>
                            {formatDayLabel(date, formatLocale)}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.timezone}</label>
                      <Input value={copy.timezoneValue} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <label className="font-medium">{copy.slots}</label>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`h-11 rounded-xl border text-sm font-medium transition ${
                              selectedTime === time
                                ? "border-brand-700 bg-brand-700 text-white"
                                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                        {copy.noSlots}
                      </div>
                    )}
                    <input type="hidden" name="time" value={selectedTime} />
                    {slotsLoading ? <p className="text-xs text-muted-foreground">{copy.loadingSlots}</p> : null}
                    {usingGoogleCalendar ? (
                      <p className="text-xs text-emerald-700">{copy.liveSlots}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">{copy.fallbackSlots}</p>
                    )}
                    {slotError ? <p className="text-xs text-amber-700">{slotError}</p> : null}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.fullName}</label>
                      <Input name="full_name" placeholder={language === "ja" ? "お名前" : "Your name"} required />
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <label className="font-medium">{copy.email}</label>
                      <Input name="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">{copy.phone}</label>
                    <Input name="phone" placeholder="+256..." />
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">{copy.notes}</label>
                    <textarea
                      name="notes"
                      className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      placeholder={copy.notesPlaceholder}
                    />
                  </div>

                  <input type="hidden" name="is_free" value="true" />

                  <Button type="submit" className="h-11 rounded-xl px-5" disabled={!selectedTime || slotsLoading}>
                    {copy.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-red text-white lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>{copy.bookingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-100">
                <p>{copy.bookingDesk}: {copy.desks.find((desk) => desk.value === selectedDesk)?.label}</p>
                <p>{copy.bookingDate}: {selectedDate ? formatDateDisplay(selectedDate, formatLocale) : copy.selectDate}</p>
                <p>{copy.bookingTime}: {selectedTime || copy.selectSlot} ({copy.timezoneValue})</p>
                <p>{copy.fee}</p>
                <p className="pt-2 text-slate-100/90">{copy.bookingHelp}</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
