"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { AssistantState } from "@/components/assistant/AssistantController";

const OPTION_CLASSES =
  "rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50";

function pickJapaneseVoice(voices: SpeechSynthesisVoice[]) {
  return (
    voices.find((voice) => voice.lang === "ja-JP") ||
    voices.find((voice) => voice.lang.startsWith("ja")) ||
    voices.find((voice) => /japan|japanese/i.test(voice.name)) ||
    null
  );
}

type ListenQuizProps = {
  prompt: string;
  options: string[];
  answer: string;
  onAssistantUpdate: (state: AssistantState, message: string) => void;
};

export function ListenQuiz({ prompt, options, answer, onAssistantUpdate }: ListenQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Choose an answer");
  const [audioError, setAudioError] = useState<string | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    queueMicrotask(() => setSpeechSupported("speechSynthesis" in window));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const handleVoices = () => {
      voiceRef.current = pickJapaneseVoice(synth.getVoices());
    };
    handleVoices();
    synth.onvoiceschanged = handleVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function stopAudioPlayback() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current = null;
  }

  function handleAudioFailure(message: string) {
    setStatusLabel("Audio unavailable");
    setAudioError(message);
    onAssistantUpdate("fail", message);
  }

  function playWithSpeechSynthesis() {
    if (!speechSupported || typeof window === "undefined") return false;

    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(prompt);
    utterance.lang = "ja-JP";
    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setStatusLabel("Listening...");
      onAssistantUpdate("speaking", "Listen closely...");
    };
    utterance.onend = () => {
      setStatusLabel("Choose an answer");
      onAssistantUpdate("idle", "Pick the best match.");
    };
    synth.speak(utterance);
    return true;
  }

  function playAudio() {
    if (typeof window === "undefined") return;
    stopAudioPlayback();
    setAudioError(null);

    if (playWithSpeechSynthesis()) {
      return;
    }

    setStatusLabel("Loading audio...");
    onAssistantUpdate("thinking", "Loading audio...");

    void (async () => {
      try {
        const response = await fetch(`/api/japanese/tts?text=${encodeURIComponent(prompt)}&lang=ja-JP`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          const fallbackMessage =
            "Sorry, this part is not working right now. Please try again shortly.";
          const message = payload?.error?.trim() || fallbackMessage;

          if (!playWithSpeechSynthesis()) {
            handleAudioFailure(message);
          }
          return;
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const audio = new Audio(objectUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          setStatusLabel("Listening...");
          onAssistantUpdate("speaking", "Listen closely...");
        };
        audio.onended = () => {
          setStatusLabel("Choose an answer");
          onAssistantUpdate("idle", "Pick the best match.");
          URL.revokeObjectURL(objectUrl);
        };
        audio.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          if (!playWithSpeechSynthesis()) {
            handleAudioFailure("Sorry, this part is not working right now. Please try again shortly.");
          }
        };

        await audio.play().catch(() => {
          URL.revokeObjectURL(objectUrl);
          if (!playWithSpeechSynthesis()) {
            handleAudioFailure("Sorry, this part is not working right now. Please try again shortly.");
          }
        });
      } catch {
        if (!playWithSpeechSynthesis()) {
          handleAudioFailure("Sorry, this part is not working right now. Please try again shortly.");
        }
      }
    })();
  }

  function handleSelect(option: string) {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    if (option === answer) {
      setStatusLabel("Correct!");
      onAssistantUpdate("success", "Nice! That's correct.");
    } else {
      setStatusLabel("Try again");
      onAssistantUpdate("fail", "Not quite. Try again.");
    }
  }

  function resetQuestion() {
    stopAudioPlayback();
    setSelected(null);
    setRevealed(false);
    setStatusLabel("Choose an answer");
    setAudioError(null);
    onAssistantUpdate("idle", "Ready for another one.");
  }

  return (
    <div className="space-y-5 rounded-[28px] border border-sky-100 bg-white/95 p-6 shadow-[0_16px_28px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Listen
        </span>
        <span className="text-xs font-medium text-slate-500">Status: {statusLabel}</span>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Listen and choose</h3>
        <p className="mt-2 text-sm text-slate-600">Press play, then pick the sentence you hear.</p>
      </div>

      <Button
        type="button"
        onClick={playAudio}
        className="rounded-full bg-slate-900 px-5 text-sm text-white hover:bg-slate-800"
      >
        Listen
      </Button>

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

      {audioError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {audioError}
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
