"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setIsSending(true);

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError("Password reset is temporarily unavailable. Please contact support.");
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setInfo("Reset link sent. Check your inbox and spam folder.");
      }
    } catch {
      setError("Unable to send reset email right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/80 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error}</p> : null}
              {info ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{info}</p> : null}

              <Button type="submit" className="h-11 w-full rounded-xl" disabled={isSending}>
                {isSending ? "Sending reset link..." : "Send reset link"}
              </Button>
            </form>

            <p className="mt-4 text-xs text-muted-foreground">
              Back to{" "}
              <Link href="/login" className="font-medium text-slate-700 underline">
                log in
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
