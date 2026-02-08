import Link from "next/link";
import { notFound } from "next/navigation";

import { StickyCTA } from "@/components/site/sticky-cta";
import { Button } from "@/components/ui/button";
import { JOBS } from "@/lib/jobs";

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOBS.find((item) => item.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Link href="/jobs" className="text-sm font-semibold text-slate-600">
            Back to jobs
          </Link>
          <h1 className="mt-3 max-w-3xl">{job.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">{job.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{job.category}</span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">JLPT {job.jlpt}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{job.location}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{job.mode}</span>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl">Role overview</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Track:</span> {job.category}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Location:</span> {job.location}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">JLPT minimum:</span> {job.jlpt}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Training mode:</span> {job.mode}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Preparation duration:</span> {job.duration}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl">What to expect</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>- A structured readiness review with our placement team.</li>
                <li>- Language and interview preparation aligned to this role type.</li>
                <li>- Ongoing documentation and relocation support before departure.</li>
              </ul>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold">Ready to apply?</h3>
              <p className="mt-2 text-sm text-slate-600">Start with a short assessment and get track recommendations.</p>
              <div className="mt-4 space-y-2">
                <Button asChild className="h-11 w-full rounded-xl">
                  <Link href="/intake?focus=jobs">Start job assessment</Link>
                </Button>
                <Button asChild variant="secondary" className="h-11 w-full rounded-xl">
                  <Link href="/contact">Talk to advisor</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <StickyCTA
        primaryLabel="Start job assessment"
        primaryHref="/intake?focus=jobs"
        secondaryLabel="Talk to advisor"
        secondaryHref="/contact"
      />
    </div>
  );
}
