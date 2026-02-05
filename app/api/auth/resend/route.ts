import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resend({ type: "signup", email });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
