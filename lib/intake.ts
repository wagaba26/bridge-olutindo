import type { IntakeFocus } from "@/lib/service-policy";

export type { IntakeFocus };

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
