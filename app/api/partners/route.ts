import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const organization = String(formData.get("organization") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const institutionType = String(formData.get("institution_type") ?? "").trim();
  const basedIn = String(formData.get("based_in") ?? "").trim();
  const partnershipFocus = String(formData.get("partnership_focus") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();

  if (!organization || !contactName || !email || !details) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

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
