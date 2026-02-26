"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";

type ProgressUpdate = {
  id: string;
  learner_email: string;
  attendance_status: string;
  class_date: string;
  teacher_comment: string;
  engagement_rating: number | null;
  pronunciation_rating: number | null;
  homework_rating: number | null;
  created_at: string;
};

export function LiveTeachingFeed() {
  const [items, setItems] = useState<ProgressUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClientOrNull();
    if (!supabase) return;

    supabase
      .from("learner_progress_updates")
      .select(
        "id, learner_email, attendance_status, class_date, teacher_comment, engagement_rating, pronunciation_rating, homework_rating, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error: queryError }) => {
        if (queryError) {
          setError("Unable to load live feed.");
          return;
        }
        setItems((data ?? []) as ProgressUpdate[]);
      });

    const channel = supabase
      .channel("teaching-live-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "learner_progress_updates" },
        (payload) => {
          const next = payload.new as ProgressUpdate;
          setItems((prev) => [next, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-900">{item.learner_email}</p>
          <p className="mt-1 text-slate-600">
            {item.class_date} | {item.attendance_status}
          </p>
          <p className="mt-1 text-slate-600">{item.teacher_comment}</p>
          <p className="mt-1 text-xs text-slate-500">
            Ratings: engagement {item.engagement_rating ?? "-"} | pronunciation {item.pronunciation_rating ?? "-"} | homework {item.homework_rating ?? "-"}
          </p>
        </div>
      ))}
      {items.length === 0 ? <p className="text-sm text-slate-500">No updates yet.</p> : null}
    </div>
  );
}
