import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Terms of Service | Bridge Olutindo",
  description:
    "Placeholder terms of service for Bridge Olutindo. Final legal text will be provided by legal counsel.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Legal"
            title="Terms of Service (Placeholder)"
            description="This page is a template and does not yet represent the final legal agreement. Final wording will be added by legal advisors."
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 prose prose-sm md:prose-base max-w-3xl">
          <h2>1. Overview</h2>
          <p>
            These placeholder terms describe how Bridge Olutindo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) may
            offer language, job placement, and study support services for Ugandans seeking opportunities in Japan.
          </p>

          <h2>2. Services</h2>
          <p>
            Bridge Olutindo plans to provide educational programs, advisory services, and connections to partner
            institutions and employers. Details such as eligibility, fees, and responsibilities will be clearly outlined
            in final agreements and program documentation.
          </p>

          <h2>3. No guarantees</h2>
          <p>
            While we aim to support your journey, we cannot guarantee admission, visas, scholarships, or job offers. Such
            decisions rest with schools, employers, and immigration authorities.
          </p>

          <h2>4. Responsibilities of participants</h2>
          <p>
            Learners and candidates will be responsible for providing accurate information, following program guidelines,
            and complying with laws and regulations in both Uganda and Japan.
          </p>

          <h2>5. Limitation of liability</h2>
          <p>
            The final version of these terms will describe any limitations on our liability and the extent of our
            responsibilities in offering programs and advisory support.
          </p>

          <h2>6. Changes to these terms</h2>
          <p>
            As our services evolve, these terms will be updated. The date of the latest revision will be included here,
            and continued use of our services will indicate acceptance of the updated terms.
          </p>

          <p className="text-muted-foreground mt-8">
            This content is only a placeholder and should not be treated as final legal wording. Please consult a legal
            professional when you are ready to launch.
          </p>
        </div>
      </section>
    </div>
  );
}

