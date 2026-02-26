"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AssistantState } from "@/components/assistant/AssistantController";
import { AssistantAvatar, type AssistantAvatarHandle } from "@/components/assistant/AssistantAvatar";
import { ListenQuiz } from "@/components/quiz/ListenQuiz";
import { ReadingQuiz } from "@/components/quiz/ReadingQuiz";
import { SpeakQuiz } from "@/components/quiz/SpeakQuiz";
import { useSiteLanguage } from "@/components/site/language-provider";
import { Button } from "@/components/ui/button";

type QuizLevel = "n5" | "n4";

type QuizLevelConfig = {
  id: QuizLevel;
  label: string;
  summary: string;
  speak: {
    prompt: string;
    targetPhrase: string;
  };
  listen: {
    prompt: string;
    options: string[];
    answer: string;
  };
  read: {
    prompt: string;
    helper: string;
    options: string[];
    answer: string;
  };
};

const COPY = {
  en: {
    badge: "Daily practice",
    title: "Speak, listen, and read in Japanese",
    body:
      "Short drills with immediate feedback. Use this page for fast daily reps, then continue with self-study for weekly progression.",
    chips: ["Daily drill flow", "Pronunciation correction", "Listening and reading accuracy"],
    levelLabel: "Select level",
    panelTitle: "How to use this quiz effectively",
    panelItems: [
      "Run 8-12 minute sessions at least 4 times per week.",
      "Repeat one level until your responses are stable, then move up.",
      "Use self-study after each quiz block to lock in weak areas.",
    ],
    openSelfStudy: "Open self-study",
    buildPlan: "Build intake plan",
    assistantReady: "Ready when you are.",
    resetAssistant: "Reset assistant",
    levels: [
      {
        id: "n5",
        label: "N5 warm-up",
        summary: "Core introductions and simple sentence recognition.",
        speak: {
          prompt: "Please introduce yourself.",
          targetPhrase: "はじめまして。わたしはジョンです。",
        },
        listen: {
          prompt: "こちらは図書館です。",
          options: ["こちらは図書館です。", "こちらは病院です。", "こちらは駅です。", "こちらは学校です。"],
          answer: "こちらは図書館です。",
        },
        read: {
          prompt: "駅で切符を買います。",
          helper: "Read the sentence and choose the best meaning.",
          options: [
            "I buy a ticket at the station.",
            "I meet my teacher at school.",
            "I drink coffee in the library.",
            "I walk home in the evening.",
          ],
          answer: "I buy a ticket at the station.",
        },
      },
      {
        id: "n4",
        label: "N4 transition",
        summary: "Practical schedule and coordination language.",
        speak: {
          prompt: "Please explain your weekly study schedule.",
          targetPhrase: "毎週火曜日と木曜日に日本語を勉強しています。",
        },
        listen: {
          prompt: "来週の面談は午後三時からです。",
          options: [
            "来週の面談は午後三時からです。",
            "来週の面談は午前九時からです。",
            "来週の面談は午後一時からです。",
            "来週の面談は午後六時からです。",
          ],
          answer: "来週の面談は午後三時からです。",
        },
        read: {
          prompt: "今週は計画を見直して、来週までに準備を完了します。",
          helper: "Read the sentence and select the closest meaning.",
          options: [
            "This week we review the plan and finish preparation by next week.",
            "This month we cancel the meeting and change the teacher.",
            "Tomorrow we start a new project without any review.",
            "Yesterday we finished all work and closed the schedule.",
          ],
          answer: "This week we review the plan and finish preparation by next week.",
        },
      },
    ] satisfies QuizLevelConfig[],
  },
  ja: {
    badge: "日次トレーニング",
    title: "日本語の発話・聴解・読解を短時間で反復",
    body:
      "短時間で回せる実践ドリルです。ここで日次反復を行い、独学ページで週次の定着設計につなげてください。",
    chips: ["モバイル中心の反復設計", "発音修正フィードバック", "聴解・読解の精度確認"],
    levelLabel: "レベル選択",
    panelTitle: "このクイズの効果的な使い方",
    panelItems: [
      "1回8-12分を目安に、週4回以上の反復を推奨。",
      "応答が安定するまで同レベルを継続し、次段階へ移行。",
      "クイズ後は独学ページで弱点項目を重点復習。",
    ],
    openSelfStudy: "独学ページを開く",
    buildPlan: "インテーク計画を作成",
    assistantReady: "準備できたら開始しましょう。",
    resetAssistant: "アシスタントをリセット",
    levels: [
      {
        id: "n5",
        label: "N5導入",
        summary: "自己紹介と基本文の聞き取りを反復。",
        speak: {
          prompt: "自己紹介してください。",
          targetPhrase: "はじめまして。わたしはジョンです。",
        },
        listen: {
          prompt: "こちらは図書館です。",
          options: ["こちらは図書館です。", "こちらは病院です。", "こちらは駅です。", "こちらは学校です。"],
          answer: "こちらは図書館です。",
        },
        read: {
          prompt: "駅で切符を買います。",
          helper: "文を読んで、最も近い意味を選んでください。",
          options: [
            "駅で切符を買います。",
            "学校で先生に会います。",
            "図書館でコーヒーを飲みます。",
            "夕方に家まで歩きます。",
          ],
          answer: "駅で切符を買います。",
        },
      },
      {
        id: "n4",
        label: "N4移行",
        summary: "学習計画や日程調整に使う実務表現を強化。",
        speak: {
          prompt: "毎週の学習スケジュールを説明してください。",
          targetPhrase: "毎週火曜日と木曜日に日本語を勉強しています。",
        },
        listen: {
          prompt: "来週の面談は午後三時からです。",
          options: [
            "来週の面談は午後三時からです。",
            "来週の面談は午前九時からです。",
            "来週の面談は午後一時からです。",
            "来週の面談は午後六時からです。",
          ],
          answer: "来週の面談は午後三時からです。",
        },
        read: {
          prompt: "今週は計画を見直して、来週までに準備を完了します。",
          helper: "文を読んで、内容に最も近い選択肢を選んでください。",
          options: [
            "今週は計画を見直して、来週までに準備を完了します。",
            "今月は面談を中止して先生を変更します。",
            "明日から確認なしで新しい計画を開始します。",
            "昨日すべて完了したので予定は終了です。",
          ],
          answer: "今週は計画を見直して、来週までに準備を完了します。",
        },
      },
    ] satisfies QuizLevelConfig[],
  },
} as const;

