import Link from "next/link";
import { AppShell } from "@/src/components/v2/app/app-shell";
import { Card } from "@/src/components/v2/ui/card";
import { Skeleton } from "@/src/components/v2/ui/skeleton";
import { Table } from "@/src/components/v2/ui/table";
import { Tabs } from "@/src/components/v2/ui/tabs";
import {
  CultureQuickCards,
  DailyPracticeLoop,
  ImmersionModeToggle,
  LearningPlanBuilder,
  MicroReviewQueue,
  PronunciationCoach,
  ResourceTracker,
  ScenarioPractice,
  StudyReportCard,
} from "@/src/components/v2/sections/learning-experience";
import { LanguageToolsPanel } from "@/src/components/v2/sections/language-tools";

export function AppHomePage() {
  return (
    <AppShell title="My Learning">
      <DailyPracticeLoop />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-[var(--v2-text-muted)]">Current level</p>
          <p className="mt-1 text-3xl font-semibold">N4</p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--v2-text-muted)]">Weekly target</p>
          <p className="mt-1 text-3xl font-semibold">8h</p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--v2-text-muted)]">Completion</p>
          <p className="mt-1 text-3xl font-semibold">62%</p>
        </Card>
      </div>
      <LearningPlanBuilder />
      <ImmersionModeToggle />
      <div className="grid gap-4 md:grid-cols-2">
        <MicroReviewQueue />
        <PronunciationCoach />
      </div>
      <ScenarioPractice />
      <CultureQuickCards />
      <StudyReportCard />
      <ResourceTracker />
      <LanguageToolsPanel />
      <Table
        headers={["Course", "Status", "Next"]}
        rows={[
          ["N4 Core", "In Progress", "Lesson 18"],
          ["Conversation Lab", "Scheduled", "Monday"],
          ["Kanji Sprint", "Active", "Set 12"],
        ]}
      />
    </AppShell>
  );
}

export function CatalogPage() {
  return (
    <AppShell title="Catalog">
      <Tabs
        items={[
          { key: "all", label: "All Courses", content: <CatalogCards /> },
          { key: "grammar", label: "Grammar", content: <CatalogCards /> },
          { key: "speaking", label: "Speaking", content: <CatalogCards /> },
        ]}
      />
    </AppShell>
  );
}

function CatalogCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {["N5 Foundations", "N4 Core Mastery", "N3 Reading Accelerator", "Conversation Precision"].map((course) => (
        <Card key={course}>
          <p className="font-semibold">{course}</p>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Structured modules with weekly outcomes.</p>
          <Link className="mt-4 inline-flex text-sm text-[var(--v2-accent)]" href={`/v2/app/courses/${encodeURIComponent(course.toLowerCase().replace(/\s+/g, "-"))}`}>Open course</Link>
        </Card>
      ))}
    </div>
  );
}

export function CourseDetailPage({ id }: { id: string }) {
  return (
    <AppShell title={`Course: ${id}`}>
      <Card>
        <p className="text-sm text-[var(--v2-text-muted)]">Current module</p>
        <h2 className="mt-2 text-2xl font-semibold">Structured comprehension and output</h2>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Track lesson sequence and join guided practice sessions.</p>
      </Card>
      <div className="grid gap-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </AppShell>
  );
}

export function LessonPage({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  return (
    <AppShell title={`Lesson ${lessonId}`}>
      <Card>
        <p className="text-sm text-[var(--v2-text-muted)]">Course {courseId}</p>
        <h2 className="mt-2 text-2xl font-semibold">Lesson flow</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--v2-text-muted)]">
          <li>Context and objective review</li>
          <li>Guided grammar exercise</li>
          <li>Listening comprehension drill</li>
          <li>Output and tutor feedback</li>
        </ol>
      </Card>
    </AppShell>
  );
}

export function ProfilePage() {
  return (
    <AppShell title="Profile">
      <Card>
        <p className="text-sm text-[var(--v2-text-muted)]">Learner settings and history</p>
        <h2 className="mt-2 text-xl font-semibold">Academic profile</h2>
        <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Update preferences, goals, and notification settings.</p>
      </Card>
    </AppShell>
  );
}

