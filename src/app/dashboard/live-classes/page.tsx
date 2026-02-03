import Link from "next/link";
import { upcomingClasses } from "@/lib/data";

export default function LiveClassesPage() {
  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Live classes</h1>
        <Link href="/dashboard" className="btn-outline px-4 py-2 text-xs">
          Back to overview
        </Link>
      </div>
      <div className="mt-4 grid gap-3">
        {upcomingClasses.map((session) => (
          <div key={session.id} className="panel-soft flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#121416]">{session.title}</p>
              <p className="text-xs text-[#5a5f5f]">
                {session.date} · {session.time}
              </p>
            </div>
            <Link href="/dashboard" className="btn-primary px-3 py-1 text-xs">
              Join
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
