"use client";

import { useState } from "react";

import { AssistantState } from "@/components/assistant/AssistantController";
import { Button } from "@/components/ui/button";

const OPTION_CLASSES =
  "rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50";

type ReadingQuizProps = {
  prompt: string;
  helper: string;
  options: string[];
  answer: string;
  onAssistantUpdate: (state: AssistantState, message: string) => void;
};

export function ReadingQuiz({ prompt, helper, options, answer, onAssistantUpdate }: ReadingQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Choose an answer");

  function handleSelect(option: string) {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    if (option === answer) {
      setStatusLabel("Correct!");
      onAssistantUpdate("success", "Nice reading work.");
    } else {
      setStatusLabel("Try again");
      onAssistantUpdate("fail", "Not quite. Try reading once more.");
    }
  }

  function resetQuestion() {
    setSelected(null);
    setRevealed(false);
    setStatusLabel("Choose an answer");
    onAssistantUpdate("idle", "Ready for another reading prompt.");
  }

  return (
    <div className="space-y-5 rounded-[28px] border border-amber-100 bg-white/95 p-6 shadow-[0_16px_28px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          Read
        </span>
        <span className="text-xs font-medium text-slate-500">Status: {statusLabel}</span>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Read and choose</h3>
        <p className="mt-2 text-sm text-slate-600">{helper}</p>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-700">Prompt</p>
        <p className="mt-2 text-lg font-semibold text-amber-900">{prompt}</p>
      </div>

      <div className="grid gap-3">
        {options.map((option) => {
          const isCorrect = revealed && option === answer;
          const isIncorrect = revealed && option === selected && option !== answer;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`${OPTION_CLASSES} ${
                isCorrect
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : isIncorrect
                    ? "border-rose-400 bg-rose-50 text-rose-800"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          Correct answer: <span className="font-semibold text-slate-900">{answer}</span>
        </div>
      ) : null}

      {revealed ? (
        <Button type="button" variant="outline" onClick={resetQuestion} className="rounded-full px-4 text-sm">
          Try another
        </Button>
      ) : null}
    </div>
  );
}

