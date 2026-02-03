import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const stats = [
  { label: "Active learners", value: "1,200+" },
  { label: "Partner schools", value: "18" },
  { label: "Live classes / week", value: "24" },
  { label: "Hiring partners", value: "36" },
];

const pathways = [
  {
    title: "Jobs in Japan pathway",
    description:
      "Match language level to job types, unlock eligibility, and apply directly to verified employers.",
    tags: ["Language requirements", "Eligibility checks", "Employer pipeline"],
    cta: "See job requirements",
    href: "/jobs",
  },
  {
    title: "Study and exchange pathway",
    description:
      "Plan your school or university intake, get visa guidance, and receive consulting support.",
    tags: ["Intake calendars", "Visa readiness", "Consulting"],
    cta: "Explore schools",
    href: "/study",
  },
];

const programs = [
  {
    title: "Primary school cultural programs",
    detail: "Short exchange modules hosted in Uganda with partner schools.",
  },
  {
    title: "Vacation exchange camps",
    detail: "Seasonal learning camps with live Japanese instruction and culture labs.",
  },
  {
    title: "School-to-school partnerships",
    detail: "Bridge ongoing collaborations between Ugandan and Japanese institutions.",
  },
];

const testimonials = [
  {
    name: "Aisha K.",
    role: "N4 learner, Kampala",
    quote:
      "The recordings library kept me on track. By the time my intake opened, I already had my JLPT plan ready.",
  },
  {
    name: "Robert M.",
    role: "Careers track",
    quote:
      "The job pathway shows exactly what level I need and what documents to prepare. It made the goal feel real.",
  },
  {
    name: "Partner School",
    role: "Programs coordinator",
    quote:
      "Bridge Olutindo made it easy to set up exchange visits while keeping communication clear for both sides.",
  },
];

