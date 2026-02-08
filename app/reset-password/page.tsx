"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setInfo("Open this page from your reset email link to set a new password.");
      }
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
      } else {
        setInfo("Password updated. Redirecting to login...");
        setTimeout(() => router.push("/login"), 1200);
      }
    } catch {
      setError("Unable to reset password right now. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/80 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Set a new password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">New password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="h-11 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Confirm password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error}</p> : null}
              {info ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{info}</p> : null}

              <Button type="submit" className="h-11 w-full rounded-xl" disabled={isSaving}>
                {isSaving ? "Updating password..." : "Update password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
