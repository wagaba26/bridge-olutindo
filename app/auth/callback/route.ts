import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const fullName =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined) ||
        null;

      await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: fullName,
          email: user.email,
        },
        { onConflict: "id" }
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
