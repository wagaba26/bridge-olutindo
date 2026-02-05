"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type WordCard = {
  id: string;
  kana: string;
  romaji: string;
  meaning: string;
  example: string;
  category: string;
  imageLabel: string;
};

const WORDS: WordCard[] = [
  {
    id: "konnichiwa",
    kana: "こんにちは",
    romaji: "konnichiwa",
    meaning: "Hello / Good afternoon",
    example: "こんにちは！はじめまして。",
    category: "Greetings",
    imageLabel: "People greeting",
  },
  {
    id: "arigatou",
    kana: "ありがとう",
    romaji: "arigatou",
    meaning: "Thank you",
    example: "助けてくれて、ありがとう。",
    category: "Basics",
    imageLabel: "Thank you gesture",
  },
  {
    id: "sumimasen",
    kana: "すみません",
    romaji: "sumimasen",
    meaning: "Excuse me / Sorry",
    example: "すみません、道を教えてください。",
    category: "Basics",
    imageLabel: "Asking for directions",
  },
  {
    id: "eki",
    kana: "駅",
    romaji: "eki",
    meaning: "Train station",
    example: "駅はどこですか？",
    category: "Travel",
    imageLabel: "Train station sign",
  },
  {
    id: "tabemono",
    kana: "食べ物",
    romaji: "tabemono",
    meaning: "Food",
    example: "日本の食べ物が好きです。",
    category: "Daily life",
    imageLabel: "Food market",
  },
  {
    id: "shigoto",
    kana: "仕事",
    romaji: "shigoto",
    meaning: "Work / Job",
    example: "仕事の時間です。",
    category: "Work",
    imageLabel: "Work desk",
  },
  {
    id: "mizu",
    kana: "水",
    romaji: "mizu",
    meaning: "Water",
    example: "水をください。",
    category: "Daily life",
    imageLabel: "Glass of water",
  },
  {
    id: "gohan",
    kana: "ごはん",
    romaji: "gohan",
    meaning: "Rice / Meal",
    example: "ごはんを食べます。",
    category: "Daily life",
    imageLabel: "Rice bowl",
  },
  {
    id: "pan",
    kana: "パン",
    romaji: "pan",
    meaning: "Bread",
    example: "朝ごはんはパンです。",
    category: "Food",
    imageLabel: "Bread loaf",
  },
  {
    id: "ie",
    kana: "家",
    romaji: "ie",
    meaning: "House / Home",
    example: "家に帰ります。",
    category: "Daily life",
    imageLabel: "Home exterior",
  },
  {
    id: "gakkou",
    kana: "学校",
    romaji: "gakkou",
    meaning: "School",
    example: "学校は8時に始まります。",
    category: "Places",
    imageLabel: "School building",
  },
  {
    id: "tomodachi",
    kana: "友だち",
    romaji: "tomodachi",
    meaning: "Friend",
    example: "友だちと話します。",
    category: "People",
    imageLabel: "Friends together",
  },
  {
    id: "sensei",
    kana: "先生",
    romaji: "sensei",
    meaning: "Teacher",
    example: "先生に質問します。",
    category: "People",
    imageLabel: "Teacher",
  },
  {
    id: "densha",
    kana: "電車",
    romaji: "densha",
    meaning: "Train",
    example: "電車で行きます。",
    category: "Travel",
    imageLabel: "Train car",
  },
  {
    id: "basu",
    kana: "バス",
    romaji: "basu",
    meaning: "Bus",
    example: "バスに乗ります。",
    category: "Travel",
    imageLabel: "City bus",
  },
  {
    id: "kippu",
    kana: "きっぷ",
    romaji: "kippu",
    meaning: "Ticket",
    example: "きっぷを買います。",
    category: "Travel",
    imageLabel: "Ticket booth",
  },
  {
    id: "yasui",
    kana: "安い",
    romaji: "yasui",
    meaning: "Cheap",
    example: "このシャツは安いです。",
    category: "Shopping",
    imageLabel: "Sale sign",
  },
  {
    id: "takai",
    kana: "高い",
    romaji: "takai",
    meaning: "Expensive / High",
    example: "このバッグは高いです。",
    category: "Shopping",
    imageLabel: "Price tag",
  },
  {
    id: "ookii",
    kana: "大きい",
    romaji: "ookii",
    meaning: "Big",
    example: "大きい町に住んでいます。",
    category: "Adjectives",
    imageLabel: "Big building",
  },
  {
    id: "chiisai",
    kana: "小さい",
    romaji: "chiisai",
    meaning: "Small",
    example: "小さい犬がいます。",
    category: "Adjectives",
    imageLabel: "Small puppy",
  },
  {
    id: "asagohan",
    kana: "朝ごはん",
    romaji: "asagohan",
    meaning: "Breakfast",
    example: "朝ごはんを食べました。",
    category: "Food",
    imageLabel: "Breakfast plate",
  },
  {
    id: "yama",
    kana: "山",
    romaji: "yama",
    meaning: "Mountain",
    example: "山がきれいです。",
    category: "Nature",
    imageLabel: "Mountain view",
  },
  {
    id: "umi",
    kana: "海",
    romaji: "umi",
    meaning: "Sea",
    example: "海で泳ぎます。",
    category: "Nature",
    imageLabel: "Ocean waves",
  },
  {
    id: "ame",
    kana: "雨",
    romaji: "ame",
    meaning: "Rain",
    example: "今日は雨です。",
    category: "Weather",
    imageLabel: "Rainy day",
  },
  {
    id: "tenki",
    kana: "天気",
    romaji: "tenki",
    meaning: "Weather",
    example: "天気がいいです。",
    category: "Weather",
    imageLabel: "Sunny sky",
  },
  {
    id: "nomu",
    kana: "飲む",
    romaji: "nomu",
    meaning: "To drink",
    example: "お茶を飲みます。",
    category: "Verbs",
    imageLabel: "Drinking tea",
  },
  {
    id: "taberu",
    kana: "食べる",
    romaji: "taberu",
    meaning: "To eat",
    example: "昼ごはんを食べます。",
    category: "Verbs",
    imageLabel: "Eating meal",
  },
  {
    id: "iku",
    kana: "行く",
    romaji: "iku",
    meaning: "To go",
    example: "学校へ行きます。",
    category: "Verbs",
    imageLabel: "Walking outside",
  },
  {
    id: "kuru",
    kana: "来る",
    romaji: "kuru",
    meaning: "To come",
    example: "友だちが来ます。",
    category: "Verbs",
    imageLabel: "Friend arriving",
  },
  {
    id: "miru",
    kana: "見る",
    romaji: "miru",
    meaning: "To see / watch",
    example: "映画を見ます。",
    category: "Verbs",
    imageLabel: "Watching movie",
  },
  {
    id: "hanasu",
    kana: "話す",
    romaji: "hanasu",
    meaning: "To speak",
    example: "日本語を話します。",
    category: "Verbs",
    imageLabel: "Conversation",
  },
  {
    id: "yasumu",
    kana: "休む",
    romaji: "yasumu",
    meaning: "To rest",
    example: "日曜日は休みます。",
    category: "Verbs",
    imageLabel: "Resting",
  },
  {
    id: "jikan",
    kana: "時間",
    romaji: "jikan",
    meaning: "Time",
    example: "時間がありますか？",
    category: "Basics",
    imageLabel: "Clock",
  },
  {
    id: "asa",
    kana: "朝",
    romaji: "asa",
    meaning: "Morning",
    example: "朝は早いです。",
    category: "Time",
    imageLabel: "Morning sunlight",
  },
  {
    id: "yoru",
    kana: "夜",
    romaji: "yoru",
    meaning: "Night",
    example: "夜に勉強します。",
    category: "Time",
    imageLabel: "Night sky",
  },
  {
    id: "ima",
    kana: "今",
    romaji: "ima",
    meaning: "Now",
    example: "今、忙しいです。",
    category: "Time",
    imageLabel: "Right now",
  },
  {
    id: "suki",
    kana: "好き",
    romaji: "suki",
    meaning: "Like",
    example: "日本の音楽が好きです。",
    category: "Feelings",
    imageLabel: "Heart icon",
  },
  {
    id: "kirai",
    kana: "嫌い",
    romaji: "kirai",
    meaning: "Dislike",
    example: "辛いものは嫌いです。",
    category: "Feelings",
    imageLabel: "Dislike gesture",
  },
  {
    id: "atsui",
    kana: "暑い",
    romaji: "atsui",
    meaning: "Hot (weather)",
    example: "今日は暑いです。",
    category: "Weather",
    imageLabel: "Hot day",
  },
  {
    id: "samui",
    kana: "寒い",
    romaji: "samui",
    meaning: "Cold (weather)",
    example: "冬は寒いです。",
    category: "Weather",
    imageLabel: "Cold day",
  },
];

