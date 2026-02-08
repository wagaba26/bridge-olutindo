import Link from "next/link";
import Image from "next/image";
import { Building2, BriefcaseBusiness, GraduationCap, Handshake, HeartHandshake, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const metadata = {
  title: "Partners | Bridge Olutindo",
  description: "Collaborate with Bridge Olutindo as a Ugandan or Japanese institution, employer, or support partner.",
};

const partnerTypes = [
  { label: "UG institution", icon: Landmark },
  { label: "JP institution", icon: Building2 },
  { label: "Employer", icon: BriefcaseBusiness },
  { label: "School", icon: GraduationCap },
  { label: "Sponsor", icon: Handshake },
  { label: "Support service", icon: HeartHandshake },
];

const onboardingTracks = [
  {
    title: "UG institution",
    points: ["Program objective and student profile", "Current training capacity", "Preferred JP collaboration type"],
  },
  {
    title: "JP institution",
    points: ["Target intake cycle", "Eligibility and language expectations", "Support required in Uganda"],
  },
  {
    title: "Employer",
    points: ["Role categories and hiring volume", "Onboarding timeline", "Interview and readiness process"],
  },
  {
    title: "School / Exchange",
    points: ["Program format and duration", "Admissions requirements", "Mobility and support structure"],
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b bg-white">
        <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Partners</p>
            <h1 className="mt-3 max-w-3xl">Build Uganda-Japan partnerships with one reliable operating partner.</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
              We work with institutions on both sides to prepare talent pipelines, admissions collaboration, and
              practical placement pathways.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="#partner-interest-form">Submit partner interest</Link>
              </Button>
              <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
                <Link href="/consultation">Book free consultation</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/partners/partners-hero.jpg"
              alt="Partnership discussion between institutions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {partnerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <article key={type.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <Icon className="mx-auto size-5 text-slate-700" />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{type.label}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="business-consulting" className="pb-10">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              Business consultancy
            </p>
            <h2 className="mt-2 text-2xl">Uganda-Japan business consultancy for institutions and companies</h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">
              Beyond talent and education pathways, Bridge supports organizations exploring practical business operations
              between Uganda and Japan through market orientation, partner matching, program structuring, and execution
              support.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold">Market orientation</p>
                <p className="mt-1">Understand sector realities, entry considerations, and early-stage positioning.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold">Partner matching</p>
                <p className="mt-1">Identify relevant schools, service providers, institutions, and business contacts.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold">Program structuring and execution</p>
                <p className="mt-1">Plan communication flow, local onboarding, and initial cross-border coordination.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">How partnership works</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">1. Discovery</p>
                <p className="mt-1">We align your goals, institution type, and expected timelines.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">2. Design</p>
                <p className="mt-1">Together we define intake flow, candidate criteria, and responsibilities.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">3. Launch</p>
                <p className="mt-1">We start with a pilot or recurring pipeline and track outcomes jointly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Partner onboarding guide</p>
            <h2 className="mt-2 text-2xl">Share the right details based on your institution type</h2>
            <p className="mt-2 text-sm text-slate-600">
              This helps our team respond with an aligned onboarding path instead of a generic follow-up.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {onboardingTracks.map((track) => (
                <article key={track.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <p className="font-semibold text-slate-900">{track.title}</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                    {track.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partner-interest-form" className="pb-12 md:pb-16">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <h2 className="text-2xl">Partner interest form</h2>
            <p className="mt-2 text-sm text-slate-600">
              Tell us what collaboration you are exploring. We respond with the right Uganda or Japan team.
            </p>
            <p className="mt-2 text-xs text-slate-500 md:text-sm">
              Typical first response time: within 1-2 business days after submission.
            </p>

            <form className="mt-6 space-y-4" action="/api/partners" method="post">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Organization name</label>
                  <Input name="organization" placeholder="e.g. Kyoto Language Academy" className="h-11 rounded-xl" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Contact person</label>
                  <Input name="contact_name" placeholder="Full name" className="h-11 rounded-xl" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email address</label>
                  <Input name="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Country / region</label>
                  <Input name="region" placeholder="Uganda / Japan / Other" className="h-11 rounded-xl" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Partner type</label>
                  <Select name="institution_type" defaultValue="">
                    <option value="" disabled>
                      Select partner type
                    </option>
                    <option>UG institution</option>
                    <option>JP institution</option>
                    <option>Employer</option>
                    <option>School</option>
                    <option>Sponsor</option>
                    <option>Support service</option>
                    <option>Business consultancy client</option>
                  </Select>
                  <p className="text-xs text-slate-500">Choose the type that best matches your organization.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Partnership model</label>
                  <Select name="partnership_model" defaultValue="">
                    <option value="" disabled>
                      Select model
                    </option>
                    <option>Talent pipeline</option>
                    <option>Education collaboration</option>
                    <option>Exchange program</option>
                    <option>Business consultancy</option>
                    <option>Custom model</option>
                  </Select>
                  <p className="text-xs text-slate-500">Choose your intended collaboration structure.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Primary focus</label>
                  <Input
                    name="partnership_focus"
                    placeholder="Recruitment, exchange, language, joint program"
                    className="h-11 rounded-xl"
                  />
                  <p className="text-xs text-slate-500">This helps us route your request to the right team quickly.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Target start window</label>
                  <Input name="target_start_window" placeholder="e.g. Q3 2026" className="h-11 rounded-xl" />
                  <p className="text-xs text-slate-500">Share your expected onboarding period.</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Additional details</label>
                <textarea
                  name="details"
                  required
                  className="min-h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                  placeholder="Share goals, timeline, and expected collaboration format."
                />
                <p className="text-xs text-slate-500">Include expected intake size or hiring volume if already known.</p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                We only use this information to review your partnership request and schedule follow-up communication.
              </div>

              <Button type="submit" className="h-11 rounded-xl px-5">
                Submit interest
              </Button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold">Book a call</h3>
              <p className="mt-2 text-sm text-slate-600">Prefer a direct conversation? Choose a free slot with the right desk.</p>
              <Button asChild variant="secondary" className="mt-4 h-11 w-full rounded-xl">
                <Link href="/consultation">Schedule free consultation</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              <h3 className="font-semibold text-slate-900">What happens next</h3>
              <ol className="mt-3 space-y-2">
                <li>1. We review your request and partner type.</li>
                <li>2. We schedule a short scoping call.</li>
                <li>3. We share a practical launch path for your partnership.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
