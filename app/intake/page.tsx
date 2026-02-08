import { IntakeForm } from "@/components/site/intake-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { getVisibleIntakeFocusOptions, type IntakeFocus } from "@/lib/intake";

type IntakeSearchParams = {
  focus?: string;
  program?: string;
};

export default async function IntakePage({
  searchParams,
}: {
  searchParams?: Promise<IntakeSearchParams>;
}) {
  const resolved = searchParams ? await searchParams : undefined;

  const focusOptions = getVisibleIntakeFocusOptions();
  const requestedFocus = typeof resolved?.focus === "string" ? resolved.focus : "learn";
  const initialFocus = focusOptions.some((option) => option.value === requestedFocus)
    ? (requestedFocus as IntakeFocus)
    : "learn";
  const program = typeof resolved?.program === "string" ? resolved.program : "";

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <SectionHeading
            eyebrow="Get Started"
            title="Tell us what you want to achieve."
            description="Share your goal and we'll connect you with the right Bridge Olutindo team."
          />
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <IntakeForm initialFocus={initialFocus} initialProgram={program} focusOptions={focusOptions} />
        </div>
      </section>
    </div>
  );
}
