import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProgramBySlug, getIntakeHref } from "@/lib/programs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramPageProps = {
  params: { slug: string };
};

type ProgramRecord = {
  title: string;
  slug: string;
  category: string;
  focus: string;
  summary: string | null;
  duration: string | null;
  mode: string | null;
  highlights: string[] | null;
};

const hasSupabaseEnv =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function getProgramFromSupabase(slug: string) {
  if (!hasSupabaseEnv) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programs")
    .select("title, slug, category, focus, summary, duration, mode, highlights")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as ProgramRecord;
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const fallback = getProgramBySlug(params.slug);
  const program = (await getProgramFromSupabase(params.slug)) ?? fallback;
  if (!program) {
    return { title: "Program not found | Bridge Olutindo" };
  }

  return {
    title: `${program.title} | Bridge Olutindo`,
    description: "Program details and next steps for Bridge Olutindo.",
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const fallback = getProgramBySlug(params.slug);
  const program = (await getProgramFromSupabase(params.slug)) ?? fallback;

  if (!program) {
    notFound();
  }

  const intakeHref = getIntakeHref(program.title);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-6">
          <SectionHeading
            eyebrow="Program"
            title={program.title}
            description={
              "summary" in program && program.summary
                ? program.summary
                : "Explore this program and take the next step with Bridge Olutindo."
            }
          />
          <div className="flex flex-wrap gap-3 text-xs">
            {"category" in program && program.category ? (
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {program.category}
              </Badge>
            ) : null}
            {"duration" in program && program.duration ? (
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {program.duration}
              </Badge>
            ) : null}
            {"mode" in program && program.mode ? (
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {program.mode}
              </Badge>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
              <Link href={intakeHref}>Start intake</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href={`/checkout?program=${encodeURIComponent(program.title)}`}>Continue to checkout</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <Card>
            <CardHeader>
              <CardTitle>What you will cover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {"highlights" in program && program.highlights && program.highlights.length > 0 ? (
                <ul className="space-y-2">
                  {program.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-red" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Detailed program highlights will appear here once the curriculum is finalized. For now, share your
                  goals and we will recommend the best pathway.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              <p>1. Submit the intake form so we can review your profile.</p>
              <p>2. A Bridge Olutindo advisor confirms eligibility and timing.</p>
              <p>3. We guide you through enrollment and preparation.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
