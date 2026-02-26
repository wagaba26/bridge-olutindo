"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpenCheck, PlayCircle } from "lucide-react";
import { ImmersionSpectrum } from "@/components/site/academy-infographics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClassMeetingRoom } from "@/components/dashboard/class-meeting-room";
import { ImmersionModeToggle } from "@/components/dashboard/immersion-mode-toggle";
import { SkillProgressBreakdown } from "@/components/dashboard/skill-progress-breakdown";

const COURSES = [
  {
    id: "n5-foundations",
    title: "N5 Foundations",
    progress: 42,
    nextLessonId: "lesson-03",
    description: "Kana, beginner grammar, and daily communication patterns.",
  },
  {
    id: "n4-core",
    title: "N4 Core",
    progress: 18,
    nextLessonId: "lesson-02",
    description: "Intermediate structures, listening drills, and speaking precision.",
  },
  {
    id: "n3-strategy",
    title: "N3 Strategy",
    progress: 8,
    nextLessonId: "lesson-01",
    description: "Reading speed, complex grammar control, and mock exam rhythm.",
  },
];

export default function DashboardLearningPage() {
  const [immersionMode, setImmersionMode] = useState<"n5" | "n4" | "n3">("n4");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="mb-2">Learning Platform</h1>
        <p className="text-sm text-muted-foreground">
          Follow level-based lessons, monitor skill progress, and maintain consistent preparation for study and life in Japan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {COURSES.map((course) => (
          <Card key={course.id} className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">{course.description}</p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Module completion</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{course.progress}%</p>
              </div>
              <Button asChild className="w-full rounded-xl">
                <Link href={`/dashboard/learning/${course.id}/${course.nextLessonId}`}>
                  <PlayCircle className="size-4" />
                  Continue lesson
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Weekly execution model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Complete scheduled lessons according to your weekly hour plan.</p>
          <p>2. Reinforce with daily self-study and review incorrect items.</p>
          <p>3. Attend instructor sessions and monitor assessment trends.</p>
          <Button asChild variant="outline" className="mt-3 rounded-xl">
            <Link href="/learn/teach-yourself">
              <BookOpenCheck className="size-4" />
              Open self-study module
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/japan-preparation">Open preparation hub</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <ImmersionModeToggle mode={immersionMode} onChange={setImmersionMode} />
        <ImmersionSpectrum mode={immersionMode} />
      </div>

      <SkillProgressBreakdown />

      <ClassMeetingRoom roomKey="bridge-academy-live-class" title="Embedded Live Class" />
    </div>
  );
}
