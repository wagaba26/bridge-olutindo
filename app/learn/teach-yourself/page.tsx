"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StudyBuddies } from "@/components/site/study-buddies";
import { useSiteLanguage } from "@/components/site/language-provider";
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";

type Level = "N5" | "N4" | "N3";
type QuestionType = "meaning" | "reading" | "context" | "listening";

type WordItem = {
  id: string;
  level: Level;
  kana: string;
  reading: string;
  romaji: string;
  meaning: string;
  context: string;
};

type QuizQuestion = {
  id: string;
  level: Level;
  type: QuestionType;
  prompt: string;
  helper: string;
  options: string[];
  answer: string;
  detail: string;
  reading?: string;
  audioText?: string;
  showRomaji?: boolean;
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: { results?: Array<Array<{ transcript?: string }>> }) => void) | null;
  start: () => void;
  stop: () => void;
};

type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognition;
type SupportedLocale = "en" | "ja";

const QUESTION_COPY = {
  en: {
    readingPrompt: (kana: string) => `What is the correct reading for "${kana}"?`,
    readingHelperKana: "Choose the correct hiragana/katakana reading.",
    readingHelperRomaji: "Choose the correct romaji reading.",
    listeningPrompt: "Listen and choose the correct Japanese term.",
    listeningHelper: "Tap play to hear the word.",
    contextPrompt: "Choose the best Japanese term for this context.",
    meaningPromptWithRomaji: (kana: string, romaji: string) => `What does "${kana}" (${romaji}) mean?`,
    meaningPrompt: (kana: string) => `What does "${kana}" mean?`,
    meaningHelper: "Choose the best English meaning.",
    detail: (kana: string, reading: string, meaning: string) => `${kana} (${reading}) means "${meaning}".`,
  },
  ja: {
    readingPrompt: (kana: string) => `「${kana}」の読みとして正しいものは？`,
    readingHelperKana: "正しいひらがな・カタカナの読みを選んでください。",
    readingHelperRomaji: "正しいローマ字読みを選んでください。",
    listeningPrompt: "音声を聞いて、正しい日本語を選んでください。",
    listeningHelper: "再生してから選択します。",
    contextPrompt: "文脈に合う最適な日本語を選んでください。",
    meaningPromptWithRomaji: (kana: string, romaji: string) => `「${kana}」（${romaji}）の意味として正しいものは？`,
    meaningPrompt: (kana: string) => `「${kana}」の意味として正しいものは？`,
    meaningHelper: "最も適切な意味を選んでください。",
    detail: (kana: string, reading: string, meaning: string) => `${kana}（${reading}）は「${meaning}」です。`,
  },
} as const;

