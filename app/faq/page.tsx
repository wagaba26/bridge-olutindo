import { SectionHeading } from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata = {
  title: "FAQs | Bridge Olutindo",
  description:
    "Frequently asked questions about learning Japanese, working, and studying in Japan with Bridge Olutindo.",
};

const FAQ_GROUPS = [
  {
    id: "learn",
    title: "Learn Japanese",
    items: [
      {
        q: "Do I need any Japanese experience to start?",
        a: "No. Our N5 programs are designed for absolute beginners and start from the basics of reading, writing, and speaking.",
      },
      {
        q: "How long does it take to reach N3?",
        a: "Timelines vary, but many learners can progress from N5 to N3 in 18–24 months with consistent study, depending on their schedule and commitment.",
      },
    ],
  },
  {
    id: "jobs",
    title: "Jobs in Japan",
    items: [
      {
        q: "What kind of jobs can Ugandans get in Japan?",
        a: "Common pathways include factory and manufacturing roles, caregiving, logistics, hospitality, and IT-related positions. Eligibility depends on your skills, language level, and visa category.",
      },
      {
        q: "Are jobs guaranteed after training?",
        a: "No responsible organization can guarantee a job. Our role is to prepare you and connect you with vetted employers, but interviews and final decisions remain with the employer and immigration authorities.",
      },
    ],
  },
  {
    id: "study",
    title: "Study & exchange",
    items: [
      {
        q: "Can Bridge Olutindo help me get a scholarship?",
        a: "We provide guidance on scholarships and help you prepare strong applications, but final decisions rest with schools and scholarship bodies.",
      },
      {
        q: "Do you only support students in Kampala?",
        a: "No. While we have a strong presence in Kampala, we also support students from other regions through online sessions.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & fees",
    items: [
      {
        q: "How much do your programs cost?",
        a: "Pricing depends on the type and length of program. We will publish transparent price ranges and payment plans; for now, contact us for a tailored estimate.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes. Many programs can be paid in installments before departure. Exact terms will be shared during your consultation.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="FAQs"
            title="Answers to common questions about Uganda–Japan journeys."
            description="These answers are general guidance and will be updated as programs and policies evolve."
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-10">
          {FAQ_GROUPS.map((group) => (
            <div key={group.id} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">{group.title}</h2>
              <Accordion type="single" collapsible className="border rounded-md divide-y">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

