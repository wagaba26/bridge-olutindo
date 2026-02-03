import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { recordings } from "@/lib/data";
import { hasPaidAccess } from "@/lib/rbac";

export default async function RecordingsPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const canAccess = hasPaidAccess(role);

  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Recordings</h1>
        <span className="rounded-full bg-[#fdf1e8] px-3 py-1 text-xs font-semibold text-[#b24a2a]">
          Paid access
        </span>
      </div>

      {!canAccess ? (
        <div className="mt-6 rounded-2xl border border-[#f0d5c9] bg-[#fff6f2] px-4 py-3 text-sm text-[#b24a2a]">
          Upgrade to a paid plan to unlock full recordings.
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {recordings.map((recording) => (
          <div key={recording.id} className="panel-soft flex flex-wrap items-center justify-between gap-3 px-4 py-3">
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
    </section>
  );
}
