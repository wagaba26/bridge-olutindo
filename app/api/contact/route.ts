import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const inquiryType = String(formData.get("inquiry_type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    type: "contact",
    full_name: fullName,
    email,
    phone,
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
