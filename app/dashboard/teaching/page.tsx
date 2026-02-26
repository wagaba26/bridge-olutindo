import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ClassMeetingRoom } from "@/components/dashboard/class-meeting-room";
import { LiveTeachingFeed } from "@/components/dashboard/live-teaching-feed";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const STAFF_ROLES = new Set(["admin", "teacher"]);

export default async function DashboardTeachingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = String((user.user_metadata?.primary_role ?? "")).toLowerCase().trim();
  if (!STAFF_ROLES.has(role)) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Teaching desk</h1>
        <p className="text-sm text-muted-foreground">
          Submit attendance and teacher comments to inform automatic learner progress updates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class progress entry</CardTitle>
          <CardDescription>For admin and teacher accounts only.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="/api/progress" method="post">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Learner email</label>
                <Input name="learner_email" type="email" placeholder="learner@example.com" className="h-11 rounded-xl" required />
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Class date</label>
                <Input name="class_date" type="date" className="h-11 rounded-xl" required />
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <label className="font-medium">Attendance status</label>
              <Select name="attendance_status" defaultValue="present" className="h-11 rounded-xl">
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
                <option value="excused">Excused</option>
              </Select>
            </div>

            <div className="space-y-1.5 text-sm">
              <label className="font-medium">Teacher comment</label>
              <textarea
                name="teacher_comment"
                className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                placeholder="Session performance, participation, and next action."
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Engagement rating (1-5)</label>
                <Select name="engagement_rating" defaultValue="4" className="h-11 rounded-xl">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Pronunciation rating (1-5)</label>
                <Select name="pronunciation_rating" defaultValue="4" className="h-11 rounded-xl">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </div>
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Homework rating (1-5)</label>
                <Select name="homework_rating" defaultValue="4" className="h-11 rounded-xl">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </div>
            </div>

            <Button type="submit" className="h-11 rounded-xl px-5">
              Save progress update
            </Button>
          </form>
        </CardContent>
      </Card>

      <ClassMeetingRoom roomKey="bridge-teacher-room" title="Teacher Meeting Room (Embedded)" />

      <Card>
        <CardHeader>
          <CardTitle>Live teaching feed</CardTitle>
          <CardDescription>Real-time updates appear when any teacher submits a student rating.</CardDescription>
        </CardHeader>
        <CardContent>
          <LiveTeachingFeed />
        </CardContent>
      </Card>
    </div>
  );
}
