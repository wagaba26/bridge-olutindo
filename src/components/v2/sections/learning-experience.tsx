"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MotionFadeItem, MotionStagger } from "@/src/components/v2/motion/primitives";
import { Button } from "@/src/components/v2/ui/button";
import { Card } from "@/src/components/v2/ui/card";
import { cn } from "@/lib/utils";

const dailySteps = [
  {
    title: "Warm-up",
    detail: "Kana recall + breathing reset",
    minutes: "3 min",
  },
  {
    title: "Listen",
    detail: "Short dialogue + comprehension check",
    minutes: "5 min",
  },
  {
    title: "Speak",
    detail: "Repeat and record two lines",
    minutes: "5 min",
  },
  {
    title: "Review",
    detail: "Spaced recall for weak items",
    minutes: "3 min",
  },
];

const immersionModes = [
  {
    key: "n5",
    label: "N5 English-first",
    support: "High English support",
    example: "\u4eca\u65e5\u306f\u56f3\u66f8\u9928\u3078\u884c\u304d\u307e\u3059\u3002",
    translation: "Today I am going to the library.",
  },
  {
    key: "n4",
    label: "N4 Balanced",
    support: "Bilingual prompts",
    example: "\u660e\u65e5\u306f\u6388\u696d\u304c\u3042\u308a\u307e\u3059\u3002",
    translation: "Class is tomorrow.",
  },
  {
    key: "n3",
    label: "N3 Japanese-first",
    support: "Minimal English",
    example: "\u7d42\u696d\u5f8c\u306b\u56f3\u66f8\u9928\u3067\u52c9\u5f37\u3057\u307e\u3059\u3002",
    translation: "Study at the library after class.",
  },
];

const weeklyPlans = [
  {
    hours: 3,
    label: "3 hours / week",
    blocks: ["3 sessions x 60 min", "Focus: kana + basic listening"],
  },
  {
    hours: 6,
    label: "6 hours / week",
    blocks: ["4 sessions x 90 min", "Focus: grammar + speaking"],
  },
  {
    hours: 10,
    label: "10 hours / week",
    blocks: ["5 sessions x 120 min", "Focus: immersion + review"],
  },
];

const reviewQueue = [
  { item: "\u304a\u9858\u3044\u3057\u307e\u3059", type: "Phrase", next: "Today, 18:00" },
  { item: "\u304b\u3089\u3044", type: "Vocabulary", next: "Tomorrow, 08:00" },
  { item: "\u3044\u305f\u3060\u304d\u307e\u3059", type: "Phrase", next: "In 2 days" },
];

const scenarios = [
  {
    title: "At the clinic",
    focus: "Explain symptoms and ask follow-up questions.",
  },
  {
    title: "City office",
    focus: "Resident registration and basic forms.",
  },
  {
    title: "Train station",
    focus: "Ask for directions and platform changes.",
  },
  {
    title: "Cafe order",
    focus: "Practice polite requests and payment flow.",
  },
];

const cultureCards = [
  {
    title: "Introductions",
    body: "Use \u3058\u3087\u3046\u305a\u306b (properly) and bow at a calm pace.",
  },
  {
    title: "Quiet transit",
    body: "Lower voice volume and avoid calls on trains.",
  },
  {
    title: "Shoes indoors",
    body: "Change footwear at entry and align shoes neatly.",
  },
  {
    title: "Waste sorting",
    body: "Separate burnables, plastics, cans, and paper.",
  },
];

const reportMetrics = [
  { label: "Accuracy", value: 82 },
  { label: "Listening precision", value: 76 },
  { label: "Fluency", value: 64 },
  { label: "Consistency", value: 57 },
];

const resourceItems = [
  { title: "Kana master map", status: "Saved" },
  { title: "N5 listening pack", status: "In progress" },
  { title: "Everyday forms glossary", status: "Completed" },
];