const DAILY_QUIZ_LIMIT = 10;
const DAILY_SPOTLIGHT_LIMIT = 6;
const QUIZ_STORAGE_KEY = "teach-yourself-n5-quiz";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededShuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let currentSeed = seed || 1;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const random = currentSeed / 233280;
    const j = Math.floor(random * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function TeachYourselfPage() {
  const [todayKey] = useState(getTodayKey);
  const [dailyCount, setDailyCount] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const dailySpotlightWords = useMemo(() => {
    const seed = hashString(`spotlight-${todayKey}`);
    return seededShuffle(WORDS, seed).slice(0, DAILY_SPOTLIGHT_LIMIT);
  }, [todayKey]);

  const dailyQuizWords = useMemo(() => {
    const seed = hashString(`quiz-${todayKey}`);
    const shuffled = seededShuffle(WORDS, seed);
    const spotlightIds = new Set(dailySpotlightWords.map((word) => word.id));
    const filtered = shuffled.filter((word) => !spotlightIds.has(word.id));
    return filtered.slice(0, DAILY_QUIZ_LIMIT);
  }, [todayKey, dailySpotlightWords]);

  const [activeWord, setActiveWord] = useState(dailySpotlightWords[0]);

  useEffect(() => {
    if (dailySpotlightWords.length > 0) {
      setActiveWord(dailySpotlightWords[0]);
    }
  }, [dailySpotlightWords]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; count: number };
        if (parsed.date === todayKey) {
          setDailyCount(parsed.count);
          setQuizIndex(Math.min(parsed.count, DAILY_QUIZ_LIMIT));
          return;
        }
      } catch {
        // ignore parse errors
      }
    }

    const nextState = { date: todayKey, count: 0 };
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(nextState));
    setDailyCount(0);
    setQuizIndex(0);
  }, [todayKey]);

  const quizWord = dailyQuizWords[Math.min(quizIndex, dailyQuizWords.length - 1)];
  const quizOptions = useMemo(() => {
    if (!quizWord) {
      return [];
    }
    const options = seededShuffle(
      [quizWord, ...WORDS.filter((word) => word.id !== quizWord.id).slice(0, 3)].map(
        (word) => word.meaning
      ),
      hashString(`${todayKey}-${quizWord.id}`)
    );
    return options;
  }, [quizWord, todayKey]);

  const limitReached = dailyCount >= DAILY_QUIZ_LIMIT;

  function handleSelectOption(option: string) {
    if (selected || limitReached || !quizWord) {
      return;
    }
    setSelected(option);
    const isCorrect = option === quizWord.meaning;
    setQuizFeedback(isCorrect ? "Correct! Keep going." : `Not quite. The answer is “${quizWord.meaning}”.`);
    const nextCount = Math.min(dailyCount + 1, DAILY_QUIZ_LIMIT);
    setDailyCount(nextCount);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify({ date: todayKey, count: nextCount })
      );
    }
  }

  function handleNextQuestion() {
    if (limitReached) {
      return;
    }
    setSelected(null);
    setQuizFeedback(null);
    setQuizIndex((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-6">
          <SectionHeading
            eyebrow="Teach Yourself"
            title="Practice Japanese every day."
            description="N5-level word practice and daily quizzes to build confidence before you apply."
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
              <Link href="/intake?focus=learn">Join a class</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/learn">Back to Learn</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Word spotlight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border bg-slate-900 text-white p-6 space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{activeWord.category}</p>
                  <p className="text-4xl font-semibold">{activeWord.kana}</p>
                  <p className="text-sm text-slate-200">{activeWord.romaji}</p>
                  <div className="text-sm text-slate-200">{activeWord.example}</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                {dailySpotlightWords.map((word) => (
                    <button
                      key={word.id}
                      type="button"
                      onClick={() => {
                        setActiveWord(word);
                      }}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        activeWord.id === word.id
                          ? "border-brand-red bg-brand-red/10 text-brand-red"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="font-medium">{word.kana}</p>
                      <p className="text-xs text-muted-foreground">{word.romaji}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flashcard practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {dailySpotlightWords.map((word) => (
                    <div key={`${word.id}-flash`} className="rounded-2xl border p-4 space-y-3">
                      <div className="h-24 rounded-xl bg-gradient-to-br from-brand-blue/20 via-brand-orange/20 to-brand-red/20 flex items-center justify-center text-xs text-muted-foreground">
                        {word.imageLabel}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">{word.kana}</p>
                          <p className="text-xs text-muted-foreground">{word.romaji}</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{word.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{word.meaning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {limitReached ? (
                  <div className="rounded-2xl border bg-slate-50 p-5 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      You have completed today&apos;s 10 N5 practice questions.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Practice again tomorrow or log in for full access to the self‑learn quiz.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-6">
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button asChild variant="outline" className="rounded-full px-6">
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Meaning</p>
                      <p className="text-3xl font-semibold mt-2">{quizWord?.kana}</p>
                      <p className="text-xs text-muted-foreground">{quizWord?.romaji}</p>
                    </div>
                    <div className="grid gap-2">
                      {quizOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSelectOption(option)}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            selected === option
                              ? option === quizWord?.meaning
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-red-500 bg-red-50 text-red-700"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizFeedback ? (
                      <div className="text-sm text-muted-foreground">{quizFeedback}</div>
                    ) : null}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Question {Math.min(dailyCount + 1, DAILY_QUIZ_LIMIT)} of {DAILY_QUIZ_LIMIT}
                      </span>
                      <span>Daily limit</span>
                    </div>
                    <Button type="button" onClick={handleNextQuestion} className="bg-brand-red hover:bg-brand-red/90">
                      Next question
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practice resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <Link href="https://www.duolingo.com/course/ja/en" target="_blank" className="block hover:text-brand-red">
                  Duolingo - Daily N5 practice streaks
                </Link>
                <Link href="https://www.lingodeer.com" target="_blank" className="block hover:text-brand-red">
                  LingoDeer - Structured Japanese lessons
                </Link>
                <Link href="https://apps.ankiweb.net" target="_blank" className="block hover:text-brand-red">
                  Anki - Spaced repetition flashcards
                </Link>
                <Link href="https://jisho.org" target="_blank" className="block hover:text-brand-red">
                  Jisho.org - Japanese dictionary and kanji lookup
                </Link>
                <Link href="https://www3.nhk.or.jp/news/easy/" target="_blank" className="block hover:text-brand-red">
                  NHK Easy News - Reading practice with simple articles
                </Link>
                <Link href="https://tatoeba.org" target="_blank" className="block hover:text-brand-red">
                  Tatoeba - Example sentences for vocabulary practice
                </Link>
                <Link href="https://www.tofugu.com" target="_blank" className="block hover:text-brand-red">
                  Tofugu - Study guides and grammar tips
                </Link>
                <Link href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" className="block hover:text-brand-red">
                  Hiragana practice - Learn kana basics
                </Link>
                <Link href="https://www.tofugu.com/japanese/learn-katakana/" target="_blank" className="block hover:text-brand-red">
                  Katakana practice - Loanword essentials
                </Link>
                <Link href="https://www.tofugu.com/japanese/learn-japanese-book/" target="_blank" className="block hover:text-brand-red">
                  Book guide - Best Japanese textbooks (Genki, Minna no Nihongo)
                </Link>
                <Link href="https://www.marugoto.org/en/" target="_blank" className="block hover:text-brand-red">
                  Marugoto - Free Japanese course materials
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
