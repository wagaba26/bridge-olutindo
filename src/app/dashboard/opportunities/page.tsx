import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { opportunities } from "@/lib/data";
import { hasCareerAccess } from "@/lib/rbac";

export default async function OpportunitiesPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const canAccess = hasCareerAccess(role);

  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Opportunities</h1>
        <span className="rounded-full bg-[#eaf4f2] px-3 py-1 text-xs font-semibold text-[#0d6b5d]">
          Career track
        </span>
      </div>

      {!canAccess ? (
        <div className="mt-6 rounded-2xl border border-[#f0d5c9] bg-[#fff6f2] px-4 py-3 text-sm text-[#b24a2a]">
          Upgrade to Career Track to unlock job and school applications.
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="panel-soft flex flex-wrap items-center justify-between gap-3 px-4 py-3">
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
  );
}
