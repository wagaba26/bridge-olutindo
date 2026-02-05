"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
    } catch (_err) {
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
    } catch (_err) {
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
    } catch (_err) {
      setError("Something went wrong while starting Google sign-in.");
      setIsOAuthLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/80 px-4 py-12">
      <FadeIn>
        <Card className="w-full max-w-md shadow-lg border border-slate-200">
          <CardHeader className="space-y-2">
            <SectionHeading
              eyebrow="Account"
              title="Welcome back."
              description="Log in to continue your Bridge Olutindo journey."
              align="left"
              className="max-w-none"
            />
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  type="button"
                  className="hover:text-brand-red underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              {info && <p className="text-xs text-emerald-600">{info}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isOAuthLoading}
              >
                {isOAuthLoading ? "Connecting to Google..." : "Continue with Google"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs text-muted-foreground"
                onClick={handleResendConfirmation}
                disabled={isResending}
              >
                {isResending ? "Resending confirmation..." : "Resend confirmation email"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </FadeIn>
    </div>
  );
}
