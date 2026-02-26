import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit } from "@/lib/api-security";
import { getAvailableSlotsForDesk, hasGoogleCalendarIntegration } from "@/lib/google-calendar";
import { isAllowedConsultationDesk } from "@/lib/service-policy";

const querySchema = z.object({
  desk: z.string().max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(request: Request) {
  const limitError = await checkRateLimit({ request, routeKey: "consultations-availability", limit: 40, windowMs: 60_000 });
  if (limitError) return limitError;

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    desk: String(searchParams.get("desk") ?? "language").trim(),
    date: String(searchParams.get("date") ?? "").trim(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid availability query" }, { status: 400 });
  }

  const { desk, date } = parsed.data;

  if (!isAllowedConsultationDesk(desk)) {
    return NextResponse.json({ error: "Unsupported consultation desk." }, { status: 400 });
  }

  try {
    const { slots, source } = await getAvailableSlotsForDesk({ desk, date });
    return NextResponse.json({ slots, source, integrationEnabled: hasGoogleCalendarIntegration() });
  } catch {
    return NextResponse.json({ error: "Unable to load available slots" }, { status: 500 });
  }
}
