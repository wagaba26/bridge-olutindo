import Link from "next/link";
import { ThankYouTracker } from "@/components/site/thank-you-tracker";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

type ThankYouSearchParams = {
  source?: string;
  desk?: string;
};

const SOURCE_COPY: Record<string, { title: string; description: string }> = {
  intake: {
    title: "Thanks for sharing your goals.",
    description: "We have received your intake request and will follow up within 1-2 business days.",
  },
  contact: {
    title: "Message received.",
    description: "Our team will reply soon with guidance and next steps.",
  },
  partners: {
    title: "Thanks for your partnership interest.",
    description: "We will review the details and reach out to schedule a call.",
  },
  consultation: {
    title: "Consultation request received.",
    description: "Your free consultation request has been submitted. We will confirm your selected slot shortly.",
  },
};

const DESK_LABELS: Record<string, string> = {
  language: "Language Desk",
  study: "Study and Exchange Desk",
  partners: "Partnerships Desk",
  business: "Business Consultancy Desk",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams?: Promise<ThankYouSearchParams>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const source = typeof resolved?.source === "string" ? resolved.source : "intake";
  const desk = typeof resolved?.desk === "string" ? resolved.desk : "";
  const content = SOURCE_COPY[source] ?? SOURCE_COPY.intake;
  const routedDesk = DESK_LABELS[desk] ?? "";

  return (
    <div className="min-h-screen bg-background">
      <ThankYouTracker source={source} desk={desk} />
      <section className="py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <SectionHeading
            align="center"
            eyebrow="Submission received"
            title={content.title}
            description={content.description}
          />
          {routedDesk ? (
            <p className="mx-auto inline-flex rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              Routed to: {routedDesk}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full px-8">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/programs">View programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