const faqs = [
  {
    question: "Do I need to be advanced to start?",
    answer:
      "No. We start from absolute beginner and align you to a Bridge level that maps to JLPT readiness.",
  },
  {
    question: "How do live classes work?",
    answer:
      "Live classes are scheduled weekly. If you miss one, recordings are available to paid students only.",
  },
  {
    question: "What unlocks job or school applications?",
    answer:
      "You unlock applications when you reach the required language level and complete the readiness checklist.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Bridge Olutindo platform</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Learn Japanese. Unlock jobs and study pathways. Build a real bridge to Japan.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              A Uganda-first learning platform that connects language mastery with clear career and
              education outcomes. Live classes, smart recordings, and guided pathways for work or
              study in Japan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/learn" className="btn-primary w-full sm:w-auto">
                Start learning
              </Link>
              <Link href="/jobs" className="btn-outline w-full sm:w-auto">
                Explore pathways
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="panel-soft px-4 py-3">
                  <p className="text-lg font-semibold text-[#121416]">{stat.value}</p>
                  <p className="text-xs text-[#5a5f5f]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 reveal-delay">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Next live class</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">
                Beginner N5 bootcamp
              </h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                Tue, 6:00 PM EAT · Live on Zoom · Recording included for paid students.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-full bg-[#eaf4f2] px-3 py-1 text-xs font-semibold text-[#0d6b5d]">
                  Paid access
                </span>
                <span className="rounded-full bg-[#fdf1e8] px-3 py-1 text-xs font-semibold text-[#b24a2a]">
                  Seats open
                </span>
              </div>
            </div>
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Career track
              </p>
              <h3 className="mt-3 font-display text-2xl">Eligibility roadmap</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Track your level, upload documents, and unlock job or school applications as soon as
                you meet the requirements.
              </p>
              <Link
                href="/dashboard/progress"
                className="mt-5 inline-flex items-center rounded-full bg-[#f7f6f2] px-4 py-2 text-sm font-semibold text-[#0b6b5f]"
              >
                View roadmap
              </Link>
            </div>
          </div>
        </section>

        <section id="learn" className="grid gap-8 pb-16 pt-4">
          <div className="max-w-2xl">
            <span className="chip">Learn Japanese</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              A guided LMS built for serious outcomes
            </h2>
            <p className="mt-3 text-sm text-[#5a5f5f] sm:text-base">
              Live instruction, structured self-study, and a recordings library that only paid
              students can access. Stay aligned to Bridge levels and JLPT readiness.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Live classes + auto recordings",
                detail:
                  "Join weekly live lessons or replay the class in the recordings library. Access is gated by subscription.",
              },
              {
                title: "Level-based content",
                detail:
                  "Lessons, quizzes, and practice sets match your Bridge level with clear progress tracking.",
              },
              {
                title: "Smart study plans",
                detail:
                  "Personal milestones keep you on pace toward JLPT levels and career eligibility.",
              },
            ].map((item) => (
              <div key={item.title} className="panel p-6">
                <h3 className="font-display text-xl text-[#121416]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="jobs" className="grid gap-6 pb-16">
          <div className="panel p-8">
            <span className="chip">Jobs in Japan</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Know the language requirement before you apply
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pathways.map((pathway) => (
                <div key={pathway.title} className="panel-soft p-6">
                  <h3 className="font-display text-xl text-[#121416]">{pathway.title}</h3>
                  <p className="mt-2 text-sm text-[#5a5f5f]">{pathway.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pathway.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e4e0d8] bg-white px-3 py-1 text-xs text-[#5a5f5f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={pathway.href}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-[#0d6b5d]"
                  >
                    {pathway.cta} -&gt;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="study" className="grid gap-6 pb-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="panel p-8">
              <span className="chip">Study and exchange</span>
              <h2 className="mt-3 font-display text-3xl text-[#121416]">
                Schools, universities, and scholarships with a clear plan
              </h2>
              <p className="mt-3 text-sm text-[#5a5f5f]">
                We map the intake periods, document requirements, and consultation sessions so you
                can apply confidently. Paid students get structured consulting hours.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Language schools and university track",
                  "Visa readiness checklist",
                  "Consultation with Bridge advisors",
                  "Scholarship prep support",
                ].map((item) => (
                  <div key={item} className="panel-soft px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="panel-deep p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f2c7b8]">
                Eligibility status
              </p>
              <h3 className="mt-3 font-display text-2xl">Track your readiness</h3>
              <p className="mt-3 text-sm text-[#d5cfc6]">
                See what is locked, eligible, or already applied in your dashboard. Paid plans
                unlock career and school applications.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Language level: N4", status: "Eligible" },
                  { label: "Visa documents", status: "Locked" },
                  { label: "Partner school intake", status: "Applied" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-[#2c3a39] bg-[#143733] px-4 py-3"
                  >
                    <span className="text-sm">{item.label}</span>
                    <span className="rounded-full bg-[#f7f3ee] px-3 py-1 text-xs font-semibold text-[#1c1b18]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="grid gap-6 pb-16">
          <div className="panel p-8">
            <span className="chip">Programs and exchanges</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Partner programs built across Uganda and Japan
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {programs.map((program) => (
                <div key={program.title} className="panel-soft p-5">
                  <h3 className="font-display text-lg text-[#121416]">{program.title}</h3>
                  <p className="mt-2 text-sm text-[#5a5f5f]">{program.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-outline">
                Partner with us
              </Link>
              <Link href="/contact" className="btn-accent">
                View exchange calendar
              </Link>
            </div>
          </div>
        </section>

        <section id="testimonials" className="grid gap-6 pb-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip">Testimonials</span>
              <h2 className="mt-3 font-display text-3xl text-[#121416]">
                Learners and partners who made the leap
              </h2>
            </div>
              <Link href="/testimonials" className="btn-outline">
                Read more stories
              </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="panel p-6">
                <p className="text-sm text-[#5a5f5f]">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#1c1b18]">{item.name}</p>
                  <p className="text-xs text-[#5a5f5f]">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="grid gap-6 pb-16">
          <div className="panel-deep p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                  Ready to apply
                </p>
                <h2 className="mt-3 font-display text-3xl">Start your Bridge journey</h2>
                <p className="mt-3 text-sm text-[#e3f3ef]">
                  Tell us your goal and we will recommend the right path, level placement, and next
                  class schedule.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary w-full sm:w-auto">
                  Apply for intake
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline border-[#cbe7e2] text-[#f7f3ee] w-full sm:w-auto"
                >
                  Speak to an advisor
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-20" id="faq">
          <div>
            <span className="chip">FAQ</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Answers before you enroll
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.question} className="panel p-6">
                <h3 className="text-sm font-semibold text-[#1c1b18]">{item.question}</h3>
                <p className="mt-3 text-sm text-[#5a5f5f]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
