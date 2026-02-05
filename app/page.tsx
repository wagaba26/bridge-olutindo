 "use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ServicePanel } from "@/components/ui/service-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoryCard } from "@/components/ui/story-card";
import { FadeIn } from "@/components/ui/fade-in";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Handshake,
  Plane,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[640px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bridge-illustration.jpeg"
            alt="Bridge Olutindo learning, work, and study pathways"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-slate-900/50 to-slate-900/80" />
        </div>

        <FadeIn>
          <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto mt-[-50px]">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md">
              Learn Japanese. <br className="hidden md:block" />
              <span className="text-brand-orange">Work &amp; Study</span> in Japan.
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Bridge Olutindo connects Ugandan talent with opportunities in Japan.
              From language mastery to career placement, we are your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/intake">Start Your Journey</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
              >
                <Link href="/partners">For Partners</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Services Grid (Overlapping Hero) */}
      <section className="relative z-20 py-16 -mt-32 px-4">
        <div className="container mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServicePanel
                title="Learn"
                description="Master Japanese with N5-N3 courses designed for rapid progress."
                href="/learn"
                icon={<BookOpen className="w-6 h-6" />}
                theme="red"
              />
              <ServicePanel
                title="Jobs"
                description="Find high-paying careers in factories, caregiving, and IT."
                href="/jobs"
                icon={<Briefcase className="w-6 h-6" />}
                theme="blue"
              />
              <ServicePanel
                title="Study"
                description="Access scholarships and language schools across Japan."
                href="/study"
                icon={<GraduationCap className="w-6 h-6" />}
                theme="orange"
              />
              <ServicePanel
                title="Partners"
                description="Connect with top Ugandan talent for your institution."
                href="/partners"
                icon={<Handshake className="w-6 h-6" />}
                theme="teal"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Teach Yourself */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          <SectionHeading
            eyebrow="Teach Yourself"
            title="Practice Japanese in minutes a day."
            description="Use interactive vocab, flashcards, and quizzes to build confidence before you join a class."
          />
          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4 text-sm text-muted-foreground">
            <p>
              Explore daily words, see examples, and test yourself with quick quizzes. It&apos;s a simple way to keep
              momentum between lessons.
            </p>
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 rounded-full px-8">
              <Link href="/learn/teach-yourself">Start practicing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories / News Strip */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex justify-between items-end mb-12 gap-4">
              <SectionHeading
                eyebrow="Success Stories"
                title="Real journeys from Uganda to Japan"
                description="See how Ugandans are transforming their lives through Bridge Olutindo’s programs."
              />
              <Link href="/blog" className="hidden md:flex items-center text-brand-blue font-semibold hover:underline">
                View all stories <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StoryCard
                category="Career Track"
                categoryColor="blue"
                title="From Kampala to Osaka: John's Engineering Journey"
                excerpt="John completed N4 training with Bridge and secured a position at a leading automotive factory in Osaka within 6 months."
                href="/blog"
              />
              <StoryCard
                category="Study Abroad"
                categoryColor="orange"
                title="Sarah's Scholarship Success at Tokyo University"
                excerpt="Awarded a full scholarship, Sarah shares her tips for acing the interview and adapting to life in Tokyo."
                href="/blog"
              />
              <StoryCard
                category="Language"
                categoryColor="red"
                title="Mastering Kanji: 5 Tips for Beginners"
                excerpt="Our lead instructor breaks down the most effective methods for memorizing Kanji characters quickly."
                href="/blog"
              />
            </div>

            <div className="mt-8 md:hidden text-center">
              <Button asChild variant="outline" className="w-full">
                <Link href="/blog">View all stories</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Resources / "Japan 101" Strip */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/pattern.png')]"></div> {/* Placeholder pattern */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">New to Japan?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
            We&apos;ve curated a comprehensive guide specifically for Ugandans moving to Japan.
            From visa applications to finding halal food.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/blog" className="flex flex-col items-center p-6 bg-white/10 hover:bg-brand-red/80 rounded-xl transition-all backdrop-blur-sm border border-white/10">
              <Plane className="w-8 h-8 mb-3" />
              <span className="font-semibold">Visa Guide</span>
            </Link>
            <Link href="/blog" className="flex flex-col items-center p-6 bg-white/10 hover:bg-brand-blue/80 rounded-xl transition-all backdrop-blur-sm border border-white/10">
              <Globe className="w-8 h-8 mb-3" />
              <span className="font-semibold">Culture Shock</span>
            </Link>
            <Link href="/blog" className="flex flex-col items-center p-6 bg-white/10 hover:bg-brand-orange/80 rounded-xl transition-all backdrop-blur-sm border border-white/10">
              <Briefcase className="w-8 h-8 mb-3" />
              <span className="font-semibold">Work Etiquette</span>
            </Link>
            <Link href="/blog" className="flex flex-col items-center p-6 bg-white/10 hover:bg-network-teal/80 rounded-xl transition-all backdrop-blur-sm border border-white/10">
              <BookOpen className="w-8 h-8 mb-3" />
              <span className="font-semibold">Daily Phrases</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Banner */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Institutions in Uganda & Japan</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60 hover:opacity-100 transition-opacity">
            {/* Placeholder Logos - Text for now */}
            <div className="text-xl font-bold font-serif text-slate-800">Kyoto Language Academy</div>
            <div className="text-xl font-bold font-sans text-slate-800">Makerere University</div>
            <div className="text-xl font-bold font-mono text-slate-800">Toyota Industries</div>
            <div className="text-xl font-bold text-slate-800">Kampala Innovation Hub</div>
          </div>
        </div>
      </section>
    </div>
  );
}
