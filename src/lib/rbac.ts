export const careerRoles = new Set([
  "STUDENT_CAREER",
  "ADMIN",
  "INSTRUCTOR",
]);

export const paidRoles = new Set([
  "STUDENT_PAID",
  "STUDENT_CAREER",
  "ADMIN",
  "INSTRUCTOR",
]);

export function hasCareerAccess(role?: string) {
  return role ? careerRoles.has(role) : false;
}

export function hasPaidAccess(role?: string) {
  return role ? paidRoles.has(role) : false;
}
