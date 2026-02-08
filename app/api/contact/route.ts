import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().max(30).optional(),
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
    inquiryType: String(formData.get("inquiry_type") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact submission." }, { status: 400 });
  }

  const { fullName, email, phone, inquiryType, message } = parsed.data;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "contact",
    full_name: fullName,
    email,
    phone: phone ?? null,
    message,
    metadata: {
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
  url.search = "?source=contact";
  return NextResponse.redirect(url, 303);
}
