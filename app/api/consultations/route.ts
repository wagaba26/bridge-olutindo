import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createConsultationEvent, getAvailableSlotsForDesk } from "@/lib/google-calendar";
import { isAllowedConsultationDesk } from "@/lib/service-policy";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const consultationSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(30).optional(),
  desk: z.string().min(2).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().max(1500).optional(),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "consultations", limit: 8, windowMs: 60_000 });
  if (limitError) return limitError;

  const formData = await request.formData();
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse({
    fullName: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    desk: String(formData.get("desk") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    time: String(formData.get("time") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid consultation submission." }, { status: 400 });
  }

  const { fullName, email, phone, desk, date, time, notes } = parsed.data;

  if (!isAllowedConsultationDesk(desk)) {
    return NextResponse.json({ error: "Unsupported consultation desk." }, { status: 400 });
  }

  const { slots } = await getAvailableSlotsForDesk({ desk, date });
  if (!slots.includes(time)) {
    return NextResponse.json({ error: "Selected slot is no longer available. Please choose another time." }, { status: 409 });
  }

  const calendarResult = await createConsultationEvent({
    desk,
    date,
    time,
    fullName,
    email,
    phone: phone ?? "",
    notes: notes ?? "",
  });

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "consultation",
    full_name: fullName,
    email,
    phone,
    message: notes || `Consultation request for ${desk} desk`,
    metadata: {
      desk,
      date,
      time,
      is_free: true,
      calendar_event_created: calendarResult.created,
    },
  });

  if (error) {
    return NextResponse.json({ error: "Unable to save consultation request." }, { status: 500 });
  }

  const url = new URL(request.url);
  url.pathname = "/thank-you";
  url.searchParams.set("source", "consultation");
  url.searchParams.set("desk", desk);
  return NextResponse.redirect(url, 303);
}
