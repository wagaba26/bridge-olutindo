import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, validateOrigin } from "@/lib/api-security";
import { createSupabaseAdminOrServerClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const STAFF_ROLES = new Set(["admin", "teacher"]);
const ATTENDANCE_SCORE: Record<string, number> = {
  present: 1,
  late: 0.75,
  excused: 0.5,
  absent: 0,
};

const progressSchema = z.object({
  learnerEmail: z.email(),
  attendanceStatus: z.enum(["present", "late", "absent", "excused"]),
  classDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  teacherComment: z.string().min(2).max(2000),
});

export async function POST(request: Request) {
  const originError = await validateOrigin(request);
  if (originError) return originError;

  const limitError = await checkRateLimit({ request, routeKey: "progress", limit: 40, windowMs: 60_000 });
  if (limitError) return limitError;

  const authClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = String((user.user_metadata?.primary_role ?? "")).toLowerCase().trim();
  if (!STAFF_ROLES.has(role)) {
    return NextResponse.json({ error: "Only admin and teacher accounts can submit progress." }, { status: 403 });
  }

  const formData = await request.formData();
  const parsed = progressSchema.safeParse({
    learnerEmail: String(formData.get("learner_email") ?? "").trim(),
    attendanceStatus: String(formData.get("attendance_status") ?? "").trim(),
    classDate: String(formData.get("class_date") ?? "").trim(),
    teacherComment: String(formData.get("teacher_comment") ?? "").trim(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 });
  }

  const { learnerEmail, attendanceStatus, classDate, teacherComment } = parsed.data;

  const db = await createSupabaseAdminOrServerClient();
  const { error } = await db.from("learner_progress_updates").insert({
    learner_email: learnerEmail,
    attendance_status: attendanceStatus,
    class_date: classDate,
    teacher_comment: teacherComment,
    submitted_by: user.id,
    submitted_by_role: role,
  });

  if (error) {
    return NextResponse.json(
      {
        error:
          "Unable to save progress update. Ensure learner_progress_updates table exists and service role key is configured.",
      },
      { status: 500 }
    );
  }

  const { data: recentUpdates } = await db
    .from("learner_progress_updates")
    .select("attendance_status, teacher_comment, class_date")
    .eq("learner_email", learnerEmail)
    .order("class_date", { ascending: false })
    .limit(30);

  if (recentUpdates && recentUpdates.length > 0) {
    const attendanceAverage =
      recentUpdates.reduce((total, item) => {
        const status = String(item.attendance_status ?? "").toLowerCase();
        return total + (ATTENDANCE_SCORE[status] ?? 0.5);
      }, 0) / recentUpdates.length;

    const commentAverage =
      recentUpdates.reduce((total, item) => {
        const length = String(item.teacher_comment ?? "").trim().length;
        return total + Math.min(length, 180) / 180;
      }, 0) / recentUpdates.length;

    const attendanceRate = Math.round(attendanceAverage * 100);
    const feedbackScore = Math.round(commentAverage * 100);
    const progressScore = Math.round(attendanceRate * 0.7 + feedbackScore * 0.3);
    const latestDate = String(recentUpdates[0].class_date ?? classDate);

    await db.from("learner_progress_summaries").upsert(
      {
        learner_email: learnerEmail,
        attendance_rate: attendanceRate,
        feedback_score: feedbackScore,
        progress_score: progressScore,
        last_class_date: latestDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "learner_email" }
    );
  }

  try {
    await db.from("staff_action_logs").insert({
      actor_id: user.id,
      actor_role: role,
      action_type: "progress_update",
      target_email: learnerEmail,
      metadata: {
        attendance_status: attendanceStatus,
        class_date: classDate,
        comment_length: teacherComment.length,
      },
    });
  } catch {
    // optional audit table
  }

  return NextResponse.json({ ok: true });
}
