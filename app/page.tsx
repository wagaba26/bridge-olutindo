import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, GraduationCap, PlaneTakeoff } from "lucide-react";

import { LogoStrip } from "@/components/site/logo-strip";
import { PillarCardsCarousel } from "@/components/site/pillar-cards-carousel";
import { TrustStrip } from "@/components/site/trust-strip";
import { Button } from "@/components/ui/button";

const stories = [
  {
    title: "From Kampala to Osaka: John started his first engineering role",
    excerpt: "How language prep and interview support helped him settle into a factory career.",
    image: "/images/home/success/success-1.jpg",
  },
  {
    title: "Sarah secured a Tokyo scholarship in one intake cycle",
    excerpt: "A practical breakdown of documents, interview prep, and timeline planning.",
    image: "/images/home/success/success-2.jpg",
  },
  {
    title: "What N4 changed for David's caregiving applications",
    excerpt: "Why conversational confidence and discipline made a clear difference.",
    image: "/images/home/success/success-3.jpg",
  },
];

const japan101 = [
  { title: "Visa checklist", icon: PlaneTakeoff },
  { title: "Housing setup", icon: Compass },
  { title: "Workplace etiquette", icon: BookOpenCheck },
  { title: "School admissions", icon: GraduationCap },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/home/home-hero.jpg"
            alt="Bridge Olutindo pathways"
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,19,34,0.8),rgba(8,19,34,0.55)_55%,rgba(8,19,34,0.88))]" />
        </div>

        <div className="container relative mx-auto px-4 py-14 md:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">Bridge Olutindo</p>
            <h1>Learn Japanese and access meaningful work and study paths in Japan.</h1>
            <p className="mt-5 max-w-xl text-base text-slate-200 md:text-lg">
              We support Ugandans with language training, placement preparation, and trusted partner connections from
              first inquiry to arrival.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
                <Link href="/intake">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl border-white/40 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white">
                <Link href="/jobs">Explore Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-6 pb-8 md:-mt-8 md:pb-10">
        <div className="container mx-auto px-4">
          <TrustStrip
            items={[
              { value: "24-72h", label: "Typical response window" },
              { value: "N5-N3", label: "Structured language tracks" },
              { value: "UG + JP", label: "Cross-border support desks" },
              { value: "Free", label: "Consultation booking" },
            ]}
            className="shadow-[0_8px_28px_rgba(15,23,42,0.07)]"
          />
        </div>
      </section>

      <PillarCardsCarousel />

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Uganda-Japan Business Consultancy
              </p>
              <h2 className="mt-2 text-[1.6rem]">Practical support for cross-border business growth.</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Market entry orientation for Uganda and Japan.</li>
                <li>- Partner matching, business communication, and negotiation support.</li>
                <li>- Guidance on operational setup, compliance flow, and local onboarding.</li>
              </ul>
            </div>
            <div className="flex items-end">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="/consultation">Book business consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Teach yourself and practice</p>
              <h2 className="mt-2 text-[1.6rem]">Build daily Japanese confidence before class.</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Short vocabulary drills and phrase sets.</li>
                <li>- Quick quizzes to review grammar and listening.</li>
                <li>- Weekly prompts for real-life conversation topics.</li>
              </ul>
              <Button asChild className="mt-5 h-11 rounded-xl px-5">
                <Link href="/learn/teach-yourself">Start practicing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100/70 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Success stories</p>
              <h2 className="mt-2">Real outcomes from Uganda to Japan.</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-slate-800 md:inline-flex">
              More from resources
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {stories.map((story) => (
              <article
                key={story.title}
                className="min-w-[84%] snap-start rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:min-w-0"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 33vw" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-500">Story</p>
                <h3 className="mt-2 text-lg">{story.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{story.excerpt}</p>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  Read more
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Japan 101 for Ugandans</p>
              <h2 className="mt-2">New to Japan? Start with the essentials.</h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                Quick guides for the first months: documents, housing, work culture, and education planning.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {japan101.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href="/blog"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                  >
                    <Icon className="mb-2 size-4" />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <LogoStrip />
    </div>
  );
}
