import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/api-security";
import { recordSecurityEvent } from "@/lib/security-log";

export async function POST(request: Request) {
  const limitError = await checkRateLimit({ request, routeKey: "csp-report", limit: 80, windowMs: 60_000 });
  if (limitError) return limitError;

  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    // no-op
  }

  await recordSecurityEvent({
    request,
    eventType: "csp_report",
    severity: "low",
    details: {
      report: payload,
    },
  });

  return NextResponse.json({ ok: true });
}
