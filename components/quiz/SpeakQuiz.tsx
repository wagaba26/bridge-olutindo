"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { AssistantState } from "@/components/assistant/AssistantController";

const MATCH_THRESHOLD = 0.75;

type SpeakQuizProps = {
  prompt: string;
  targetPhrase: string;
  onAssistantUpdate: (state: AssistantState, message: string) => void;
};

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: Array<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionError = {
  error?: string;
};

type SpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognition;

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u3001\u3002\uff01\uff1f\s]/g, "")
    .replace(/[!?.\uff0c\uff0e]/g, "")
    .trim();
}

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function similarityRatio(a: string, b: string) {
  const left = normalizeText(a);
  const right = normalizeText(b);
  if (!left && !right) return 1;
  if (!left || !right) return 0;
  const distance = levenshtein(left, right);
  const maxLen = Math.max(left.length, right.length);
  return 1 - distance / maxLen;
}

function pickJapaneseVoice(voices: SpeechSynthesisVoice[]) {
  return (
    voices.find((voice) => voice.lang === "ja-JP") ||
    voices.find((voice) => voice.lang.startsWith("ja")) ||
    voices.find((voice) => /japan|japanese/i.test(voice.name)) ||
    null
  );
}

export function SpeakQuiz({ prompt, targetPhrase, onAssistantUpdate }: SpeakQuizProps) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Ready");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const recognitionCtorRef = useRef<SpeechRecognitionCtor | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const interimRef = useRef("");
  const finalRef = useRef("");
  const evaluatedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    queueMicrotask(() => setSpeechSupported("speechSynthesis" in window));
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const ctor = win.SpeechRecognition || win.webkitSpeechRecognition || null;
    recognitionCtorRef.current = ctor;
    queueMicrotask(() => setRecognitionSupported(Boolean(ctor)));
    if (!ctor) return;

    const recognition = new ctor();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setIsListening(true);
      setStatusLabel("Listening...");
    };
    recognition.onresult = (event) => {
      let interim = "";
      let finalText = finalRef.current;
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalText = `${finalText} ${transcript}`.trim();
        } else {
          interim += transcript;
        }
      }
      interimRef.current = interim;
      finalRef.current = finalText;
      setInterimTranscript(interim);
      if (finalText) {
        setFinalTranscript(finalText);
      }
    };
    recognition.onerror = (event) => {
      setIsListening(false);
      const error = event?.error;
      const message =
        error === "not-allowed" || error === "service-not-allowed"
          ? "Microphone access is blocked. Please allow it and try again."
          : "We could not hear you clearly. Try again.";
      setErrorMessage(message);
      setStatusLabel("Mic issue");
      onAssistantUpdate("fail", "Mic issue. Try again.");
    };
    recognition.onend = () => {
      setIsListening(false);
      const spoken = finalRef.current || interimRef.current;
      if (!spoken) {
        setStatusLabel("No speech detected");
        onAssistantUpdate("fail", "No speech detected.");
        return;
      }
      if (evaluatedRef.current) return;
      evaluatedRef.current = true;
      setFinalTranscript(spoken);
      handleEvaluation(spoken);
    };
    recognitionRef.current = recognition;

    return () => recognition.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function clearTimer() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function handleEvaluation(utterance: string) {
    const similarity = similarityRatio(utterance, targetPhrase);
    setScore(similarity);
    setResultMessage(
      similarity >= MATCH_THRESHOLD
        ? "Nice work. You matched most of the phrase."
        : "Almost there. Try again, slower and clearer."
    );
    setStatusLabel("Checking...");
    onAssistantUpdate("thinking", "Checking...");
    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      if (similarity >= MATCH_THRESHOLD) {
        setStatusLabel("Nice work!");
        onAssistantUpdate("success", "Nice work!");
      } else {
        setStatusLabel("Try again");
        onAssistantUpdate("fail", "Try again.");
      }
    }, 600);
  }

  function startListening() {
    if (!recognitionRef.current || isListening) return;
    clearTimer();
    evaluatedRef.current = false;
    interimRef.current = "";
    finalRef.current = "";
    setErrorMessage(null);
    setFinalTranscript("");
    setInterimTranscript("");
    setResultMessage(null);
    setScore(null);
    setStatusLabel("Listening...");
    onAssistantUpdate("listening", "Listening...");
    try {
      recognitionRef.current.start();
    } catch {
      setIsListening(false);
    }
  }

  function stopListening() {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
    setStatusLabel("Checking...");
  }

  function stopAudioPlayback() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current = null;
  }

  function playModelWithSpeechSynthesis() {
    if (!speechSupported || typeof window === "undefined") return false;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(targetPhrase);
    utterance.lang = "ja-JP";
    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onstart = () => onAssistantUpdate("speaking", "Playing the model answer...");
    utterance.onend = () => onAssistantUpdate("idle", "Your turn.");
    synth.speak(utterance);
    return true;
  }

  function playModelAnswer() {
    if (typeof window === "undefined") return;
    stopAudioPlayback();
    setErrorMessage(null);

    void (async () => {
      try {
        const response = await fetch(`/api/japanese/tts?text=${encodeURIComponent(targetPhrase)}&lang=ja-JP`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          const fallbackMessage = "Sorry, this part is not working right now. Please try again shortly.";
          const message = payload?.error?.trim() || fallbackMessage;
          setErrorMessage(message);
          if (!playModelWithSpeechSynthesis()) {
            onAssistantUpdate("fail", message);
          }
          return;
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const audio = new Audio(objectUrl);
        audioRef.current = audio;
        audio.onplay = () => onAssistantUpdate("speaking", "Playing the model answer...");
        audio.onended = () => {
          onAssistantUpdate("idle", "Your turn.");
          URL.revokeObjectURL(objectUrl);
        };
        audio.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          if (!playModelWithSpeechSynthesis()) {
            setErrorMessage("Sorry, this part is not working right now. Please try again shortly.");
            onAssistantUpdate("fail", "Audio unavailable.");
          }
        };

        await audio.play().catch(() => {
          URL.revokeObjectURL(objectUrl);
          if (!playModelWithSpeechSynthesis()) {
            setErrorMessage("Sorry, this part is not working right now. Please try again shortly.");
            onAssistantUpdate("fail", "Audio unavailable.");
          }
        });
      } catch {
        if (!playModelWithSpeechSynthesis()) {
          const message = "Sorry, this part is not working right now. Please try again shortly.";
          setErrorMessage(message);
          onAssistantUpdate("fail", message);
        }
      }
    })();
  }

  function handleManualCheck() {
    if (!manualInput.trim()) return;
    const trimmed = manualInput.trim();
    setFinalTranscript(trimmed);
    evaluatedRef.current = true;
    handleEvaluation(trimmed);
  }

  function resetExercise() {
    clearTimer();
    stopAudioPlayback();
    evaluatedRef.current = false;
    interimRef.current = "";
    finalRef.current = "";
    setFinalTranscript("");
    setInterimTranscript("");
    setResultMessage(null);
    setScore(null);
    setStatusLabel("Ready");
    setErrorMessage(null);
    onAssistantUpdate("idle", "Ready when you are.");
  }

  const progress = score !== null ? Math.round(score * 100) : 0;

  return (
    <div className="space-y-5 rounded-[28px] border border-emerald-100 bg-white/95 p-6 shadow-[0_16px_28px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Speak
        </span>
        <span className="text-xs font-medium text-slate-500">Status: {statusLabel}</span>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Say it out loud</h3>
        <p className="mt-2 text-sm text-slate-600">
          Prompt: <span className="font-semibold text-slate-900">{prompt}</span>
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Target phrase</p>
        <p className="mt-2 text-lg font-semibold text-emerald-900">{targetPhrase}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={startListening}
          disabled={!recognitionSupported || isListening}
          className="rounded-full bg-emerald-600 px-5 text-sm text-white hover:bg-emerald-700"
        >
          {isListening ? "Listening..." : "Speak"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={stopListening}
          disabled={!recognitionSupported || !isListening}
          className="rounded-full border-emerald-200 px-4 text-sm"
        >
          Stop
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={playModelAnswer}
          className="rounded-full border-slate-200 px-4 text-sm"
        >
          Listen
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={resetExercise}
          className="rounded-full px-3 text-xs text-slate-500"
        >
          Reset
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Live transcript</p>
        <p className="mt-2 min-h-[1.5rem]">{interimTranscript || finalTranscript || "Waiting for your voice..."}</p>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {errorMessage}
        </div>
      ) : null}

      {!recognitionSupported ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Speech recognition is not supported here. Type what you said and we will check it.
        </div>
      ) : null}

      <div className="space-y-2" hidden={recognitionSupported}>
        <textarea
          value={manualInput}
          onChange={(event) => setManualInput(event.target.value)}
          className="min-h-24 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          placeholder="Type your spoken Japanese here..."
        />
        <Button
          type="button"
          onClick={handleManualCheck}
          disabled={recognitionSupported}
          className="rounded-full bg-slate-900 text-white"
        >
          Check my answer
        </Button>
      </div>

      {score !== null ? (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">Match score: {progress}%</p>
        </div>
      ) : null}

      {resultMessage ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          {resultMessage}
        </div>
      ) : null}
    </div>
  );
}
