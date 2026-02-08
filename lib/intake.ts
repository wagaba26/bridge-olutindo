export type IntakeFocus = "learn" | "jobs" | "study" | "partners";

export const ENABLE_JOBS_FOCUS = process.env.NEXT_PUBLIC_ENABLE_JOBS_FOCUS !== "false";

export const INTAKE_FOCUS_OPTIONS: Array<{
  value: IntakeFocus;
  label: string;
  description: string;
  enabled: boolean;
}> = [
  {
    value: "learn",
    label: "Learn Japanese",
    description: "Join language cohorts from N5 to N3 with structured preparation.",
    enabled: true,
  },
  {
    value: "jobs",
    label: "Jobs in Japan",
    description: "Explore vetted job tracks with language and interview readiness support.",
    enabled: ENABLE_JOBS_FOCUS,
  },
  {
    value: "study",
    label: "Study & Exchange",
    description: "Plan language school or university pathways with admissions guidance.",
    enabled: true,
  },
  {
    value: "partners",
    label: "Partnerships",
    description: "Collaborate with Bridge Olutindo across Uganda and Japan institutions.",
    enabled: true,
  },
];

export function getVisibleIntakeFocusOptions() {
  return INTAKE_FOCUS_OPTIONS.filter((option) => option.enabled);
}
