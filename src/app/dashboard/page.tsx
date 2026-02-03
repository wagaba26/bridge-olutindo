import Link from "next/link";
import { opportunities, recordings, upcomingClasses } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0d6b5d]">
                  Overview
                </p>
                <h1 className="mt-2 font-display text-3xl">Hello, Aisha</h1>
                <p className="mt-2 text-sm text-[#5b584f]">
                  You are on Bridge Grow (N4). Two milestones left before job applications unlock.
                </p>
              </div>
              <Link href="/contact" className="btn-primary">
                Book a coaching call
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { label: "Current level", value: "N4" },
                { label: "Next class", value: "Tue 6:00 PM" },
                { label: "Progress", value: "68%" },
              ].map((card) => (
                <div key={card.label} className="panel-soft px-4 py-4">
                  <p className="text-xs text-[#5a5f5f]">{card.label}</p>
                  <p className="mt-2 text-lg font-semibold text-[#1c1b18]">{card.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/dashboard/progress" className="btn-outline w-full sm:w-auto">
                View progress
              </Link>
              <Link href="/eligibility/result" className="btn-outline w-full sm:w-auto">
                Eligibility result
              </Link>
            </div>
          </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Live class calendar</h2>
            <span className="rounded-full bg-[#eaf4f2] px-3 py-1 text-xs font-semibold text-[#0d6b5d]">
              This week
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {upcomingClasses.map((session) => (
              <div
                key={session.id}
                className="panel-soft flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1c1b18]">{session.title}</p>
                  <p className="text-xs text-[#5a5f5f]">
                    {session.date} · {session.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#fffdf8] px-3 py-1 text-xs text-[#5b584f]">
                    {session.access}
                  </span>
                  <Link href="/dashboard/live-classes" className="btn-primary px-3 py-1 text-xs">
                    Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Recordings library</h2>
            <span className="rounded-full bg-[#fdf1e8] px-3 py-1 text-xs font-semibold text-[#b24a2a]">
              Paid access
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="panel-soft flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1c1b18]">{recording.title}</p>
                  <p className="text-xs text-[#5a5f5f]">
                    {recording.level} · {recording.duration}
                  </p>
                </div>
                <span className="rounded-full bg-[#fffdf8] px-3 py-1 text-xs text-[#5b584f]">
                  {recording.access}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Opportunities</h2>
          <Link href="/dashboard/opportunities" className="btn-outline px-4 py-2 text-xs">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-3">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="panel-soft flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[#1c1b18]">{opportunity.title}</p>
                <p className="text-xs text-[#5a5f5f]">
                  {opportunity.track} · {opportunity.requirement}
                </p>
              </div>
              <span className="rounded-full bg-[#fffdf8] px-3 py-1 text-xs text-[#5b584f]">
                {opportunity.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