const UI_COPY = {
  en: {
    sectionEyebrow: "Teach Yourself",
    sectionTitle: "Progressive Japanese practice with less romaji as you advance.",
    sectionDescription: "N5 introduces support, N4 shifts into kana-heavy reading, and N3 prioritizes context, listening, and immersion.",
    backToLearn: "Back to Learn",
    livePractice: "Live Practice",
    dailyLimitCompleted: (limit: number) => `You have completed today's limit (${limit} questions).`,
    unlockAuthLimit: (limit: number) => `Log in to unlock up to ${limit} per day.`,
    modeDaily: (level: Level) => `${level} daily question`,
    modeReview: (level: Level) => `${level} review mode`,
    playAudio: "Play audio",
    audioUnavailable: "Audio unavailable",
    listenHint: "Listen first, then select the matching term.",
    readingLabel: "Reading",
    showReading: "Show reading (hiragana/katakana)",
    feedbackCorrect: "Correct. Keep your rhythm.",
    feedbackIncorrect: (detail: string) => `Not correct. ${detail}`,
    progressDaily: (current: number, limit: number) => `Question ${current} of ${limit}`,
    progressReview: (current: number, total: number) => `Review ${current} of ${total}`,
    startReview: (count: number) => `Start review (${count})`,
    next: "Next",
    performance: "Performance",
    todayScore: "Today score",
    dailyStreak: "Daily streak",
    dayUnit: "day(s)",
    lastSessions: "Last sessions",
    speakingPractice: "Speaking practice",
    prompt: "Prompt",
    startSpeaking: "Start speaking",
    listeningState: "Listening...",
    speechUnsupported: "Speech recognition is not available in this browser. Use the prompt to practice aloud.",
    heard: (text: string) => `Heard: ${text}`,
    newPrompt: "New prompt",
    speakingMatched: "Matched. Keep that pace and clarity.",
    speakingTarget: (heard: string, target: string) => `Heard "${heard || "..."}". Aim for "${target}".`,
    levelLogic: "Level logic",
    logic1: "1. N5: supports romaji while introducing kana and basic listening.",
    logic2: "2. N4: shifts to kana-heavy reading with listening checkpoints.",
    logic3: "3. N3: context + listening emphasis with minimal romaji.",
    joinGuidedClass: "Join a guided class",
    unlockMorePractice: "Unlock more practice",
    guestLimit: (guestLimit: number, authLimit: number) => `Guest limit is ${guestLimit} questions/day. Members get up to ${authLimit} per day.`,
    login: "Log in",
    signup: "Sign up",
  },
  ja: {
    sectionEyebrow: "独学トレーニング",
    sectionTitle: "レベルが上がるほどローマ字依存を減らす段階型トレーニング。",
    sectionDescription: "N5は導入支援、N4はかな読解中心、N3は文脈・聴解・実運用を重視した設計です。",
    backToLearn: "学習ページへ戻る",
    livePractice: "実践ドリル",
    dailyLimitCompleted: (limit: number) => `本日の上限（${limit}問）に到達しました。`,
    unlockAuthLimit: (limit: number) => `ログインすると1日あたり最大${limit}問まで利用できます。`,
    modeDaily: (level: Level) => `${level} 日次問題`,
    modeReview: (level: Level) => `${level} 復習モード`,
    playAudio: "音声を再生",
    audioUnavailable: "音声再生を利用できません",
    listenHint: "まず再生し、聞こえた語を選択してください。",
    readingLabel: "読み",
    showReading: "読みを表示（ひらがな・カタカナ）",
    feedbackCorrect: "正解です。テンポを保って続けましょう。",
    feedbackIncorrect: (detail: string) => `不正解です。${detail}`,
    progressDaily: (current: number, limit: number) => `${current} / ${limit} 問`,
    progressReview: (current: number, total: number) => `復習 ${current} / ${total}`,
    startReview: (count: number) => `復習を開始（${count}）`,
    next: "次へ",
    performance: "学習結果",
    todayScore: "本日の正答率",
    dailyStreak: "連続学習",
    dayUnit: "日",
    lastSessions: "最近の記録",
    speakingPractice: "発話練習",
    prompt: "お題",
    startSpeaking: "発話を開始",
    listeningState: "音声を認識中...",
    speechUnsupported: "このブラウザでは音声認識が使えません。表示された語を見て発話練習してください。",
    heard: (text: string) => `認識結果: ${text}`,
    newPrompt: "新しいお題",
    speakingMatched: "一致しました。今の発話テンポを維持しましょう。",
    speakingTarget: (heard: string, target: string) => `「${heard || "..."}」と認識されました。目標は「${target}」です。`,
    levelLogic: "レベル設計",
    logic1: "1. N5: ローマ字補助を使いながら、かなと基礎聴解を導入。",
    logic2: "2. N4: かな中心の読解に移行し、聴解チェックを強化。",
    logic3: "3. N3: 文脈理解と聴解を中心に、ローマ字依存を最小化。",
    joinGuidedClass: "ガイド付きクラスに参加",
    unlockMorePractice: "追加練習を解放",
    guestLimit: (guestLimit: number, authLimit: number) => `ゲストは1日${guestLimit}問まで。メンバーは1日最大${authLimit}問まで利用できます。`,
    login: "ログイン",
    signup: "新規登録",
  },
} as const;

