"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const STEP_ITEMS = [
  {
    title: "Assess",
    detail: "Baseline diagnostic for reading, listening, speaking, and weekly study rhythm.",
    output: "Skill baseline and first 4-week execution plan.",
  },
  {
    title: "Train",
    detail: "Structured instruction cycles with guided practice, corrections, and retention checks.",
    output: "Measured progression across lesson and quiz performance.",
  },
  {
    title: "Certify",
    detail: "Readiness checks aligned to JLPT level targets and transition preparation milestones.",
    output: "Documented level confidence and next-phase recommendation.",
  },
];

export function BridgeMethodInfographic() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.35, margin: "-15% 0px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const resumeTimeout = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const stageProgress = activeIndex === 0 ? 0.16 : activeIndex === 1 ? 0.58 : 1;
  const activeStep = STEP_ITEMS[activeIndex];

  const pauseAuto = () => {
    setAutoPlay(false);
    if (resumeTimeout.current) {
      window.clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = window.setTimeout(() => setAutoPlay(true), 7000);
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    pauseAuto();
  };

  useEffect(() => {
    if (reduceMotion || !isInView || !autoPlay) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEP_ITEMS.length);
    }, 4200);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, isInView, reduceMotion]);

  return (
    <section
      aria-labelledby="bridge-method-title"
      className="rounded-3xl border border-slate-300/70 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] md:p-6"
    >
      <div ref={sectionRef} className="max-w-2xl">
        <h3 id="bridge-method-title" className="text-lg font-semibold text-slate-900 md:text-xl">
          Bridge Method
        </h3>
        <p className="mt-1.5 text-sm text-slate-600">
          One operating sequence with clear inputs, weekly execution, and measurable outputs.
        </p>
      </div>

      <div className="relative mt-5">
        <div className="relative hidden md:block">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 h-16"
          >
            <path
              d="M80 56 C 215 10, 355 10, 500 56 S 785 102, 920 56"
              fill="none"
              stroke="#c8d3e1"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <motion.path
              d="M80 56 C 215 10, 355 10, 500 56 S 785 102, 920 56"
              fill="none"
              stroke="#1f3a63"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.16 }}
              animate={{ pathLength: stageProgress }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <ol className="relative z-10 grid grid-cols-3 gap-4 px-4 pb-2 pt-3">
            {STEP_ITEMS.map((item, index) => (
              <li key={`${item.title}-node`} className="flex justify-center">
                <button
                  type="button"
                  onFocus={() => handleSelect(index)}
                  onMouseEnter={() => handleSelect(index)}
                  onClick={() => handleSelect(index)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-left"
                  aria-label={`Focus ${item.title} step`}
                  aria-pressed={activeIndex === index}
                >
                  <motion.span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                      activeIndex === index
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-slate-300 bg-white text-brand-700"
                    )}
                    animate={
                      reduceMotion
                        ? undefined
                        : activeIndex === index
                          ? { scale: [1, 1.08, 1], boxShadow: "0 0 0 6px rgba(31,58,99,0.08)" }
                          : { scale: 1, boxShadow: "0 0 0 0 rgba(31,58,99,0)" }
                    }
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {index + 1}
                  </motion.span>
                  <span className="text-sm font-semibold text-slate-800">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-3 md:hidden">
          <ol className="grid grid-cols-3 gap-2">
            {STEP_ITEMS.map((item, index) => (
              <li key={`${item.title}-mobile`}>
                <button
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "w-full rounded-xl border px-2 py-2 text-left transition",
                    activeIndex === index
                      ? "border-brand-700/30 bg-brand-700/[0.07]"
                      : "border-slate-200 bg-slate-50"
                  )}
                  aria-pressed={activeIndex === index}
                  aria-label={`Show step ${index + 1}: ${item.title}`}
                >
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold",
                      activeIndex === index
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-slate-300 bg-white text-brand-700"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                    Step {index + 1}
                  </span>
                  <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="h-1.5 rounded-full bg-slate-200">
            <motion.div
              aria-hidden="true"
              className="h-1.5 rounded-full bg-brand-700"
              animate={{ width: `${Math.round(stageProgress * 100)}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeStep.title}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step {activeIndex + 1}
              </p>
              <h4 className="mt-1 text-lg font-semibold text-slate-900">{activeStep.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{activeStep.detail}</p>
              <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Output</p>
                <p className="mt-1 text-xs text-slate-700">{activeStep.output}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <motion.ol
          className="hidden gap-3 md:mt-2 md:grid md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
        >
          {STEP_ITEMS.map((item, index) => (
            <motion.li
              key={item.title}
              className={cn(
                "group relative rounded-2xl border p-4",
                activeIndex === index
                  ? "border-brand-700/30 bg-brand-700/[0.06] shadow-[0_10px_24px_rgba(15,54,91,0.12)]"
                  : "border-slate-200 bg-slate-50/85"
              )}
              variants={{
                hidden: {
                  opacity: 0,
                  y: reduceMotion ? 0 : 20,
                  filter: reduceMotion ? "blur(0px)" : "blur(4px)",
                },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              onViewportEnter={() => handleSelect(index)}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              animate={activeIndex === index ? { scale: 1.01 } : { scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeIndex === index ? (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-brand-700/20"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0.6] }}
                  transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeInOut" }}
                />
              ) : null}
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white text-xs font-semibold md:hidden",
                    activeIndex === index ? "border-brand-700 text-brand-700" : "border-brand-700/35 text-brand-700"
                  )}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Step {index + 1}
                  </p>
                  <p className="text-base font-semibold text-slate-900">{item.title}</p>
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">{item.detail}</p>

              <div
                className={cn(
                  "mt-3 rounded-xl border bg-white/80 px-3 py-2",
                  activeIndex === index ? "border-brand-700/30" : "border-slate-200"
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Output</p>
                <p className="mt-1 text-xs text-slate-700">{item.output}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export function JlptTimelineInfographic() {
  const levels = [
    { level: "N5", focus: "Foundations: Kana, essential grammar, daily expressions." },
    { level: "N4", focus: "Control: Sentence patterns, listening stability, reading confidence." },
    { level: "N3", focus: "Application: Intermediate comprehension and output discipline." },
  ];

  return (
    <section aria-labelledby="jlpt-timeline-title" className="rounded-2xl border border-slate-300/70 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] md:p-6">
      <h3 id="jlpt-timeline-title" className="text-lg font-semibold text-slate-900 md:text-xl">
        JLPT Progression Timeline
      </h3>
      <ol className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        {levels.map((item, index) => (
          <li key={item.level} className={cn("flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3.5", index === 1 && "border-brand-700/30")}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700">{item.level}</p>
            <p className="mt-1 text-xs text-slate-600">{item.focus}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WeeklyCommitmentChart() {
  const bars = [
    { label: "Light", hours: 3, x: 20, width: 54 },
    { label: "Standard", hours: 6, x: 104, width: 54 },
    { label: "Intensive", hours: 10, x: 188, width: 54 },
  ];

  return (
    <section aria-labelledby="weekly-commitment-title" className="rounded-2xl border border-slate-300/70 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] md:p-6">
      <h3 id="weekly-commitment-title" className="text-lg font-semibold text-slate-900 md:text-xl">
        Weekly Commitment Guide
      </h3>
      <p className="mt-1 text-xs text-slate-600">Compare realistic study loads by available hours per week.</p>
      <figure className="mt-4" aria-labelledby="weekly-commitment-title">
        <svg viewBox="0 0 264 170" role="img" aria-label="Bar chart comparing 3, 6, and 10 study hours per week" className="h-auto w-full rounded-lg border border-slate-200 bg-slate-50 p-2">
          <line x1="12" y1="146" x2="252" y2="146" stroke="#94a3b8" strokeWidth="1" />
          {bars.map((bar) => {
            const h = bar.hours * 10;
            const y = 146 - h;
            return (
              <g key={bar.label}>
                <rect
                  x={bar.x}
                  y={y}
                  width={bar.width}
                  height={h}
                  rx="8"
                  fill="#1f3a63"
                  style={{ transition: "height var(--motion-base) ease, y var(--motion-base) ease" }}
                />
                <text x={bar.x + bar.width / 2} y={160} textAnchor="middle" fontSize="10" fill="#334155">
                  {bar.label}
                </text>
                <text x={bar.x + bar.width / 2} y={y - 6} textAnchor="middle" fontSize="10" fill="#0f172a">
                  {bar.hours}h
                </text>
              </g>
            );
          })}
        </svg>
      </figure>
    </section>
  );
}

export function ImmersionSpectrum({ mode = "n5" }: { mode?: "n5" | "n4" | "n3" }) {
  const points = [
    { id: "n5", label: "English support", detail: "N5 meaning support with key Japanese terms." },
    { id: "n4", label: "Hiragana support", detail: "Japanese prompts with kana reading guidance." },
    { id: "n3", label: "Japanese-first", detail: "Minimal hints, full Japanese exposure." },
  ] as const;

  return (
    <section aria-labelledby="immersion-spectrum-title" className="rounded-2xl border border-slate-300/70 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] md:p-6">
      <h3 id="immersion-spectrum-title" className="text-lg font-semibold text-slate-900 md:text-xl">
        Immersion Spectrum
      </h3>
      <div className="mt-4">
        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-brand-700 transition-all duration-300"
            style={{ width: mode === "n5" ? "33%" : mode === "n4" ? "66%" : "100%" }}
            aria-hidden="true"
          />
        </div>
      </div>
      <ul className="mt-3 grid gap-2 md:grid-cols-3">
        {points.map((point) => (
          <li key={point.id} className={cn("rounded-xl border border-slate-200 bg-slate-50 p-3", point.id === mode && "border-brand-700/30 bg-brand-700/5")}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{point.id.toUpperCase()}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{point.label}</p>
            <p className="mt-1 text-xs text-slate-600">{point.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
