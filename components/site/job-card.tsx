import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock3 } from "lucide-react";

import type { JobItem } from "@/lib/jobs";

export function JobCard({ job }: { job: JobItem }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_16px_rgba(15,23,42,0.06)]">
      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-slate-200">
        <Image
          src={job.image}
          alt={job.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{job.category}</span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">JLPT {job.jlpt}</span>
        {job.popular && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">Most popular</span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">{job.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{job.summary}</p>

      <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
        <p className="inline-flex items-center gap-2">
          <MapPin className="size-4" />
          {job.location}
        </p>
        <p className="inline-flex items-center gap-2">
          <Clock3 className="size-4" />
          {job.duration}
        </p>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex h-11 min-w-[110px] items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
        >
          View
        </Link>
        <Link
          href="/intake?focus=jobs"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Join track
        </Link>
      </div>
    </article>
  );
}
