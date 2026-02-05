import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

type ThankYouSearchParams = {
  source?: string;
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
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams?: ThankYouSearchParams;
}) {
  const source = typeof searchParams?.source === "string" ? searchParams.source : "intake";
  const content = SOURCE_COPY[source] ?? SOURCE_COPY.intake;

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <SectionHeading
            align="center"
            eyebrow="Submission received"
            title={content.title}
            description={content.description}
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
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
