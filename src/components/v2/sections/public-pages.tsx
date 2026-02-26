import Link from "next/link";
import { BookOpen, Building2, Calendar, ChevronRight, Globe, LibraryBig, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";
import { MotionFadeItem, MotionMaskTitle, MotionPage, MotionStagger, SubtleParallax } from "@/src/components/v2/motion/primitives";
import {
  DailyPracticeLoop,
  ImmersionModeToggle,
} from "@/src/components/v2/sections/learning-experience";
import { Accordion } from "@/src/components/v2/ui/accordion";
import { Button } from "@/src/components/v2/ui/button";
import { Card } from "@/src/components/v2/ui/card";
import { Input } from "@/src/components/v2/ui/input";

export function HomePage() {
  return (
    <MotionPage>
      <section className="v2-section">
        <div className="v2-container grid items-end gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="v2-eyebrow">Modern Academic Precision</p>
            <MotionMaskTitle>
              <h1 className="v2-title">Learn Japanese with structure, clarity, and cultural depth.</h1>
            </MotionMaskTitle>
            <p className="v2-subtitle">Bridge Olutindo Academy delivers measurable Japanese fluency through guided study paths, faculty mentoring, and weekly performance feedback.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/v2/intake"><Button>Start Intake</Button></Link>
              <Link href="/v2/programs"><Button variant="ghost">Explore Programs</Button></Link>
            </div>
          </div>
          <SubtleParallax className="v2-card-surface p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--v2-text-muted)]">Program Snapshot</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--v2-accent)]">N5-N1</p>
            <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Curriculum aligned to JLPT milestones with integrated speaking labs.</p>
          </SubtleParallax>
        </div>
      </section>
      <section className="v2-section pt-0">
        <MotionStagger className="v2-container v2-grid v2-grid-3">
          {[
            { icon: BookOpen, title: "Daily Practice", body: "Short loops that keep listening, speaking, and review steady." },
            { icon: LibraryBig, title: "Immersion Control", body: "English fades from N5 to N3 with clear level guidance." },
            { icon: ShieldCheck, title: "Review Rhythm", body: "Micro-sessions scheduled when recall weakens." },
          ].map((item) => (
            <MotionFadeItem key={item.title}>
              <Card>
                <item.icon className="mb-4 h-5 w-5 text-[var(--v2-accent)]" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--v2-text-muted)]">{item.body}</p>
              </Card>
            </MotionFadeItem>
          ))}
        </MotionStagger>
      </section>
      <section className="v2-section pt-0">
        <div className="v2-container grid gap-6 md:grid-cols-2">
          <DailyPracticeLoop />
          <ImmersionModeToggle />
        </div>
      </section>
    </MotionPage>
  );
}

export function SimplePage({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: { title: string; body: string; icon: ComponentType<{ className?: string }> }[];
}) {
  return (
    <MotionPage className="v2-section">
      <div className="v2-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="v2-eyebrow">{eyebrow}</p>
          <h1 className="v2-title text-[clamp(2rem,4vw,3.2rem)]">{title}</h1>
          <p className="v2-subtitle">{description}</p>
        </div>
        <MotionStagger className="v2-grid v2-grid-3">
          {cards.map((card) => (
            <MotionFadeItem key={card.title}>
              <Card>
                <card.icon className="mb-3 h-5 w-5 text-[var(--v2-accent)]" />
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm text-[var(--v2-text-muted)]">{card.body}</p>
              </Card>
            </MotionFadeItem>
          ))}
        </MotionStagger>
      </div>
    </MotionPage>
  );
}

export function ContactPage() {
  return (
    <MotionPage className="v2-section">
      <div className="v2-container grid gap-8 md:grid-cols-2">
        <Card>
          <p className="v2-eyebrow">Contact</p>
          <h1 className="mt-3 text-3xl font-semibold">Talk with our academic team.</h1>
          <p className="mt-2 text-sm text-[var(--v2-text-muted)]">Share your level and goals. We respond within one business day.</p>
          <div className="mt-5 space-y-3 text-sm text-[var(--v2-text-muted)]">
            <p>Kampala, Uganda</p>
            <p>support@bridgeolutindo.academy</p>
          </div>
        </Card>
        <Card>
          <form className="space-y-4">
            <Input placeholder="Full name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Current level (A0 / N5 / N4...)" />
            <textarea className="min-h-32 w-full rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3 text-sm" placeholder="What do you need help with?" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </Card>
      </div>
    </MotionPage>
  );
}

export function FaqPage() {
  return (
    <MotionPage className="v2-section">
      <div className="v2-container space-y-8">
        <div className="max-w-2xl">
          <p className="v2-eyebrow">FAQ</p>
          <h1 className="mt-3 text-3xl font-semibold">Frequently asked questions</h1>
        </div>
        <Accordion
          items={[
            { title: "How long does each level take?", body: "Most learners complete one level in 10 to 14 weeks depending on attendance and self-practice consistency." },
            { title: "Are classes live or self-paced?", body: "Both. You get live sessions, guided office hours, and a structured self-study track." },
            { title: "Do you provide placement tests?", body: "Yes. We assess grammar, reading, and listening to place learners accurately." },
          ]}
        />
      </div>
    </MotionPage>
  );
}

export const pageCardSets = {
  learn: [
    { title: "Core Japanese", body: "Foundations from kana to complex structures.", icon: Globe },
    { title: "Speaking Labs", body: "Pronunciation and conversation corrections weekly.", icon: Calendar },
    { title: "Progress Reviews", body: "Instructor feedback with measurable targets.", icon: ShieldCheck },
  ],
  programs: [
    { title: "Beginner Track", body: "Zero-to-N5 with rigorous listening and speaking drills.", icon: BookOpen },
    { title: "Intermediate Track", body: "N4 and N3 progression with reading strategy focus.", icon: LibraryBig },
    { title: "Advanced Track", body: "N2 and N1 preparation with exam simulations.", icon: Calendar },
  ],
  resources: [
    { title: "Study Maps", body: "Weekly plans to maintain disciplined cadence.", icon: LibraryBig },
    { title: "Practice Sheets", body: "Structured grammar, kanji, and listening worksheets.", icon: BookOpen },
    { title: "Session Notes", body: "Instructor summaries after each class block.", icon: ShieldCheck },
  ],
  partners: [
    { title: "Academic Partners", body: "Institutions co-developing language pathways.", icon: Building2 },
    { title: "Curriculum Advisors", body: "Experts ensuring pacing and assessment quality.", icon: Globe },
    { title: "Learning Communities", body: "Peer networks that reinforce consistency.", icon: ChevronRight },
  ],
  about: [
    { title: "Mission", body: "Deliver precise and confidence-building Japanese education.", icon: ShieldCheck },
    { title: "Method", body: "Clear structure, dependable faculty, measurable milestones.", icon: Calendar },
    { title: "Culture", body: "Calm rigor, respectful mentorship, high standards.", icon: Globe },
  ],
};

