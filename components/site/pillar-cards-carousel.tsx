"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Handshake } from "lucide-react";

const PILLARS = [
  {
    title: "Learn Japanese",
    href: "/learn",
    description: "N5 to N3 pathways designed for Ugandan learners building for work and study.",
    icon: BookOpen,
    image: "/images/home/pillars/learn.jpg",
  },
  {
    title: "Jobs in Japan",
    href: "/jobs",
    description: "Vetted employer tracks with language prep, interviews, and relocation support.",
    icon: BriefcaseBusiness,
    image: "/images/home/pillars/jobs.jpg",
  },
  {
    title: "Study & Exchange",
    href: "/study",
    description: "Find schools, scholarships, and admissions support for your next academic move.",
    icon: GraduationCap,
    image: "/images/home/pillars/study.jpg",
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Build Uganda-Japan pipelines for talent, education, and institutional growth.",
    icon: Handshake,
    image: "/images/home/pillars/partners.jpg",
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
                className="group min-w-[86%] snap-start rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.06)]"
              >
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200">
                  <Image src={pillar.image} alt={pillar.title} fill className="object-cover" sizes="86vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                </div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
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

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,23,42,0.09)]"
              >
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200">
                  <Image src={pillar.image} alt={pillar.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                </div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
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
