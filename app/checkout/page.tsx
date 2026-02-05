import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CheckoutClient from "./checkout-client";

export default async function CheckoutPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <CheckoutClient />;
}

