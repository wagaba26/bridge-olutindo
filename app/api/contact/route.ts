import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { isAllowedConsultationDesk } from "@/lib/service-policy";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().max(30).optional(),
  routingDesk: z.string().max(40).optional(),
  inquiryType: z.string().max(80).optional(),
  message: z.string().min(6).max(2000),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "contact", limit: 12, windowMs: 60_000 });
  if (limitError) return limitError;

  const formData = await request.formData();
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse({
    fullName: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    routingDesk: String(formData.get("routing_desk") ?? "").trim() || undefined,
    inquiryType: String(formData.get("inquiry_type") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact submission." }, { status: 400 });
  }

  const { fullName, email, phone, routingDesk, inquiryType, message } = parsed.data;

  if (routingDesk && !isAllowedConsultationDesk(routingDesk)) {
    return NextResponse.json({ error: "Unsupported routing desk." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "contact",
    full_name: fullName,
    email,
    focus: routingDesk ?? null,
    phone: phone ?? null,
    message,
    metadata: {
      routing_desk: routingDesk,
      inquiry_type: inquiryType,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to save contact request." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  url.pathname = "/thank-you";
  url.searchParams.set("source", "contact");
  if (routingDesk) {
    url.searchParams.set("desk", routingDesk);
  }
  return NextResponse.redirect(url, 303);
}