export default function QuizPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  const assistantRef = useRef<AssistantAvatarHandle>(null);
  const [assistantMessage, setAssistantMessage] = useState<string | null>(null);
  const [level, setLevel] = useState<QuizLevel>("n5");

  const levelConfig = useMemo(
    () => copy.levels.find((item) => item.id === level) ?? copy.levels[0],
    [copy.levels, level]
  );

  const updateAssistant = useCallback((state: AssistantState, message: string) => {
    assistantRef.current?.setState(state);
    setAssistantMessage(message);
  }, []);

  useEffect(() => {
    assistantRef.current?.setState("idle");
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f0] pb-24">
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {copy.badge}
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">{copy.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{copy.body}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            {copy.chips.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-3 border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.levelLabel}</p>
              <p className="mt-1 text-sm text-slate-700">{levelConfig.summary}</p>
            </div>
            <div className="flex gap-2">
              {copy.levels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setLevel(item.id);
                    assistantRef.current?.setState("idle");
                    setAssistantMessage(null);
                  }}
                  className={`h-10 rounded-full border px-4 text-sm font-semibold ${
                    item.id === level
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-3">
        <SpeakQuiz
          key={`speak-${level}`}
          prompt={levelConfig.speak.prompt}
          targetPhrase={levelConfig.speak.targetPhrase}
          onAssistantUpdate={updateAssistant}
        />
        <ListenQuiz
          key={`listen-${level}`}
          prompt={levelConfig.listen.prompt}
          options={levelConfig.listen.options}
          answer={levelConfig.listen.answer}
          onAssistantUpdate={updateAssistant}
        />
        <ReadingQuiz
          key={`read-${level}`}
          prompt={levelConfig.read.prompt}
          helper={levelConfig.read.helper}
          options={levelConfig.read.options}
          answer={levelConfig.read.answer}
          onAssistantUpdate={updateAssistant}
        />
      </section>

      <section className="container mx-auto px-4 pb-10">
        <div className="grid gap-4 border border-slate-200 bg-white p-5 md:grid-cols-2 md:p-6">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.panelTitle}</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              {copy.panelItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 md:justify-end md:items-start">
            <Button asChild variant="outline" className="h-11 w-full px-5 md:w-auto">
              <Link href="/learn/self-study">{copy.openSelfStudy}</Link>
            </Button>
            <Button asChild className="h-11 w-full px-5 md:w-auto">
              <Link href="/intake?focus=learn">{copy.buildPlan}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="max-w-[240px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
          {assistantMessage ?? copy.assistantReady}
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-3 shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
          <AssistantAvatar ref={assistantRef} className="h-44 w-44" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-full px-4 text-xs"
          onClick={() => updateAssistant("idle", copy.assistantReady)}
        >
          {copy.resetAssistant}
        </Button>
      </div>
    </div>
  );
}
