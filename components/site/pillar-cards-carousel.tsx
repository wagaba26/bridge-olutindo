"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Handshake } from "lucide-react";

const PILLARS = [
  {
    title: "Learn Japanese",
    href: "/learn",
    description: "N5 to N3 pathways designed for Ugandan learners building for study and daily life readiness.",
    icon: BookOpen,
  },
  {
    title: "Study & Exchange",
    href: "/study",
    description: "Find schools, scholarships, and admissions support for your next academic move.",
    icon: GraduationCap,
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Build Uganda-Japan pipelines for education and institutional growth.",
    icon: Handshake,
  },
];

export function PillarCardsCarousel() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Core services</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Build your Japan pathway with clarity.
            </h2>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group min-w-[86%] snap-start border border-black bg-white p-6"
              >
                <div className="mb-4 h-[120px] border border-black bg-white" />
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-black bg-white text-slate-900">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Explore
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group border border-black bg-white p-6 transition hover:bg-neutral-100"
              >
                <div className="mb-4 h-[120px] border border-black bg-white" />
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-black bg-white text-slate-900">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Explore
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
