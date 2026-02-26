"use client";

import { useMemo } from "react";
import { Select } from "@/components/ui/select";

type ImmersionMode = "n5" | "n4" | "n3";

export function ImmersionModeToggle({
  mode,
  onChange,
}: {
  mode: ImmersionMode;
  onChange: (mode: ImmersionMode) => void;
}) {

  const descriptor = useMemo(() => {
    if (mode === "n5") return "N5 mode: English support for meaning alongside core Japanese terms.";
    if (mode === "n4") return "N4 mode: Japanese prompts with hiragana reading support.";
    return "N3 mode: Japanese-first prompts with minimal hints.";
  }, [mode]);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Immersion Mode</p>
      <div className="mt-2 max-w-xs">
        <Select value={mode} onChange={(event) => onChange(event.target.value as ImmersionMode)} aria-label="Immersion mode level">
          <option value="n5">N5 - English support</option>
          <option value="n4">N4 - Hiragana support</option>
          <option value="n3">N3 - Japanese-first</option>
        </Select>
      </div>
      <p className="mt-2 text-sm text-slate-600">{descriptor}</p>
    </div>
  );
}
