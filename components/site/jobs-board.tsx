"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CategoryTiles } from "@/components/site/category-tiles";
import { JobCard } from "@/components/site/job-card";
import { JobFiltersSheet } from "@/components/site/job-filters-sheet";
import { StickyCTA } from "@/components/site/sticky-cta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JOBS } from "@/lib/jobs";

const categories = [
  { label: "Factory", count: JOBS.filter((job) => job.category === "Factory").length },
  { label: "Caregiving", count: JOBS.filter((job) => job.category === "Caregiving").length },
  { label: "IT & Digital", count: JOBS.filter((job) => job.category === "IT & Digital").length },
  { label: "Other", count: JOBS.filter((job) => job.category === "Other").length },
];

export function JobsBoard() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Factory");

  const visibleJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const categoryMatches = job.category === selectedCategory;
      const queryMatches =
        query.trim().length === 0 ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase());

      return categoryMatches && queryMatches;
    });
  }, [query, selectedCategory]);

  return (
    <>
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Jobs in Japan</p>
          <h1 className="mt-3 max-w-3xl">Find vetted job tracks that match your skills and language level.</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Explore factory, caregiving, IT, and other pathways with clear timelines and support from application to
            relocation.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by role or location"
                className="h-11 rounded-xl border-slate-300 bg-white pl-10"
              />
            </label>
            <JobFiltersSheet />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 md:max-w-xl md:gap-3">
            {[
              { label: "Factory", image: "/images/jobs/factory.jpg" },
              { label: "Caregiving", image: "/images/jobs/caregiving.jpg" },
              { label: "IT & Digital", image: "/images/jobs/it.jpg" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedCategory(item.label)}
                className="group relative overflow-hidden rounded-xl border border-slate-300 text-left"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.label} fill className="object-cover" sizes="(max-width: 768px) 33vw, 180px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                </div>
                <span className="absolute bottom-2 left-2 text-xs font-semibold text-white md:text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto space-y-6 px-4">
          <CategoryTiles categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

          <div className="grid gap-4 md:grid-cols-2">
            {visibleJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>

          {visibleJobs.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
              No jobs match your current search. Adjust filters or contact an advisor.
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-xl">How placement works</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">1. Profile review</p>
                <p className="mt-1">We assess language level, background, and your preferred track.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">2. Training and interviews</p>
                <p className="mt-1">You prepare for role interviews with practice sessions and coaching.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">3. Departure support</p>
                <p className="mt-1">Our team helps with paperwork, orientation, and transition into Japan.</p>
              </div>
            </div>
            <Button asChild className="mt-4 h-11 rounded-xl px-5">
              <Link href="/intake?focus=jobs">Start job assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      <StickyCTA
        primaryLabel="Start job assessment"
        primaryHref="/intake?focus=jobs"
        secondaryLabel="Talk to advisor"
        secondaryHref="/contact"
      />
    </>
  );
}