export function DailyPracticeLoop({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-5", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="v2-eyebrow">Daily practice loop</p>
          <h3 className="mt-2 text-xl font-semibold">Your 16-minute core session</h3>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
            A small, consistent loop that stabilizes listening, speaking, and review.
          </p>
        </div>
        <div className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-2 text-sm">
          <p className="text-xs text-[var(--v2-text-muted)]">Streak</p>
          <p className="text-lg font-semibold">6 days</p>
        </div>
      </div>
      <ol className="grid gap-3 md:grid-cols-4">
        {dailySteps.map((step, index) => (
          <li key={step.title} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v2-text-muted)]">
              Step {index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold">{step.title}</p>
            <p className="mt-1 text-xs text-[var(--v2-text-muted)]">{step.detail}</p>
            <p className="mt-3 text-xs font-semibold text-[var(--v2-accent)]">{step.minutes}</p>
          </li>
        ))}
      </ol>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[var(--v2-text-muted)]">
          <span>Today</span>
          <span>2 of 4 steps complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--v2-accent-soft)]">
          <div className="h-2 w-[50%] rounded-full bg-[var(--v2-accent)]" />
        </div>
      </div>
    </Card>
  );
}

export function ImmersionModeToggle({ className }: { className?: string }) {
  const [active, setActive] = useState("n5");
  const activeMode = useMemo(() => immersionModes.find((mode) => mode.key === active) ?? immersionModes[0], [active]);

  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Immersion mode</p>
        <h3 className="mt-2 text-xl font-semibold">English fades as your level rises</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          Keep clarity early, then switch to Japanese-first prompts by N3.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {immersionModes.map((mode) => (
          <button
            key={mode.key}
            type="button"
            aria-pressed={active === mode.key}
            onClick={() => setActive(mode.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
              active === mode.key
                ? "border-[var(--v2-accent)] bg-[var(--v2-accent)] text-white"
                : "border-[var(--v2-border)] bg-white text-[var(--v2-text)]"
            )}
          >
            {mode.label}
          </button>
        ))}
      </div>
      <div className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v2-text-muted)]">
          {activeMode.support}
        </p>
        <p className="mt-3 text-lg font-semibold">{activeMode.example}</p>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">{activeMode.translation}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--v2-text-muted)]">
        <span>Toggle applied to drills, quizzes, and lesson notes.</span>
        <span className="rounded-full bg-[var(--v2-accent-soft)] px-3 py-1 text-[var(--v2-accent)]">Optional</span>
      </div>
    </Card>
  );
}

export function LearningPlanBuilder({ className }: { className?: string }) {
  const [active, setActive] = useState(6);
  const current = weeklyPlans.find((plan) => plan.hours === active) ?? weeklyPlans[1];

  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Weekly plan builder</p>
        <h3 className="mt-2 text-xl font-semibold">Choose a rhythm you can sustain</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          We adjust drills, review load, and immersion based on your weekly hours.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {weeklyPlans.map((plan) => (
          <Button
            key={plan.hours}
            type="button"
            variant={active === plan.hours ? "primary" : "secondary"}
            className="rounded-full"
            onClick={() => setActive(plan.hours)}
          >
            {plan.label}
          </Button>
        ))}
      </div>
      <ul className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4 text-sm text-[var(--v2-text-muted)]">
        {current.blocks.map((block) => (
          <li key={block} className="py-1">{block}</li>
        ))}
      </ul>
    </Card>
  );
}

