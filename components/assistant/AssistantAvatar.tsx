"use client";

import { forwardRef, useImperativeHandle, useState } from "react";

import type { AssistantState } from "@/components/assistant/AssistantController";
import { cn } from "@/lib/utils";

export type AssistantAvatarHandle = {
  setState: (state: AssistantState) => void;
};

export const AssistantAvatar = forwardRef<AssistantAvatarHandle, { className?: string }>(
  ({ className }, ref) => {
    const [state, setState] = useState<AssistantState>("idle");

    useImperativeHandle(ref, () => ({
      setState,
    }));

    return (
      <div className={cn("assistant-avatar", className)} data-state={state}>
        <div className="assistant-stage">
          <div className="assistant-thinking" aria-hidden="true">
            <span className="assistant-dot" />
            <span className="assistant-dot" />
            <span className="assistant-dot" />
          </div>

          <div className="assistant-sparkles" aria-hidden="true">
            <span className="assistant-sparkle" />
            <span className="assistant-sparkle" />
            <span className="assistant-sparkle" />
          </div>

          <div className="assistant-sweat" aria-hidden="true" />

          <svg
            viewBox="0 0 200 210"
            role="img"
            aria-label="Animated study buddy"
            className="assistant-figure assistant-figure--left"
          >
            <g fill="none" fillRule="evenodd">
              <rect x="28" y="92" width="118" height="98" rx="44" fill="#7dd3fc" stroke="#1f2937" strokeWidth="3" />
              <circle cx="88" cy="70" r="46" fill="#fde68a" stroke="#1f2937" strokeWidth="3" />
              <path d="M46 66c10-22 30-34 50-34 22 0 40 12 48 30-12-6-28-10-46-10-20 0-36 4-52 14z" fill="#1f2937" />
              <circle className="assistant-eye" cx="72" cy="70" r="5" fill="#1f2937" />
              <circle className="assistant-eye" cx="108" cy="70" r="5" fill="#1f2937" />
              <rect className="assistant-mouth" x="80" y="88" width="22" height="6" rx="3" fill="#1f2937" />
              <circle cx="62" cy="82" r="6" fill="#fbcfe8" />
              <circle cx="118" cy="82" r="6" fill="#fbcfe8" />
              <rect x="18" y="122" width="30" height="16" rx="8" fill="#7dd3fc" stroke="#1f2937" strokeWidth="3" />
              <rect x="128" y="122" width="30" height="16" rx="8" fill="#7dd3fc" stroke="#1f2937" strokeWidth="3" />
              <path className="assistant-ear-wave" d="M16 76c-10 6-10 20 0 26" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>

          <svg
            viewBox="0 0 200 210"
            role="img"
            aria-label="Animated study buddy"
            className="assistant-figure assistant-figure--right"
          >
            <g fill="none" fillRule="evenodd">
              <rect x="54" y="96" width="118" height="98" rx="44" fill="#fda4af" stroke="#1f2937" strokeWidth="3" />
              <circle cx="128" cy="72" r="44" fill="#a7f3d0" stroke="#1f2937" strokeWidth="3" />
              <path d="M102 72c8-18 22-28 40-28 20 0 36 10 44 26-10-4-24-6-40-6-18 0-32 2-44 8z" fill="#1f2937" />
              <circle className="assistant-eye" cx="112" cy="72" r="5" fill="#1f2937" />
              <circle className="assistant-eye" cx="144" cy="72" r="5" fill="#1f2937" />
              <rect className="assistant-mouth" x="122" y="90" width="22" height="6" rx="3" fill="#1f2937" />
              <circle cx="104" cy="84" r="6" fill="#fecdd3" />
              <circle cx="152" cy="84" r="6" fill="#fecdd3" />
              <rect x="74" y="130" width="30" height="16" rx="8" fill="#fda4af" stroke="#1f2937" strokeWidth="3" />
              <rect x="154" y="130" width="30" height="16" rx="8" fill="#fda4af" stroke="#1f2937" strokeWidth="3" />
              <path className="assistant-ear-wave" d="M180 84c10 6 10 20 0 26" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    );
  }
);

AssistantAvatar.displayName = "AssistantAvatar";
