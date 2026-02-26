import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProgramBySlug, getIntakeHref } from "@/lib/programs";
import { isAllowedProgramFocus } from "@/lib/service-policy";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

type ProgramRecord = {
  title: string;
  slug: string;
  category: string;
  focus: "learn" | "study";
  summary: string | null;
  duration: string | null;
  mode: string | null;
  highlights: string[] | null;
};

type ProgramBase = {
  title: string;
  slug: string;
  focus: "learn" | "study";
};

type ProgramDisplay = ProgramBase & {
  category: string | null;
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

function normalizeProgram(program: ProgramRecord | ProgramBase): ProgramDisplay {
  return {
    title: program.title,
    slug: program.slug,
    focus: program.focus,
    category: "category" in program && typeof program.category === "string" ? program.category : null,
    summary: "summary" in program && typeof program.summary === "string" ? program.summary : null,
    duration: "duration" in program && typeof program.duration === "string" ? program.duration : null,
    mode: "mode" in program && typeof program.mode === "string" ? program.mode : null,
    highlights:
      "highlights" in program && Array.isArray(program.highlights)
        ? program.highlights.filter((item): item is string => typeof item === "string")
        : null,
  };
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const { slug } = await params;
  const fallback = getProgramBySlug(slug);
  const program = (await getProgramFromSupabase(slug)) ?? fallback;
  if (!program || !isAllowedProgramFocus(program.focus)) {
    return { title: "Program not found | Bridge Olutindo" };
  }

  return {
    title: `${program.title} | Bridge Olutindo`,
    description: "Program details and next steps for Bridge Olutindo.",
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const fallback = getProgramBySlug(slug);
  const source = (await getProgramFromSupabase(slug)) ?? fallback;

  if (!source || !isAllowedProgramFocus(source.focus)) {
    notFound();
  }

  const program = normalizeProgram(source);
  const intakeHref = getIntakeHref(program.title);
  const description = program.summary || "Explore this program and take the next step with Bridge Olutindo.";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,rgba(27,59,102,0.10),transparent_42%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_45%,#f7f9fd_100%)]">
      <section className="border-b border-slate-300/70 bg-white/88">
        <div className="container mx-auto space-y-6 px-4 py-12 md:py-16">
          <FadeIn>
            <SectionHeading eyebrow="Program" title={program.title} description={description} />
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-3 text-xs">
              {program.category ? (
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  {program.category}
                </Badge>
              ) : null}
              {program.duration ? (
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  {program.duration}
                </Badge>
              ) : null}
              {program.mode ? (
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  {program.mode}
                </Badge>
              ) : null}
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href={intakeHref}>Start intake</Link>
              </Button>
              <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
                <Link href="/consultation">Book free consultation</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                <Link href={`/checkout?program=${encodeURIComponent(program.title)}`}>Continue to checkout</Link>
              </Button>
            </div>
          </FadeIn>
          <p className="text-xs text-slate-500 md:text-sm">Apply first if you are new. Checkout is for approved or continuing applicants.</p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto grid items-start gap-8 px-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>What you will cover</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                {program.highlights && program.highlights.length > 0 ? (
                  <ul className="space-y-2">
                    {program.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    Detailed highlights will appear once the curriculum is finalized. For now, share your goals and we
                    will recommend the best pathway.
                  </p>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-red text-white">
              <CardHeader>
                <CardTitle>Next steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-100">
                <p>1. Submit intake so the right team can review your profile.</p>
                <p>2. A Bridge advisor confirms eligibility, timing, and fit.</p>
                <p>3. We guide enrollment and preparation for launch.</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
