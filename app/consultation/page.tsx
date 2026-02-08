"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const DESKS = [
  { value: "language", label: "Language Desk" },
  { value: "jobs", label: "Jobs Desk" },
  { value: "study", label: "Study and Exchange Desk" },
  { value: "partners", label: "Partnerships Desk" },
  { value: "business", label: "Business Consultancy Desk" },
];

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

function formatDateDisplay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-UG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDayLabel(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-UG", {
    weekday: "short",
    day: "numeric",
  }).format(date);
}

export default function ConsultationPage() {
  const dates = useMemo(() => getUpcomingWeekdays(20), []);
  const [selectedDesk, setSelectedDesk] = useState(DESKS[0].value);
  const [selectedDate, setSelectedDate] = useState(dates[0] ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>(FALLBACK_SLOT_TIMES);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [usingGoogleCalendar, setUsingGoogleCalendar] = useState(false);

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
          label: new Intl.DateTimeFormat("en-UG", { month: "long", year: "numeric" }).format(
            new Date(year, month - 1, 1)
          ),
        };
      })
      .filter((item): item is { value: string; label: string } => Boolean(item));
  }, [dates]);

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
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Consultation</p>
          <h1 className="mt-2 max-w-3xl">Book a free consultation with the right Bridge desk.</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Choose your area of interest, then pick a date and available time slot that works for you.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_330px]">
          <Card>
            <CardHeader>
              <CardTitle>Consultation request</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action="/api/consultations" method="post">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Choose desk</label>
                  <Select
                    name="desk"
                    value={selectedDesk}
                    onChange={(event) => setSelectedDesk(event.target.value)}
                    className="h-11 rounded-xl"
                  >
                    {DESKS.map((desk) => (
                      <option key={desk.value} value={desk.value}>
                        {desk.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Month</label>
                    <Select
                      value={selectedMonth}
                      onChange={(event) => {
                        const nextMonth = event.target.value;
                        const firstDayInMonth = dates.find((value) => value.startsWith(nextMonth));
                        setSelectedDate(firstDayInMonth ?? "");
                      }}
                      className="h-11 rounded-xl"
                    >
                      {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Day</label>
                    <Select
                      name="date"
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      className="h-11 rounded-xl"
                    >
                      {dayOptions.map((date) => (
                        <option key={date} value={date}>
                          {formatDayLabel(date)}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Time zone</label>
                    <Input value="Africa/Kampala (UG time)" className="h-11 rounded-xl" readOnly />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <label className="font-medium">Available time slots</label>
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {availableSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`h-11 rounded-xl border text-sm font-medium transition ${
                            selectedTime === time
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                      No available slots for this desk/date. Pick another date or contact us directly.
                    </div>
                  )}
                  <input type="hidden" name="time" value={selectedTime} />
                  {slotsLoading ? <p className="text-xs text-muted-foreground">Checking availability...</p> : null}
                  {usingGoogleCalendar ? (
                    <p className="text-xs text-emerald-700">Live availability from Google Calendar.</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Showing fallback schedule. Live calendar sync activates once configured.</p>
                  )}
                  {slotError ? <p className="text-xs text-amber-700">{slotError}</p> : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Full name</label>
                    <Input name="full_name" placeholder="Your name" className="h-11 rounded-xl" required />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Email</label>
                    <Input name="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" required />
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Phone or WhatsApp</label>
                  <Input name="phone" placeholder="+256..." className="h-11 rounded-xl" />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Notes (optional)</label>
                  <textarea
                    name="notes"
                    className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                    placeholder="What would you like to discuss during the consultation?"
                  />
                </div>

                <input type="hidden" name="is_free" value="true" />

                <Button type="submit" className="h-11 rounded-xl px-5" disabled={!selectedTime || slotsLoading}>
                  Confirm free consultation
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Booking details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              <p>Desk: {DESKS.find((desk) => desk.value === selectedDesk)?.label}</p>
              <p>Date: {selectedDate ? formatDateDisplay(selectedDate) : "Select a date"}</p>
              <p>Time: {selectedTime || "Select a slot"} (UG time)</p>
              <p>Consultation fee: Free</p>
              <p className="pt-2 text-slate-300">Your selected slot is reserved after your request is confirmed by our team.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
