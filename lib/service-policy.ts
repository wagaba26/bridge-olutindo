export type IntakeFocus = "learn" | "study" | "partners";
export type ConsultationDesk = "language" | "study" | "partners" | "business";
export type ProgramFocus = "learn" | "study";

export const ALLOWED_INTAKE_FOCUS: IntakeFocus[] = ["learn", "study", "partners"];

export const ALLOWED_CONSULTATION_DESKS: ConsultationDesk[] = ["language", "study", "partners", "business"];

export function isAllowedIntakeFocus(value: string): value is IntakeFocus {
  return ALLOWED_INTAKE_FOCUS.includes(value as IntakeFocus);
}

export function isAllowedConsultationDesk(value: string): value is ConsultationDesk {
  return ALLOWED_CONSULTATION_DESKS.includes(value as ConsultationDesk);
}

export function isAllowedProgramFocus(value: string): value is ProgramFocus {
  return value === "learn" || value === "study";
}
