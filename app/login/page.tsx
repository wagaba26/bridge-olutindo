"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const shouldShowResend =
    (error?.toLowerCase().includes("confirm") ?? false) || (info?.toLowerCase().includes("confirm") ?? false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        const message = signInError.message || "Unable to sign in.";
        setError(message);
        if (message.toLowerCase().includes("confirm")) {
          setInfo("Please confirm your email. You can resend the confirmation below.");
        }
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong while logging in. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleResendConfirmation() {
    if (!emailValue) {
      setError("Enter your email first so we can resend the confirmation.");
      return;
    }

    setError(null);
    setInfo(null);
    setIsResending(true);

    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Unable to resend confirmation email.");
        setIsResending(false);
        return;
      }

      setInfo("Confirmation email sent. Check your inbox and spam folder.");
      setIsResending(false);
    } catch {
      setError("Unable to resend confirmation email. Please try again.");
      setIsResending(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsOAuthLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setIsOAuthLoading(false);
      }
    } catch {
      setError("Something went wrong while starting Google sign-in.");
      setIsOAuthLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_12%_10%,#dbeafe_0,#f8fafc_42%,#f1f5f9_100%)] px-4 py-10 md:py-14">
      <FadeIn>
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-slate-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Bridge account</p>
              <h2 className="text-3xl font-semibold leading-tight">Welcome back to your Uganda-Japan account.</h2>
              <p className="max-w-sm text-sm text-slate-300">
                Continue your language, jobs, study, and partner journey with one secure account.
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              <p className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4" /> Protected sign-in and secure session handling
              </p>
              <p className="inline-flex items-center gap-2">
                <CircleCheck className="size-4" /> Access your intake and advisor progress updates
              </p>
              <p className="inline-flex items-center gap-2">
                <CircleCheck className="size-4" /> Continue applications across all pathways
              </p>
            </div>
          </div>

          <Card className="w-full rounded-none border-0 shadow-none">
            <CardHeader className="space-y-2 px-5 pt-8 sm:px-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                <LockKeyhole className="size-5" />
              </div>
              <SectionHeading
                eyebrow="Account"
                title="Welcome back."
                description="Log in to continue your Bridge Olutindo journey."
                align="left"
                className="max-w-none"
              />
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-5 sm:px-8">
                <div className="space-y-1 text-sm">
                  <label className="font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={emailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <Link href="/forgot-password" className="text-left hover:text-slate-900 underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                  <Link href="/signup" className="font-medium text-slate-700 underline-offset-4 hover:underline">
                    Create account
                  </Link>
                </div>
                {error && <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error}</p>}
                {info && <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{info}</p>}
              </CardContent>
              <CardFooter className="flex flex-col gap-3 px-5 pb-8 sm:px-8">
                <Button type="submit" className="h-10 w-full rounded-xl" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 w-full rounded-xl"
                  onClick={handleGoogleSignIn}
                  disabled={isOAuthLoading}
                >
                  {isOAuthLoading ? "Connecting to Google..." : "Continue with Google"}
                </Button>
                {shouldShowResend ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 w-full text-xs text-muted-foreground"
                    onClick={handleResendConfirmation}
                    disabled={isResending}
                  >
                    {isResending ? "Resending confirmation..." : "Resend confirmation email"}
                  </Button>
                ) : null}
              </CardFooter>
            </form>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
