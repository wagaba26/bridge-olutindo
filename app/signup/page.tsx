"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const authEnabled =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!authEnabled) {
      return;
    }

    const supabase = createSupabaseBrowserClientOrNull();
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [authEnabled, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setIsLoading(true);

    if (!authEnabled) {
      setError("Authentication is temporarily unavailable. Please contact support.");
      setIsLoading(false);
      return;
    }

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const role = (form.elements.namedItem("role") as HTMLInputElement)?.value;

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError("Authentication is temporarily unavailable. Please contact support.");
        setIsLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            primary_role: role,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      setInfo("Account created. Please check your email to confirm your address before logging in.");
      setIsLoading(false);
    } catch {
      setError("Something went wrong while creating your account. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsOAuthLoading(true);

    if (!authEnabled) {
      setError("Google sign-in is temporarily unavailable. Please use email sign-up.");
      setIsOAuthLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError("Google sign-in is temporarily unavailable. Please use email sign-up.");
        setIsOAuthLoading(false);
        return;
      }

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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/80 px-4 py-8 md:py-12">
      <FadeIn>
        <Card className="w-full max-w-md border border-slate-200 shadow-lg">
          <CardHeader className="space-y-2">
            <SectionHeading
              eyebrow="Account"
              title="Create your Bridge Olutindo account."
              description="Choose whether you&apos;re a learner, job seeker, or partner."
              align="left"
              className="max-w-none"
            />
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1 text-sm">
                <label className="font-medium" htmlFor="name">
                  Full name
                </label>
                <Input id="name" name="name" placeholder="Your name" className="h-10 rounded-xl" required />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 rounded-xl"
                  required
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
                  className="h-10 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium" htmlFor="role">
                  I am primarily a...
                </label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Student / Job seeker / Partner / Other"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-slate-700 underline-offset-4 hover:underline">
                  Log in
                </Link>
              </div>
              {!authEnabled ? (
                <p className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">
                  Authentication is temporarily unavailable in this environment.
                </p>
              ) : null}
              {error && <p className="text-xs text-red-500">{error}</p>}
              {info && <p className="text-xs text-emerald-600">{info}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="h-10 w-full rounded-xl" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
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
            </CardFooter>
          </form>
        </Card>
      </FadeIn>
    </div>
  );
}
