import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "FAQs | Bridge Olutindo",
  description:
    "Frequently asked questions about learning Japanese, working, and studying in Japan with Bridge Olutindo.",
};

const FAQ_GROUPS = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is Bridge Olutindo?",
        a: "Bridge Olutindo (Bridge4U) connects Uganda and Japan through Japanese language education, job preparation, study and exchange support, and institutional partnerships.",
      },
      {
        q: "Is Bridge a recruitment agency?",
        a: "No. Bridge is not a recruitment agency. We provide education, preparation, advisory support, and institutional coordination.",
      },
      {
        q: "Does Bridge guarantee jobs, visas, or admissions?",
        a: "No. Outcomes depend on eligibility, language level, partner requirements, and immigration or admissions authorities.",
      },
    ],
  },
  {
    id: "language",
    title: "Japanese Language Programs",
    items: [
      {
        q: "Who can join the Japanese language program?",
        a: "Anyone committed to learning Japanese and meeting program requirements can apply. Some tracks are tailored to study applicants or job seekers.",
      },
      {
        q: "What is JLCAT?",
        a: "JLCAT is an online Japanese language assessment that provides a score report used by some institutions during visa or screening processes. Bridge prepares learners for JLCAT but does not administer the test.",
      },
      {
        q: "Can I join the program midway?",
        a: "Yes. Midway enrollment is allowed, but learners must make up missed hours in the next session.",
      },
      {
        q: "What language level is needed for jobs?",
        a: "Most pathways require at least N4. Higher-skill roles often require N3 or above.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments and Fees",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "Currently, Uganda payments are supported via mobile money. Additional methods are introduced as they become available.",
      },
      {
        q: "Are fees refundable?",
        a: "In general, fees are non-refundable once a program has started. Limited exceptions may be considered at Bridge's discretion.",
      },
      {
        q: "What currency do you use?",
        a: "Fees are listed in USD for consistency. An indicative UGX conversion may be provided for convenience.",
      },
    ],
  },
  {
    id: "jobs",
    title: "Jobs in Japan",
    items: [
      {
        q: "What job categories does Bridge support?",
        a: "Typical categories include manufacturing, caregiving, hospitality, IT, and other skilled roles, depending on partner demand.",
      },
      {
        q: "How long does the process take?",
        a: "There is no fixed timeline. Language preparation, interviews, partner reviews, and visa steps vary by track.",
      },
    ],
  },
  {
    id: "study",
    title: "Study and Exchange",
    items: [
      {
        q: "Does Bridge support university admissions?",
        a: "Bridge provides guidance, preparation, and coordination support. Admissions decisions remain with schools and institutions.",
      },
      {
        q: "Are scholarships guaranteed?",
        a: "No. Scholarships are externally decided and depend on each institution's criteria.",
      },
    ],
  },
  {
    id: "partners",
    title: "Partners and Institutions",
    items: [
      {
        q: "Who can become a Bridge partner?",
        a: "Ugandan and Japanese institutions, schools, universities, employers, NGOs, sponsors, and support service providers.",
      },
      {
        q: "Is there a standard partner fee?",
        a: "Partnership terms vary by scope, structure, and engagement model.",
      },
    ],
  },
  {
    id: "support",
    title: "Contact and Support",
    items: [
      {
        q: "How can I contact Bridge?",
        a: "Use the official contact details on our website or our Bridge4U lit.link page.",
      },
      {
        q: "How quickly does Bridge respond?",
        a: "Our standard response window is 24-72 business hours depending on inquiry volume.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-5 px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="FAQs"
            title="Answers to common questions about Uganda–Japan journeys."
            description="These answers explain how Bridge programs, advisory services, and partnerships work in practice."
          />
          <div className="flex flex-wrap gap-2 text-xs">
            {FAQ_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex h-9 items-center rounded-full border border-slate-300 bg-white px-3 font-medium text-slate-700"
              >
                {group.title}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-xl px-5">
              <Link href="/contact">Ask a direct question</Link>
            </Button>
            <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
              <Link href="/consultation">Book free consultation</Link>
            </Button>
          </div>
          <p className="text-xs text-slate-500">For account-specific issues, include your current pathway and timeline in the message.</p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-10 px-4">
          {FAQ_GROUPS.map((group) => (
            <div id={group.id} key={group.id} className="scroll-mt-24 space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">{group.title}</h2>
              <Accordion type="single" collapsible className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Still need help?</p>
            <h2 className="mt-2 text-2xl">Get advice for your exact pathway.</h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              If your question is situation-specific, the team can guide your next step for language, study, jobs, or
              institutional collaboration.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="/contact">Contact Bridge team</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                <Link href="/consultation">Schedule free consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