const WORD_BANK: WordItem[] = [
  { id: "n5-konnichiwa", level: "N5", kana: "こんにちは", reading: "こんにちは", romaji: "konnichiwa", meaning: "Hello", context: "A polite greeting when meeting someone in daytime." },
  { id: "n5-arigatou", level: "N5", kana: "ありがとう", reading: "ありがとう", romaji: "arigatou", meaning: "Thank you", context: "Use this when expressing gratitude to someone." },
  { id: "n5-sumimasen", level: "N5", kana: "すみません", reading: "すみません", romaji: "sumimasen", meaning: "Excuse me", context: "Use this to get attention politely or apologize lightly." },
  { id: "n5-eki", level: "N5", kana: "駅", reading: "えき", romaji: "eki", meaning: "Station", context: "A place where trains arrive and depart." },
  { id: "n5-mizu", level: "N5", kana: "水", reading: "みず", romaji: "mizu", meaning: "Water", context: "A basic noun used in daily requests at meals." },
  { id: "n5-benkyou", level: "N5", kana: "勉強", reading: "べんきょう", romaji: "benkyou", meaning: "Study", context: "A core word for school and language learning routines." },
  { id: "n5-koohii", level: "N5", kana: "コーヒー", reading: "コーヒー", romaji: "koohii", meaning: "Coffee", context: "Common loanword used when ordering drinks." },
  { id: "n5-basu", level: "N5", kana: "バス", reading: "バス", romaji: "basu", meaning: "Bus", context: "A transport term you use for directions and travel." },

  { id: "n4-junbi", level: "N4", kana: "準備", reading: "じゅんび", romaji: "junbi", meaning: "Preparation", context: "Actions done before an exam or travel step." },
  { id: "n4-keikaku", level: "N4", kana: "計画", reading: "けいかく", romaji: "keikaku", meaning: "Plan", context: "A structured schedule with tasks and milestones." },
  { id: "n4-kakunin", level: "N4", kana: "確認", reading: "かくにん", romaji: "kakunin", meaning: "Confirm", context: "Checking details to avoid mistakes." },
  { id: "n4-tsuzukeru", level: "N4", kana: "続ける", reading: "つづける", romaji: "tsuzukeru", meaning: "Continue", context: "Keep doing an action over time." },
  { id: "n4-henkou", level: "N4", kana: "変更", reading: "へんこう", romaji: "henkou", meaning: "Change", context: "Modify a schedule or previously agreed arrangement." },
  { id: "n4-shitsumon", level: "N4", kana: "質問", reading: "しつもん", romaji: "shitsumon", meaning: "Question", context: "Ask for clarification in class or meetings." },
  { id: "n4-sukejuuru", level: "N4", kana: "スケジュール", reading: "スケジュール", romaji: "sukejuuru", meaning: "Schedule", context: "A planned timetable for tasks and activities." },
  { id: "n4-miitingu", level: "N4", kana: "ミーティング", reading: "ミーティング", romaji: "miitingu", meaning: "Meeting", context: "A formal or informal gathering for coordination." },

  { id: "n3-sekinin", level: "N3", kana: "責任", reading: "せきにん", romaji: "sekinin", meaning: "Responsibility", context: "Who is accountable for a decision or result." },
  { id: "n3-kaiketsu", level: "N3", kana: "解決", reading: "かいけつ", romaji: "kaiketsu", meaning: "Resolution", context: "Finding a workable solution to a problem." },
  { id: "n3-kouritsu", level: "N3", kana: "効率", reading: "こうりつ", romaji: "kouritsu", meaning: "Efficiency", context: "Improving output while reducing wasted effort." },
  { id: "n3-yuusen", level: "N3", kana: "優先", reading: "ゆうせん", romaji: "yuusen", meaning: "Priority", context: "Deciding what should be handled first." },
  { id: "n3-shinten", level: "N3", kana: "進展", reading: "しんてん", romaji: "shinten", meaning: "Progress", context: "The current advancement status of a project." },
  { id: "n3-chousei", level: "N3", kana: "調整", reading: "ちょうせい", romaji: "chousei", meaning: "Adjustment", context: "Fine-tuning timing, scope, or expectations." },
  { id: "n3-purojekuto", level: "N3", kana: "プロジェクト", reading: "プロジェクト", romaji: "purojekuto", meaning: "Project", context: "A planned set of tasks with a shared goal." },
  { id: "n3-komyunikeeshon", level: "N3", kana: "コミュニケーション", reading: "コミュニケーション", romaji: "komyunikeeshon", meaning: "Communication", context: "The exchange of information across a team." },
];

