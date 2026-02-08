import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Privacy Policy | Bridge Olutindo",
  description:
    "How Bridge Olutindo collects, uses, stores, and protects personal data across Uganda-Japan services.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-4 px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description="Last updated: Feb 07, 2026"
          />
          <p className="max-w-3xl text-sm text-slate-600">
            This policy explains what data we collect, why we collect it, and how we handle information across Uganda and
            Japan service operations.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-3xl space-y-8 px-4 text-sm leading-7 text-slate-700 md:text-base">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 md:grid-cols-3 md:text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Scope</p>
              <p className="mt-1">Applies to language, jobs, study, and partnership services.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Data regions</p>
              <p className="mt-1">Data may be processed in Uganda and Japan for service delivery.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Contact path</p>
              <p className="mt-1">Use the official contact channels on this website for requests.</p>
            </div>
          </div>

          <div>
            <h2>1. Introduction</h2>
            <p>
              Bridge Olutindo (&ldquo;Bridge&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting your
              personal data. This policy explains how we collect, use, store, and share information when you use our
              services.
            </p>
          </div>

          <div>
            <h2>2. Information We Collect</h2>
            <p>We may collect personal, program-related, and technical information, including:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Full name, email address, phone or WhatsApp number, and country of residence</li>
              <li>Education background, language level, and program/application details</li>
              <li>Payment-related information processed by approved third-party providers</li>
              <li>Technical data such as IP address, browser type, device information, and usage analytics</li>
            </ul>
          </div>

          <div>
            <h2>3. How We Use Your Information</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Deliver and manage language, jobs, study, and partnership services</li>
              <li>Communicate schedules, updates, and support responses</li>
              <li>Assess eligibility for programs and partner opportunities</li>
              <li>Process payments and maintain internal records</li>
              <li>Improve our products, support operations, and compliance processes</li>
            </ul>
          </div>

          <div>
            <h2>4. Data Sharing</h2>
            <p>We may share limited data only when relevant and necessary with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Partner institutions supporting your selected pathway</li>
              <li>Payment processors and operational service providers</li>
              <li>Authorities where disclosure is required by law</li>
            </ul>
            <p className="mt-2 font-medium">We do not sell personal data.</p>
          </div>

          <div>
            <h2>5. International Data Transfers</h2>
            <p>
              Because Bridge supports operations across Uganda and Japan, data may be processed in either country. We
              take reasonable steps to maintain appropriate data protection standards.
            </p>
          </div>

          <div>
            <h2>6. Data Retention</h2>
            <p>We keep personal data only for as long as needed for service delivery and legal obligations.</p>
          </div>

          <div>
            <h2>7. Your Rights</h2>
            <p>Depending on applicable law, you may request access, correction, deletion, or consent withdrawal.</p>
          </div>

          <div>
            <h2>8. Data Security</h2>
            <p>
              We use reasonable administrative and technical safeguards to protect your data, but no system can be
              guaranteed as fully secure.
            </p>
          </div>

          <div>
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Bridge services are primarily intended for users aged 18 and above, except where participation is through
              institutionally approved programs.
            </p>
          </div>

          <div>
            <h2>10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes are posted on this page.</p>
          </div>

          <div>
            <h2>11. Contact</h2>
            <p>For privacy-related inquiries, use the official contact channels listed on the website.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