export function MicroReviewQueue({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Micro-review scheduler</p>
        <h3 className="mt-2 text-xl font-semibold">Short review, right on time</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          Spaced recall keeps weak items active without overwhelming your week.
        </p>
      </div>
      <ul className="space-y-3 text-sm">
        {reviewQueue.map((item) => (
          <li key={item.item} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[var(--v2-text)]">{item.item}</p>
              <span className="text-xs text-[var(--v2-text-muted)]">{item.type}</span>
            </div>
            <p className="mt-2 text-xs text-[var(--v2-text-muted)]">Next review: {item.next}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function PronunciationCoach({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Pronunciation coach</p>
        <h3 className="mt-2 text-xl font-semibold">Focus on three core signals</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          We prioritize timing, long vowels, and clarity before speed.
        </p>
      </div>
      <div className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v2-text-muted)]">Target line</p>
        <p className="mt-2 text-lg font-semibold">\u305d\u306e\u3053\u3068\u3070\u3092\u3082\u3046\u4e00\u5ea6\u3044\u3063\u3066\u304f\u3060\u3055\u3044\u3002</p>
      </div>
      <ul className="grid gap-2 text-sm text-[var(--v2-text-muted)]">
        <li className="flex items-center justify-between rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white px-3 py-2">
          <span>Mora timing</span>
          <span className="text-xs font-semibold text-[var(--v2-accent)]">Focus</span>
        </li>
        <li className="flex items-center justify-between rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white px-3 py-2">
          <span>Long vowels</span>
          <span className="text-xs text-[var(--v2-text-muted)]">Stable</span>
        </li>
        <li className="flex items-center justify-between rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white px-3 py-2">
          <span>Clarity</span>
          <span className="text-xs text-[var(--v2-text-muted)]">Stable</span>
        </li>
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button type="button">Record now</Button>
        <Button type="button" variant="secondary">Play model</Button>
      </div>
    </Card>
  );
}

export function ScenarioPractice({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Scenario practice</p>
        <h3 className="mt-2 text-xl font-semibold">Practice real-life exchanges</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          Short, focused scripts with listening and response prompts.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <div key={scenario.title} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
            <p className="text-sm font-semibold">{scenario.title}</p>
            <p className="mt-1 text-xs text-[var(--v2-text-muted)]">{scenario.focus}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CultureQuickCards({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Culture quick-cards</p>
        <h3 className="mt-2 text-xl font-semibold">Small habits that build comfort</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          Short reminders you can review before lessons or travel days.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {cultureCards.map((card) => (
          <div key={card.title} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
            <p className="text-sm font-semibold">{card.title}</p>
            <p className="mt-1 text-xs text-[var(--v2-text-muted)]">{card.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function StudyReportCard({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div>
        <p className="v2-eyebrow">Study report card</p>
        <h3 className="mt-2 text-xl font-semibold">Clear weekly signals</h3>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
          Review your momentum and the exact skills to reinforce next week.
        </p>
      </div>
      <div className="space-y-3">
        {reportMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-xs text-[var(--v2-text-muted)]">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-[var(--v2-accent-soft)]">
              <div className="h-2 rounded-full bg-[var(--v2-accent)]" style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ResourceTracker({ className }: { className?: string }) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="v2-eyebrow">Resource tracker</p>
          <h3 className="mt-2 text-xl font-semibold">Save what you use</h3>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">
            Keep a short list of guides, maps, and drills that support your plan.
          </p>
        </div>
        <Link href="/v2/resources" className="text-sm font-medium text-[var(--v2-accent)]">Browse</Link>
      </div>
      <ul className="space-y-3 text-sm">
        {resourceItems.map((resource) => (
          <li key={resource.title} className="flex items-center justify-between rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white px-3 py-2">
            <span className="font-medium">{resource.title}</span>
            <span className="rounded-full bg-[var(--v2-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--v2-accent)]">
              {resource.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function LearningExperienceHighlight() {
  return (
    <section className="v2-section pt-0">
      <div className="v2-container space-y-8">
        <div className="max-w-2xl">
          <p className="v2-eyebrow">Learning experience</p>
          <h2 className="v2-title text-[clamp(2rem,4vw,3.2rem)]">Structure beyond lessons</h2>
          <p className="v2-subtitle">Daily practice loops, immersion control, and spaced review keep progress steady.</p>
        </div>
        <MotionStagger className="v2-grid v2-grid-3">
          {[
            {
              title: "Daily practice",
              body: "Short loop with listening, speaking, and review every day.",
            },
            {
              title: "Immersion mode",
              body: "English fades as you move from N5 to N3.",
            },
            {
              title: "Review rhythm",
              body: "Micro-sessions scheduled exactly when recall fades.",
            },
          ].map((item) => (
            <MotionFadeItem key={item.title}>
              <Card>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--v2-text-muted)]">{item.body}</p>
              </Card>
            </MotionFadeItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}

export function LearningExperienceGrid() {
  return (
    <section className="v2-section pt-0">
      <div className="v2-container space-y-6">
        <div className="max-w-2xl">
          <p className="v2-eyebrow">Support modules</p>
          <h2 className="v2-title text-[clamp(2rem,4vw,3.2rem)]">Prepared for daily life</h2>
          <p className="v2-subtitle">Scenario practice, cultural quick-cards, and clear progress reporting.</p>
        </div>
        <MotionStagger className="v2-grid v2-grid-3">
          {[
            { title: "Scenario practice", body: "Clinic, city office, transport, and classroom flows." },
            { title: "Culture quick-cards", body: "Short etiquette guides with key phrases." },
            { title: "Study report", body: "Weekly metrics with actionable next steps." },
          ].map((item) => (
            <MotionFadeItem key={item.title}>
              <Card>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--v2-text-muted)]">{item.body}</p>
              </Card>
            </MotionFadeItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
