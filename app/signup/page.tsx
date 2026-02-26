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
import { useSiteLanguage } from "@/components/site/language-provider";

const COPY = {
  en: {
    eyebrow: "Account",
    title: "Create your Bridge Olutindo account.",
    description: "Choose whether you are a learner, student, or partner.",
    fullName: "Full name",
    namePlaceholder: "Your name",
    email: "Email",
    password: "Password",
    role: "I am primarily a...",
    rolePlaceholder: "Student / Learner / Partner / Other",
    already: "Already have an account?",
    login: "Log in",
    authUnavailable: "Authentication is temporarily unavailable in this environment.",
    creating: "Creating account...",
    create: "Create account",
    connecting: "Connecting to Google...",
    continueGoogle: "Continue with Google",
    loginInstead: "Log in instead",
    authTemp: "Authentication is temporarily unavailable. Please contact support.",
    authGoogleTemp: "Google sign-in is temporarily unavailable. Please use email sign-up.",
    accountCreated: "Account created. Please check your email to confirm your address before logging in.",
    accountError: "Something went wrong while creating your account. Please try again.",
    googleError: "Something went wrong while starting Google sign-in.",
  },
  ja: {
    eyebrow: "アカウント",
    title: "Bridge Olutindoアカウントを作成する。",
    description: "学習者・留学希望者・パートナーなど、主な利用目的を選択してください。",
    fullName: "氏名",
    namePlaceholder: "お名前",
    email: "メールアドレス",
    password: "パスワード",
    role: "主な利用目的",
    rolePlaceholder: "留学 / 学習 / 提携 / その他",
    already: "すでにアカウントをお持ちですか？",
    login: "ログイン",
    authUnavailable: "この環境では認証機能が一時的に利用できません。",
    creating: "アカウントを作成中...",
    create: "アカウントを作成",
    connecting: "Googleに接続中...",
    continueGoogle: "Googleで続行",
    loginInstead: "ログイン画面へ",
    authTemp: "認証機能が一時的に利用できません。サポートへお問い合わせください。",
    authGoogleTemp: "Googleログインが一時的に利用できません。メール登録をご利用ください。",
    accountCreated: "アカウントを作成しました。メール確認後にログインしてください。",
    accountError: "アカウント作成中に問題が発生しました。時間をおいて再度お試しください。",
    googleError: "Googleログインの開始に失敗しました。",
  },
} as const;

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useSiteLanguage();
  const language = locale === "ja" ? "ja" : "en";
  const copy = COPY[language];
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
      setError(copy.authTemp);
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
        setError(copy.authTemp);
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

      setInfo(copy.accountCreated);
      setIsLoading(false);
    } catch {
      setError(copy.accountError);
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsOAuthLoading(true);

    if (!authEnabled) {
      setError(copy.authGoogleTemp);
      setIsOAuthLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError(copy.authGoogleTemp);
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
      setError(copy.googleError);
      setIsOAuthLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_10%_8%,rgba(201,93,69,0.14),transparent_40%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_100%)] px-4 py-10 md:py-14">
      <FadeIn>
        <Card className="mx-auto w-full max-w-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <CardHeader className="space-y-3">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
              align="left"
              className="max-w-none"
            />
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-1.5 text-sm">
                <label className="font-medium" htmlFor="name">
                  {copy.fullName}
                </label>
                <Input id="name" name="name" placeholder={copy.namePlaceholder} required />
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium" htmlFor="email">
                  {copy.email}
                </label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium" htmlFor="password">
                  {copy.password}
                </label>
                <Input id="password" name="password" type="password" placeholder="********" required />
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium" htmlFor="role">
                  {copy.role}
                </label>
                <Input id="role" name="role" placeholder={copy.rolePlaceholder} />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-muted-foreground">
                {copy.already}{" "}
                <Link href="/login" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                  {copy.login}
                </Link>
              </div>
              {!authEnabled ? (
                <p className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">
                  {copy.authUnavailable}
                </p>
              ) : null}
              {error && <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error}</p>}
              {info && <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{info}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                {isLoading ? copy.creating : copy.create}
              </Button>
              <Button type="button" variant="secondary" className="w-full rounded-xl" onClick={handleGoogleSignIn} disabled={isOAuthLoading}>
                {isOAuthLoading ? copy.connecting : copy.continueGoogle}
              </Button>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/login">{copy.loginInstead}</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </FadeIn>
    </div>
  );
}
