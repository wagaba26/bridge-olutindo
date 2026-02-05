import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Privacy Policy | Bridge Olutindo",
  description:
    "Placeholder privacy policy for Bridge Olutindo. Final legal text will be provided by legal counsel.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy (Placeholder)"
            description="This page is a template and does not yet represent the final legal policy. Final wording will be added by legal advisors."
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 prose prose-sm md:prose-base max-w-3xl">
          <h2>1. Introduction</h2>
          <p>
            Bridge Olutindo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to respecting your privacy.
            This placeholder text describes the kind of information we may collect when you use our services.
          </p>

          <h2>2. Information we may collect</h2>
          <p>
            In the future, we may collect personal details such as your name, contact information, program interests, and
            other data you choose to share with us when you inquire about or join our programs.
          </p>

          <h2>3. How information may be used</h2>
          <p>
            Collected information may be used to respond to your questions, process your applications, improve our
            services, and share updates about Bridge Olutindo offerings—subject to applicable laws and your consent.
          </p>

          <h2>4. Data sharing and storage</h2>
          <p>
            Any future sharing of personal data with partners in Uganda or Japan will be clearly described here, along
            with how data is stored, protected, and retained.
          </p>

          <h2>5. Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, or delete your data. The final policy
            will explain how to exercise these rights and who to contact.
          </p>

          <h2>6. Changes to this policy</h2>
          <p>
            This page will be updated as we formalize our services and data practices. The date of the latest revision
            will be shown here.
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

