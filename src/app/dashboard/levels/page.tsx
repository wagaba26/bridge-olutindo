import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const levels = [
  { level: "N5", label: "Bridge Start", progress: 100 },
  { level: "N4", label: "Bridge Grow", progress: 68 },
  { level: "N3", label: "Bridge Ready", progress: 22 },
];

export default async function LevelsPage() {
  const session = await getServerSession(authOptions);

  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Levels</h1>
        <span className="rounded-full bg-[#eaf4f2] px-3 py-1 text-xs font-semibold text-[#0d6b5d]">
          Current: {session?.user?.role ?? "Student"}
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {levels.map((item) => (
          <div key={item.level} className="panel-soft p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#1c1b18]">
                {item.level} · {item.label}
              </span>
              <span className="text-[#5a5f5f]">{item.progress}%</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-[#e4e0d8]">
              <div
                className="h-2 rounded-full bg-[#0d6b5d]"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
