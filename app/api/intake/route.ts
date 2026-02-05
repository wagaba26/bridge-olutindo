import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const focus = String(formData.get("focus") ?? "").trim();
  const program = String(formData.get("program") ?? "").trim();
  const currentStage = String(formData.get("current_stage") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "intake",
    full_name: fullName,
    email,
    phone,
    focus,
    message,
    metadata: {
      program,
      current_stage: currentStage,
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
