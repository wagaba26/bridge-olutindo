import Link from "next/link";

const milestones = [
  { label: "N4 Listening", status: "Complete" },
  { label: "N4 Speaking", status: "In progress" },
  { label: "Career readiness checklist", status: "Locked" },
];

export default function ProgressPage() {
  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Progress</h1>
        <Link href="/eligibility/result" className="btn-outline px-4 py-2 text-xs">
          View eligibility
        </Link>
      </div>
      <div className="mt-4 grid gap-3">
        {milestones.map((item) => (
          <div key={item.label} className="panel-soft flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[#121416]">{item.label}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-[#5a5f5f]">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
