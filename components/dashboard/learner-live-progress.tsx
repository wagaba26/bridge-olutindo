"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClientOrNull } from "@/lib/supabase/client";

type Summary = {
  learner_email: string;
  attendance_rate: number;
  feedback_score: number;
  progress_score: number;
  overall_teacher_rating: number;
  last_class_date: string | null;
  updated_at: string;
};

export function LearnerLiveProgress() {
  const [email, setEmail] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClientOrNull();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      const userEmail = data.user?.email ?? null;
      setEmail(userEmail);
      if (!userEmail) return;

      supabase
        .from("learner_progress_summaries")
        .select("learner_email, attendance_rate, feedback_score, progress_score, overall_teacher_rating, last_class_date, updated_at")
        .eq("learner_email", userEmail)
        .maybeSingle()
        .then(({ data: row }) => {
          if (row) setSummary(row as Summary);
        });
    });

    const channel = supabase
      .channel("learner-summary-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "learner_progress_summaries" },
        (payload) => {
          const row = payload.new as Summary;
          if (email && row?.learner_email?.toLowerCase() === email.toLowerCase()) {
            setSummary(row);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email]);

  if (!summary) {
    return <p className="text-sm text-muted-foreground">No live teacher summary yet. It updates after your first scored class.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Attendance</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.attendance_rate}%</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Teacher rating</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.overall_teacher_rating}/5</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Feedback quality</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.feedback_score}%</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Progress score</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.progress_score}%</p>
      </div>
    </div>
  );
}
