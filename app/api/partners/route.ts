import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const partnersSchema = z.object({
  organization: z.string().min(2).max(180),
  contactName: z.string().min(2).max(120),
  email: z.email(),
  region: z.string().max(120).optional(),
  institutionType: z.string().max(80).optional(),
  basedIn: z.string().max(80).optional(),
  partnershipFocus: z.string().max(180).optional(),
  partnershipModel: z.string().max(120).optional(),
  targetStartWindow: z.string().max(120).optional(),
  details: z.string().min(10).max(2500),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "partners", limit: 10, windowMs: 60_000 });
  if (limitError) return limitError;

  const formData = await request.formData();
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = partnersSchema.safeParse({
    organization: String(formData.get("organization") ?? "").trim(),
    contactName: String(formData.get("contact_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim() || undefined,
    institutionType: String(formData.get("institution_type") ?? "").trim() || undefined,
    basedIn: String(formData.get("based_in") ?? "").trim() || undefined,
    partnershipFocus: String(formData.get("partnership_focus") ?? "").trim() || undefined,
    partnershipModel: String(formData.get("partnership_model") ?? "").trim() || undefined,
    targetStartWindow: String(formData.get("target_start_window") ?? "").trim() || undefined,
    details: String(formData.get("details") ?? "").trim(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid partner submission." }, { status: 400 });
  }

  const {
    organization,
    contactName,
    email,
    region,
    institutionType,
    basedIn,
    partnershipFocus,
    partnershipModel,
    targetStartWindow,
    details,
  } = parsed.data;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "partners",
    full_name: contactName,
    email,
    organization,
    message: details,
    metadata: {
      region,
      institution_type: institutionType,
      based_in: basedIn,
      partnership_focus: partnershipFocus,
      partnership_model: partnershipModel,
      target_start_window: targetStartWindow,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to save partner request." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  url.pathname = "/thank-you";
  url.search = "?source=partners";
  return NextResponse.redirect(url, 303);
}
