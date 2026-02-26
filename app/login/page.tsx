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
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";
import { useSiteLanguage } from "@/components/site/language-provider";

const COPY = {
  en: {
    panelEyebrow: "Bridge account",
    panelTitle: "Welcome back to your Uganda-Japan account.",
    panelBody: "Continue your language, study, and partner journey with one secure account.",
    panelPointA: "Protected sign-in and secure session handling",
    panelPointB: "Access your intake and advisor progress updates",
    panelPointC: "Continue applications across all pathways",
    eyebrow: "Account",
    title: "Welcome back.",
    description: "Log in to continue your Bridge Olutindo journey.",
    email: "Email",
    password: "Password",
    forgot: "Forgot password?",
    createNew: "Create new account",
    firstTime: "First time here?",
    openSignup: "Open sign-up form",
    authUnavailable: "Authentication is temporarily unavailable in this environment.",
    loginLoading: "Logging in...",
    login: "Log in",
    googleLoading: "Connecting to Google...",
    google: "Continue with Google",
    createAccount: "Create account",
    resendLoading: "Resending confirmation...",
    resend: "Resend confirmation email",
    errAuth: "Authentication is temporarily unavailable. Please contact support.",
    errLogin: "Something went wrong while logging in. Please try again.",
    errGoogle: "Something went wrong while starting Google sign-in.",
    errGoogleUnavailable: "Google sign-in is temporarily unavailable. Please use email login.",
    errNeedEmail: "Enter your email first so we can resend the confirmation.",
    errResend: "Unable to resend confirmation email. Please try again.",
    infoConfirm: "Please confirm your email. You can resend the confirmation below.",
    infoSent: "Confirmation email sent. Check your inbox and spam folder.",
  },
  ja: {
    panelEyebrow: "Bridgeアカウント",
    panelTitle: "ウガンダ・日本の活動を一つのアカウントで継続。",
    panelBody: "語学、留学、提携の進行状況を安全に管理できます。",
    panelPointA: "安全なログインとセッション管理",
    panelPointB: "インテークと担当者進捗の確認",
    panelPointC: "各ルートの申請を継続管理",
    eyebrow: "アカウント",
    title: "おかえりなさい。",
    description: "Bridge Olutindoを続けるにはログインしてください。",
    email: "メールアドレス",
    password: "パスワード",
    forgot: "パスワードを忘れた場合",
    createNew: "新規アカウント作成",
    firstTime: "はじめての方は",
    openSignup: "新規登録フォームへ",
    authUnavailable: "この環境では認証機能が一時的に利用できません。",
    loginLoading: "ログイン中...",
    login: "ログイン",
    googleLoading: "Googleに接続中...",
    google: "Googleで続行",
    createAccount: "アカウントを作成",
    resendLoading: "確認メールを再送中...",
    resend: "確認メールを再送する",
    errAuth: "認証機能が一時的に利用できません。サポートへお問い合わせください。",
    errLogin: "ログイン中に問題が発生しました。時間をおいて再度お試しください。",
    errGoogle: "Googleログインの開始に失敗しました。",
    errGoogleUnavailable: "Googleログインが一時的に利用できません。メールログインをご利用ください。",
    errNeedEmail: "確認メール再送のため、先にメールアドレスを入力してください。",
    errResend: "確認メールを再送できませんでした。時間をおいて再度お試しください。",
    infoConfirm: "メール確認が必要です。下のボタンから確認メールを再送できます。",
    infoSent: "確認メールを送信しました。受信箱と迷惑メールをご確認ください。",
  },
} as const;

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useSiteLanguage();
  const language = locale === "ja" ? "ja" : "en";
  const copy = COPY[language];
  const authEnabled =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const shouldShowResend =
    (error?.toLowerCase().includes("confirm") ?? false) ||
    (info?.toLowerCase().includes("confirm") ?? false) ||
    (error?.includes("確認") ?? false) ||
    (info?.includes("確認") ?? false);

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
      setError(copy.errAuth);
      setIsLoading(false);
      return;
    }

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError(copy.errAuth);
        setIsLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        const message = signInError.message || "Unable to sign in.";
        setError(message);
        if (message.toLowerCase().includes("confirm")) {
          setInfo(copy.infoConfirm);
        }
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(copy.errLogin);
      setIsLoading(false);
    }
  }

  async function handleResendConfirmation() {
    if (!emailValue) {
      setError(copy.errNeedEmail);
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
        setError(data.error ?? copy.errResend);
        setIsResending(false);
        return;
      }

      setInfo(copy.infoSent);
      setIsResending(false);
    } catch {
      setError(copy.errResend);
      setIsResending(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsOAuthLoading(true);

    if (!authEnabled) {
      setError(copy.errGoogleUnavailable);
      setIsOAuthLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClientOrNull();
      if (!supabase) {
        setError(copy.errGoogleUnavailable);
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
      setError(copy.errGoogle);
      setIsOAuthLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_10%_8%,rgba(27,59,102,0.15),transparent_40%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_100%)] px-4 py-10 md:py-14">
      <FadeIn>
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-red p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-100">{copy.panelEyebrow}</p>
              <h2 className="text-3xl font-semibold leading-tight text-white">{copy.panelTitle}</h2>
              <p className="max-w-sm text-sm text-slate-100">
                {copy.panelBody}
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-100">
              <p className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4" /> {copy.panelPointA}
              </p>
              <p className="inline-flex items-center gap-2">
                <CircleCheck className="size-4" /> {copy.panelPointB}
              </p>
              <p className="inline-flex items-center gap-2">
                <CircleCheck className="size-4" /> {copy.panelPointC}
              </p>
            </div>
          </div>

          <Card className="w-full rounded-none border-0 shadow-none">
            <CardHeader className="space-y-3 px-5 pt-8 sm:px-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                <LockKeyhole className="size-5" />
              </div>
              <SectionHeading
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description}
                align="left"
                className="max-w-none"
              />
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 px-5 sm:px-8">
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium" htmlFor="email">
                    {copy.email}
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
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium" htmlFor="password">
                    {copy.password}
                  </label>
                  <Input id="password" name="password" type="password" placeholder="********" required />
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <Link href="/forgot-password" className="font-medium text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline">
                      {copy.forgot}
                    </Link>
                    <Link href="/signup" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                      {copy.createNew}
                    </Link>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {copy.firstTime}{" "}
                  <Link href="/signup" className="font-semibold text-slate-700 underline-offset-4 hover:underline">
                    {copy.openSignup}
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
              <CardFooter className="flex flex-col gap-3 px-5 pb-8 sm:px-8">
                <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                  {isLoading ? copy.loginLoading : copy.login}
                </Button>
                <Button type="button" variant="secondary" className="w-full rounded-xl" onClick={handleGoogleSignIn} disabled={isOAuthLoading}>
                  {isOAuthLoading ? copy.googleLoading : copy.google}
                </Button>
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href="/signup">{copy.createAccount}</Link>
                </Button>
                {shouldShowResend ? (
                  <Button type="button" variant="ghost" className="w-full text-xs text-muted-foreground" onClick={handleResendConfirmation} disabled={isResending}>
                    {isResending ? copy.resendLoading : copy.resend}
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
