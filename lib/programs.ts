export type ProgramFocus = "learn" | "jobs" | "study";

export type ProgramSummary = {
  title: string;
  slug: string;
  focus: ProgramFocus;
};

export const PROGRAMS: ProgramSummary[] = [
  { title: "N5 Evening Cohort", slug: "n5-evening-cohort", focus: "learn" },
  { title: "N5 Intensive Bootcamp", slug: "n5-intensive-bootcamp", focus: "learn" },
  { title: "N5 Online Weekend", slug: "n5-online-weekend", focus: "learn" },
  { title: "N4 Evening Program", slug: "n4-evening-program", focus: "learn" },
  { title: "N4 Exam Prep Clinic", slug: "n4-exam-prep-clinic", focus: "learn" },
  { title: "N3 Career Track", slug: "n3-career-track", focus: "learn" },
  { title: "N3 Reading & Listening Lab", slug: "n3-reading-listening-lab", focus: "learn" },
  { title: "Automotive & Manufacturing Associate", slug: "automotive-manufacturing-associate", focus: "jobs" },
  { title: "Food Processing & Packaging", slug: "food-processing-packaging", focus: "jobs" },
  { title: "Logistics & Warehouse Support", slug: "logistics-warehouse-support", focus: "jobs" },
  { title: "Elderly Care Assistant", slug: "elderly-care-assistant", focus: "jobs" },
  { title: "Rehabilitation & Support Staff", slug: "rehabilitation-support-staff", focus: "jobs" },
  { title: "Junior Software Developer", slug: "junior-software-developer", focus: "jobs" },
  { title: "IT Support & Helpdesk", slug: "it-support-helpdesk", focus: "jobs" },
  { title: "Hospitality & Service", slug: "hospitality-service", focus: "jobs" },
  { title: "Agriculture & Outdoor Work", slug: "agriculture-outdoor-work", focus: "jobs" },
  {
    title: "Language School → Vocational College",
    slug: "language-school-to-vocational-college",
    focus: "study",
  },
  { title: "Language School → University", slug: "language-school-to-university", focus: "study" },
  { title: "Short-Term Exchange & Summer", slug: "short-term-exchange-summer", focus: "study" },
  { title: "N5 Foundation", slug: "n5-foundation", focus: "learn" },
  { title: "N4 Completion", slug: "n4-completion", focus: "learn" },
  { title: "N3 Career Japanese", slug: "n3-career-japanese", focus: "learn" },
  { title: "Factory & Manufacturing Track", slug: "factory-manufacturing-track", focus: "jobs" },
  { title: "Caregiving Track", slug: "caregiving-track", focus: "jobs" },
  { title: "IT & Digital Careers Track", slug: "it-digital-careers-track", focus: "jobs" },
  {
    title: "Language School Placement Support",
    slug: "language-school-placement-support",
    focus: "study",
  },
  { title: "Scholarship Strategy Clinic", slug: "scholarship-strategy-clinic", focus: "study" },
  { title: "Study Planning Session", slug: "study-planning-session", focus: "study" },
];

const PROGRAM_BY_TITLE = PROGRAMS.reduce<Record<string, ProgramSummary>>((acc, program) => {
  acc[program.title] = program;
  return acc;
}, {});

const PROGRAM_BY_SLUG = PROGRAMS.reduce<Record<string, ProgramSummary>>((acc, program) => {
  acc[program.slug] = program;
  return acc;
}, {});

export function getProgramByTitle(title: string) {
  return PROGRAM_BY_TITLE[title];
}

export function getProgramBySlug(slug: string) {
  return PROGRAM_BY_SLUG[slug];
}

export function getProgramHref(title: string) {
  const program = getProgramByTitle(title);
  return program ? `/programs/${program.slug}` : "/intake";
}

export function getIntakeHref(title: string) {
  const program = getProgramByTitle(title);
  if (!program) {
    return "/intake";
  }
  return `/intake?focus=${program.focus}&program=${encodeURIComponent(program.title)}`;
}
