import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Terms of Service | Bridge Olutindo",
  description:
    "Terms governing Bridge Olutindo services for education, advisory support, and Uganda-Japan pathways.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-4 px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Legal"
            title="Terms of Service"
            description="Last updated: Feb 07, 2026"
          />
          <p className="max-w-3xl text-sm text-slate-600">
            These terms explain how Bridge services work, your responsibilities, and our operating boundaries across
            Uganda and Japan pathways.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-3xl space-y-8 px-4 text-sm leading-7 text-slate-700 md:text-base">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 md:grid-cols-3 md:text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Service scope</p>
              <p className="mt-1">Language education, advisory support, and institutional coordination.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">No guarantees</p>
              <p className="mt-1">Jobs, visas, admissions, and scholarships depend on external decisions.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Applicable law</p>
              <p className="mt-1">Operates under relevant Uganda and Japan legal frameworks.</p>
            </div>
          </div>

          <div>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Bridge Olutindo services, you agree to these Terms of Service.</p>
          </div>

          <div>
            <h2>2. Scope of Services</h2>
            <p>Bridge provides Japanese language education, advisory support, institutional coordination, and pathway information.</p>
            <p className="mt-2 font-medium">
              Bridge does not guarantee employment, visas, admissions, or scholarship outcomes.
            </p>
          </div>

          <div>
            <h2>3. Eligibility</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>You must be at least 18 years old unless stated otherwise for a specific program</li>
              <li>You must provide accurate and truthful information</li>
              <li>You must comply with applicable program rules and codes of conduct</li>
            </ul>
          </div>

          <div>
            <h2>4. User Responsibilities</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Attend sessions and complete assigned preparation where applicable</li>
              <li>Treat staff, instructors, and peers respectfully</li>
              <li>Avoid misuse of Bridge content, materials, and digital platforms</li>
              <li>Avoid misrepresentation of Bridge in external dealings</li>
            </ul>
          </div>

          <div>
            <h2>5. Fees and Payments</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Fees must be paid according to program terms</li>
              <li>Late or missed payments may result in temporary suspension</li>
              <li>Fees are generally non-refundable once services begin</li>
            </ul>
          </div>

          <div>
            <h2>6. Intellectual Property</h2>
            <p>
              Program materials, website content, and brand assets are owned by Bridge or licensors and may not be reused
              without permission.
            </p>
          </div>

          <div>
            <h2>7. Limitation of Liability</h2>
            <p>Bridge is not liable for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Visa denials or delays</li>
              <li>Employment outcomes or partner admissions decisions</li>
              <li>Indirect, consequential, or third-party losses</li>
            </ul>
          </div>

          <div>
            <h2>8. Termination</h2>
            <p>Bridge may suspend or terminate access where terms are violated or misconduct occurs.</p>
          </div>

          <div>
            <h2>9. Governing Law</h2>
            <p>These terms are governed by applicable laws of Uganda and, where relevant, Japan.</p>
          </div>

          <div>
            <h2>10. Changes to Terms</h2>
            <p>Bridge may update these terms. Continued use of services means acceptance of the updated version.</p>
          </div>

          <div>
            <h2>11. Contact</h2>
            <p>For questions related to these terms, use official contact channels on the website.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
