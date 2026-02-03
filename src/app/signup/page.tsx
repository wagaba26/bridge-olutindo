"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Unable to create account.");
      setIsSubmitting(false);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-5xl px-5 pb-20 pt-8 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel-deep p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
              Create account
            </p>
            <h1 className="mt-4 font-display text-3xl">Start your Bridge journey</h1>
            <p className="mt-3 text-sm text-[#e3f3ef]">
              Set up your profile, get placed, and access your learning dashboard.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Placement assessment and level mapping",
                "Live class calendar and recordings",
                "Career and study pathway eligibility",
              ].map((item) => (
                <div key={item} className="panel-soft border-[#2c6e65] bg-[#0f7465] px-4 py-3 text-sm text-[#f7f6f2]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-8">
            <h2 className="font-display text-2xl">Create your account</h2>
            <p className="mt-2 text-sm text-[#5a5f5f]">
              We will email you if we need more details.
            </p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm">
                Full name
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="input-field"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input-field"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Password
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-field"
                />
              </label>
              {error ? (
                <p className="rounded-2xl border border-[#f0d5c9] bg-[#fff6f2] px-4 py-3 text-xs text-[#b24a2a]">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn-primary mt-2 h-11 w-full sm:w-auto">
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
              <p className="text-xs text-[#5b584f]">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#0d6b5d]">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