const STORAGE_KEY = "teach-yourself-v4";
const GUEST_DAILY_LIMIT = 15;
const AUTH_DAILY_LIMIT = 40;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey(today: string) {
  const date = new Date(`${today}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function hash(text: string) {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) {
    value = (value << 5) - value + text.charCodeAt(i);
    value |= 0;
  }
  return Math.abs(value);
}

function seededShuffle<T>(items: T[], seed: number) {
  const list = [...items];
  let state = seed || 1;
  for (let i = list.length - 1; i > 0; i -= 1) {
    state = (state * 9301 + 49297) % 233280;
    const index = Math.floor((state / 233280) * (i + 1));
    [list[i], list[index]] = [list[index], list[i]];
  }
  return list;
}

function pickDistractors(values: string[], answer: string, seed: number) {
  return seededShuffle(
    values.filter((value) => value !== answer),
    seed
  )
    .filter((value, index, arr) => arr.indexOf(value) === index)
    .slice(0, 3);
}

function buildQuestion(
  word: WordItem,
  levelWords: WordItem[],
  seed: number,
  sequenceIndex: number,
  language: SupportedLocale
): QuizQuestion {
  const levelTypeOrder: Record<Level, QuestionType[]> = {
    N5: ["meaning", "reading"],
    N4: ["meaning", "reading", "listening"],
    N3: ["context", "reading", "listening", "meaning"],
  };
  const questionCopy = QUESTION_COPY[language];

  const questionType = levelTypeOrder[word.level][sequenceIndex % levelTypeOrder[word.level].length];
  const useKanaReading = word.level !== "N5";
  const readingValue = useKanaReading ? word.reading : word.romaji;
  const readingOptionsSource = useKanaReading ? levelWords.map((item) => item.reading) : levelWords.map((item) => item.romaji);

  if (questionType === "reading") {
    const options = seededShuffle([readingValue, ...pickDistractors(readingOptionsSource, readingValue, seed + 11)], seed + 13);
    return {
      id: `${word.id}-reading`,
      level: word.level,
      type: "reading",
      prompt: questionCopy.readingPrompt(word.kana),
      helper: useKanaReading ? questionCopy.readingHelperKana : questionCopy.readingHelperRomaji,
      options,
      answer: readingValue,
      detail: `${word.kana} = ${word.reading}`,
      reading: word.reading,
      showRomaji: word.level === "N5",
    };
  }

  if (questionType === "listening") {
    const answer = word.kana;
    const options = seededShuffle([answer, ...pickDistractors(levelWords.map((item) => item.kana), answer, seed + 21)], seed + 23);
    return {
      id: `${word.id}-listening`,
      level: word.level,
      type: "listening",
      prompt: questionCopy.listeningPrompt,
      helper: questionCopy.listeningHelper,
      options,
      answer,
      detail: questionCopy.detail(word.kana, word.reading, word.meaning),
      reading: word.reading,
      audioText: word.reading,
    };
  }

  if (questionType === "context") {
    const answer = word.kana;
    const options = seededShuffle([answer, ...pickDistractors(levelWords.map((item) => item.kana), answer, seed + 31)], seed + 33);
    return {
      id: `${word.id}-context`,
      level: word.level,
      type: "context",
      prompt: questionCopy.contextPrompt,
      helper: word.context,
      options,
      answer,
      detail: questionCopy.detail(word.kana, word.reading, word.meaning),
      reading: word.reading,
    };
  }

  const answer = word.meaning;
  const options = seededShuffle([answer, ...pickDistractors(levelWords.map((item) => item.meaning), answer, seed + 41)], seed + 43);
  const showRomaji = word.level === "N5";
  return {
    id: `${word.id}-meaning`,
    level: word.level,
    type: "meaning",
    prompt: showRomaji
      ? questionCopy.meaningPromptWithRomaji(word.kana, word.romaji)
      : questionCopy.meaningPrompt(word.kana),
    helper: questionCopy.meaningHelper,
    options,
    answer,
    detail: questionCopy.detail(word.kana, word.reading, word.meaning),
    reading: word.reading,
    showRomaji,
  };
}

export default function TeachYourselfPage() {
  const { locale } = useSiteLanguage();
  const language: SupportedLocale = locale === "ja" ? "ja" : "en";
  const copy = UI_COPY[language];
  const speakingMatchedText = copy.speakingMatched;
  const formatSpeakingTarget = copy.speakingTarget;
  const authEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [level, setLevel] = useState<Level>("N5");
  const [today] = useState(getTodayKey);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(!authEnabled);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [reviewQueue, setReviewQueue] = useState<QuizQuestion[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"daily" | "review">("daily");
  const [showReading, setShowReading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingActive, setSpeakingActive] = useState(false);
  const [speakingTranscript, setSpeakingTranscript] = useState("");
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speakingSupported, setSpeakingSupported] = useState(false);
  const [supportChecked, setSupportChecked] = useState(false);

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const speakingWordRef = useRef<WordItem | null>(null);

  useEffect(() => {
    if (!authEnabled) return;
    const supabase = createSupabaseBrowserClientOrNull();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      setAuthResolved(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setAuthResolved(true);
    });
    return () => data.subscription.unsubscribe();
  }, [authEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    queueMicrotask(() => setSpeechSupported("speechSynthesis" in window));
    const win = window as unknown as {
      SpeechRecognition?: BrowserSpeechRecognitionCtor;
      webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
    };
    const ctor = win.SpeechRecognition || win.webkitSpeechRecognition || null;
    queueMicrotask(() => setSpeakingSupported(Boolean(ctor)));
    queueMicrotask(() => setSupportChecked(true));
    if (!ctor) return;
    const recognition = new ctor();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setSpeakingActive(true);
    recognition.onend = () => setSpeakingActive(false);
    recognition.onerror = () => setSpeakingActive(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      setSpeakingTranscript(transcript);
      const normalized = transcript.replace(/\s+/g, "");
      const targetKana = (speakingWordRef.current?.kana ?? "").replace(/\s+/g, "");
      const targetReading = (speakingWordRef.current?.reading ?? "").replace(/\s+/g, "");
      if (normalized && (normalized === targetKana || normalized === targetReading)) {
        setSpeakingFeedback(speakingMatchedText);
      } else {
        setSpeakingFeedback(formatSpeakingTarget(transcript, targetReading));
      }
    };
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [formatSpeakingTarget, speakingMatchedText]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const dailyLimit = isAuthenticated ? AUTH_DAILY_LIMIT : GUEST_DAILY_LIMIT;
  const yesterday = useMemo(() => getYesterdayKey(today), [today]);
  const words = useMemo(() => WORD_BANK.filter((item) => item.level === level), [level]);

  const dailyWords = useMemo(() => seededShuffle(words, hash(`${today}-${level}`)), [today, level, words]);

  const speakingWord = useMemo(() => {
    if (!words.length) return null;
    return words[speakingIndex % words.length];
  }, [words, speakingIndex]);

  useEffect(() => {
    speakingWordRef.current = speakingWord;
  }, [speakingWord]);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(`${STORAGE_KEY}-${isAuthenticated ? "auth" : "guest"}-${level}`);
    if (!stored) {
      queueMicrotask(() => {
        setAnswered(0);
        setCorrect(0);
        setIndex(0);
        setReviewQueue([]);
        setReviewIndex(0);
        setMode("daily");
      });
      return;
    }
    try {
      const parsed = JSON.parse(stored) as {
        date: string;
        answered: number;
        correct: number;
        streak: number;
        history: Record<string, number>;
      };
      if (parsed.date !== today) {
        queueMicrotask(() => {
          setAnswered(0);
          setCorrect(0);
          setIndex(0);
        });
      } else {
        queueMicrotask(() => {
          setAnswered(parsed.answered);
          setCorrect(parsed.correct);
          setIndex(Math.min(parsed.answered, dailyLimit));
        });
      }
      queueMicrotask(() => {
        setStreak(parsed.streak ?? 0);
        setHistory(parsed.history ?? {});
        setReviewQueue([]);
        setReviewIndex(0);
        setMode("daily");
      });
    } catch {
      queueMicrotask(() => {
        setAnswered(0);
        setCorrect(0);
        setIndex(0);
      });
    }
  }, [isAuthenticated, level, today, dailyLimit]);

  function persist(nextAnswered: number, nextCorrect: number, nextHistory: Record<string, number>, nextStreak: number) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      `${STORAGE_KEY}-${isAuthenticated ? "auth" : "guest"}-${level}`,
      JSON.stringify({
        date: today,
        answered: nextAnswered,
        correct: nextCorrect,
        streak: nextStreak,
        history: nextHistory,
      })
    );
  }

  const limitReached = answered >= dailyLimit;

  const currentQuestion = useMemo(() => {
    if (mode === "review") return reviewQueue[Math.min(reviewIndex, Math.max(reviewQueue.length - 1, 0))] ?? null;
    const currentWord = dailyWords[Math.min(index, Math.max(dailyWords.length - 1, 0))];
    if (!currentWord) return null;
    return buildQuestion(currentWord, words, hash(`${today}-${currentWord.id}-${index}`), index, language);
  }, [mode, reviewQueue, reviewIndex, dailyWords, index, words, today, language]);

  function playAudio(text: string) {
    if (!speechSupported || typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
  }

  function submitAnswer(option: string) {
    if (!currentQuestion || selected) return;
    setSelected(option);
    setFeedback(
      option === currentQuestion.answer
        ? copy.feedbackCorrect
        : copy.feedbackIncorrect(currentQuestion.detail)
    );

    if (mode === "daily") {
      const nextAnswered = Math.min(answered + 1, dailyLimit);
      const nextCorrect = correct + (option === currentQuestion.answer ? 1 : 0);
      const nextHistory = { ...history, [today]: Math.round((nextCorrect / Math.max(nextAnswered, 1)) * 100) };
      const hadYesterday = Boolean(history[yesterday]);
      const nextStreak = answered === 0 && !history[today] ? (hadYesterday ? streak + 1 : 1) : streak;

      if (option !== currentQuestion.answer) setReviewQueue((prev) => [...prev, currentQuestion]);
      setAnswered(nextAnswered);
      setCorrect(nextCorrect);
      setHistory(nextHistory);
      setStreak(nextStreak);
      persist(nextAnswered, nextCorrect, nextHistory, nextStreak);
      return;
    }

    if (option !== currentQuestion.answer) {
      setReviewQueue((prev) => [...prev, currentQuestion]);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setFeedback(null);
    setShowReading(false);
    if (mode === "daily") {
      setIndex((prev) => prev + 1);
      return;
    }
    if (reviewIndex >= reviewQueue.length - 1) {
      setMode("daily");
      setReviewIndex(0);
      return;
    }
    setReviewIndex((prev) => prev + 1);
  }

  function startSpeakingPractice() {
    if (!recognitionRef.current) return;
    setSpeakingTranscript("");
    setSpeakingFeedback(null);
    recognitionRef.current.start();
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-6 px-4 py-14 md:py-20">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />
          <div className="flex flex-wrap gap-2">
            {(["N5", "N4", "N3"] as Level[]).map((item) => (
              <Button
                key={item}
                variant={level === item ? "default" : "outline"}
                onClick={() => {
                  setLevel(item);
                  setSpeakingIndex(0);
                  setSpeakingTranscript("");
                  setSpeakingFeedback(null);
                }}
                className="rounded-full px-5"
              >
                {item}
              </Button>
            ))}
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/learn">{copy.backToLearn}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Card>
            <CardHeader>
              <CardTitle>{copy.livePractice}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!currentQuestion || limitReached ? (
                <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-muted-foreground">
                  {copy.dailyLimitCompleted(dailyLimit)}
                  {!isAuthenticated ? <span> {copy.unlockAuthLimit(AUTH_DAILY_LIMIT)}</span> : null}
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border bg-slate-900 p-5 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                          {mode === "daily" ? copy.modeDaily(level) : copy.modeReview(level)}
                        </p>
                        <p className="mt-2 text-xl font-semibold">{currentQuestion.prompt}</p>
                        <p className="mt-2 text-sm text-slate-200">{currentQuestion.helper}</p>
                      </div>
                      <StudyBuddies speaking={isSpeaking || speakingActive} className="hidden md:flex" />
                    </div>

                    {currentQuestion.type === "listening" ? (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Button
                          type="button"
                          onClick={() => currentQuestion.audioText && playAudio(currentQuestion.audioText)}
                          className="h-10 rounded-full bg-white text-slate-900 hover:bg-slate-100"
                          disabled={!speechSupported}
                        >
                          {speechSupported ? copy.playAudio : copy.audioUnavailable}
                        </Button>
                        <span className="text-xs text-slate-300">
                          {copy.listenHint}
                        </span>
                      </div>
                    ) : null}

                    {currentQuestion.reading && !currentQuestion.showRomaji ? (
                      <div className="mt-3">
                        {showReading ? (
                          <p className="text-xs text-slate-200">
                            {copy.readingLabel}: {currentQuestion.reading}
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowReading(true)}
                            className="text-xs font-semibold text-slate-200 underline underline-offset-4"
                          >
                            {copy.showReading}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-2">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => submitAnswer(option)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                          selected === option
                            ? option === currentQuestion.answer
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-red-500 bg-red-50 text-red-700"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {mode === "daily"
                        ? copy.progressDaily(Math.min(answered + 1, dailyLimit), dailyLimit)
                        : copy.progressReview(reviewIndex + 1, reviewQueue.length)}
                    </span>
                    {reviewQueue.length > 0 && mode === "daily" ? (
                      <button type="button" className="font-semibold text-brand-700" onClick={() => setMode("review")}>
                        {copy.startReview(reviewQueue.length)}
                      </button>
                    ) : null}
                  </div>

                  <Button type="button" onClick={nextQuestion} className="w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                    {copy.next}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>{copy.performance}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">
                  <span className="text-muted-foreground">{copy.todayScore}</span>
                  <span className="font-semibold">{answered > 0 ? Math.round((correct / answered) * 100) : 0}%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">
                  <span className="text-muted-foreground">{copy.dailyStreak}</span>
                  <span className="font-semibold">
                    {streak} {copy.dayUnit}
                  </span>
                </div>
                <div className="space-y-2 rounded-xl border p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.lastSessions}</p>
                  {Object.entries(history)
                    .sort((a, b) => b[0].localeCompare(a[0]))
                    .slice(0, 5)
                    .map(([day, score]) => (
                      <div key={day} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{day}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{copy.speakingPractice}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{copy.prompt}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{speakingWord?.kana}</p>
                  <p className="text-sm text-slate-500">
                    {copy.readingLabel}: {speakingWord?.reading}
                  </p>
                </div>
                <StudyBuddies speaking={speakingActive} className="justify-start" />
                <Button
                  type="button"
                  onClick={startSpeakingPractice}
                  className="h-10 w-full rounded-full"
                  disabled={!speakingSupported}
                >
                  {speakingActive ? copy.listeningState : copy.startSpeaking}
                </Button>
                {supportChecked && !speakingSupported ? (
                  <p>{copy.speechUnsupported}</p>
                ) : null}
                {speakingTranscript ? <p>{copy.heard(speakingTranscript)}</p> : null}
                {speakingFeedback ? <p className="text-slate-600">{speakingFeedback}</p> : null}
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full rounded-full"
                  onClick={() => {
                    setSpeakingTranscript("");
                    setSpeakingFeedback(null);
                    setSpeakingIndex((prev) => prev + 1);
                  }}
                >
                  {copy.newPrompt}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{copy.levelLogic}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{copy.logic1}</p>
                <p>{copy.logic2}</p>
                <p>{copy.logic3}</p>
                <Button asChild className="mt-3 w-full rounded-xl">
                  <Link href="/intake?focus=learn">{copy.joinGuidedClass}</Link>
                </Button>
              </CardContent>
            </Card>

            {!authResolved ? null : !isAuthenticated ? (
              <Card>
                <CardHeader>
                  <CardTitle>{copy.unlockMorePractice}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{copy.guestLimit(GUEST_DAILY_LIMIT, AUTH_DAILY_LIMIT)}</p>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 rounded-xl">
                      <Link href="/login">{copy.login}</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 rounded-xl">
                      <Link href="/signup">{copy.signup}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
