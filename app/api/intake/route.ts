import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const intakeSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().max(30).optional(),
  focus: z.string().max(40).optional(),
  program: z.string().max(160).optional(),
  currentStage: z.string().max(80).optional(),
  message: z.string().min(6).max(2000),
  preferredStart: z.string().max(80).optional(),
  weeklyAvailability: z.string().max(120).optional(),
  entryMode: z.string().max(50).optional(),
  paymentPlan: z.string().max(50).optional(),
  targetRoleCategory: z.string().max(50).optional(),
  jlptLevel: z.string().max(20).optional(),
  targetIntake: z.string().max(80).optional(),
  educationStatus: z.string().max(120).optional(),
  organization: z.string().max(160).optional(),
  partnershipModel: z.string().max(80).optional(),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "intake", limit: 20, windowMs: 60_000 });
  if (limitError) return limitError;

  const formData = await request.formData();
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse({
    fullName: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    focus: String(formData.get("focus") ?? "").trim() || undefined,
    program: String(formData.get("program") ?? "").trim() || undefined,
    currentStage: String(formData.get("current_stage") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
    preferredStart: String(formData.get("preferred_start") ?? "").trim() || undefined,
    weeklyAvailability: String(formData.get("weekly_availability") ?? "").trim() || undefined,
    entryMode: String(formData.get("entry_mode") ?? "").trim() || undefined,
    paymentPlan: String(formData.get("payment_plan") ?? "").trim() || undefined,
    targetRoleCategory: String(formData.get("target_role_category") ?? "").trim() || undefined,
    jlptLevel: String(formData.get("jlpt_level") ?? "").trim() || undefined,
    targetIntake: String(formData.get("target_intake") ?? "").trim() || undefined,
    educationStatus: String(formData.get("education_status") ?? "").trim() || undefined,
    organization: String(formData.get("organization") ?? "").trim() || undefined,
    partnershipModel: String(formData.get("partnership_model") ?? "").trim() || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid intake submission." }, { status: 400 });
  }

  const {
    fullName,
    email,
    phone,
    focus,
    program,
    currentStage,
    message,
    preferredStart,
    weeklyAvailability,
    entryMode,
    paymentPlan,
    targetRoleCategory,
    jlptLevel,
    targetIntake,
    educationStatus,
    organization,
    partnershipModel,
  } = parsed.data;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "intake",
    full_name: fullName,
    email,
      phone: phone ?? null,
      focus,
      message,
    metadata: {
      program,
      current_stage: currentStage,
      preferred_start: preferredStart,
      weekly_availability: weeklyAvailability,
      entry_mode: entryMode,
      payment_plan: paymentPlan,
      target_role_category: targetRoleCategory,
      jlpt_level: jlptLevel,
      target_intake: targetIntake,
      education_status: educationStatus,
      organization,
      partnership_model: partnershipModel,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to save intake request." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  url.pathname = "/thank-you";
  url.search = "?source=intake";
  return NextResponse.redirect(url, 303);
}
