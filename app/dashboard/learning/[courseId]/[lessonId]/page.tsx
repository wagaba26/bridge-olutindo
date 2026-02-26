import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;

  return (
    <div className="space-y-5">
      <Button asChild variant="ghost" className="h-9 rounded-lg px-2">
        <Link href="/dashboard/learning">
          <ArrowLeft className="size-4" />
          Back to e-learning
        </Link>
      </Button>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Lesson Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Course: <span className="font-medium text-slate-900">{courseId}</span> | Lesson: <span className="font-medium text-slate-900">{lessonId}</span>
          </p>
          <div className="aspect-video rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Video/transcript area placeholder. Next step: connect real lesson media, transcript blocks, and quiz checkpoints.
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" />Objective overview</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" />Key vocabulary and grammar points</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" />Comprehension checkpoint</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-xl">Mark complete</Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/learn/teach-yourself">Practice quiz</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
