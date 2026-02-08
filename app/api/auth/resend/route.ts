import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const resendSchema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "auth-resend", limit: 6, windowMs: 60_000 });
  if (limitError) return limitError;

  const payload = (await request.json()) as { email?: string };
  const parsed = resendSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const { email } = parsed.data;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resend({ type: "signup", email });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
