import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

const checks = [];

function check(id, ok, details) {
  checks.push({ id, ok, details });
}

const requiredPages = [
  "app/page.tsx",
  "app/learn/page.tsx",
  "app/study/page.tsx",
  "app/partners/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/japan-preparation/page.tsx",
  "app/faq/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/intake/page.tsx",
  "app/dashboard/page.tsx",
  "app/dashboard/learning/page.tsx",
  "app/dashboard/teaching/page.tsx",
];

for (const page of requiredPages) {
  check(`page:${page}`, exists(page), exists(page) ? "found" : "missing");
}

const homepage = read("app/page.tsx");
check("home:hero-section", /heroTitle/.test(homepage) && /primaryCta/.test(homepage), "hero section and CTAs");
check("home:spotlight-sections", /spotlightATitle/.test(homepage) && /spotlightBTitle/.test(homepage), "spotlight sections");
check("home:resources-section", /openAll/.test(homepage), "resources CTA section");

const contactPage = read("app/contact/page.tsx");
check("contact:routing-desk-select", /name="routing_desk"/.test(contactPage), "desk routing select in contact form");
check("contact:inquiry-type-select", /name="inquiry_type"/.test(contactPage) && /Select/.test(contactPage), "inquiry type options");

const consultationPage = read("app/consultation/page.tsx");
check("consultation:desk-select", /name="desk"/.test(consultationPage), "consultation desk options");
check("consultation:slot-selector", /Available time slots/.test(consultationPage), "time slot UX");

const intakeForm = read("components/site/intake-form.tsx");
check("intake:focus-select", /name="focus"/.test(intakeForm), "focus routing select");
check("intake:preferred-desk", /name="preferred_support_desk"/.test(intakeForm), "preferred desk routing");
check("intake:stage-select", /name="current_stage"/.test(intakeForm) && /<Select/.test(intakeForm), "current stage dropdown");

const partnersPage = read("app/partners/page.tsx");
check("partners:routing-desk", /name="routing_desk"/.test(partnersPage), "hidden desk routing");
check("partners:focus-dropdown", /name="partnership_focus"/.test(partnersPage) && /Select/.test(partnersPage), "partnership focus options");

const contactApi = read("app/api/contact/route.ts");
check("api:contact-desk-validation", /routingDesk/.test(contactApi) && /isAllowedConsultationDesk/.test(contactApi), "contact desk validation");
check("api:contact-thankyou-desk", /searchParams\.set\("desk"/.test(contactApi), "contact thank-you desk param");

const intakeApi = read("app/api/intake/route.ts");
check("api:intake-desk-validation", /preferredSupportDesk/.test(intakeApi) && /isAllowedConsultationDesk/.test(intakeApi), "intake desk validation");
check("api:intake-thankyou-desk", /searchParams\.set\("desk"/.test(intakeApi), "intake thank-you desk param");

const partnersApi = read("app/api/partners/route.ts");
check("api:partners-desk-routing", /routingDesk/.test(partnersApi) && /focus: routingDesk/.test(partnersApi), "partner desk routing");
check("api:partners-thankyou-desk", /searchParams\.set\("desk"/.test(partnersApi), "partners thank-you desk param");

const consultationApi = read("app/api/consultations/route.ts");
check("api:consultation-thankyou-desk", /searchParams\.set\("desk"/.test(consultationApi), "consultation thank-you desk param");

const thankYouPage = read("app/thank-you/page.tsx");
check("thank-you:routed-desk-ui", /Routed to:/.test(thankYouPage), "desk routing confirmation message");

const resources = read("lib/resources.ts");
const slugCount = (resources.match(/slug:\s*"/g) ?? []).length;
check("resources:article-depth", slugCount >= 9, `article count: ${slugCount}`);

const prepPage = read("app/japan-preparation/page.tsx");
check("prep:compliance-module", /Compliance and residency/.test(prepPage), "compliance module section");
check("prep:study-module", /Studying in Japan/.test(prepPage), "study module section");
check("prep:living-module", /Living in Japan/.test(prepPage), "living module section");
check("prep:quiz-link", /teach-yourself and quiz/.test(prepPage), "self-study and quiz CTA");

const reportPath = path.join(ROOT, "docs", "information-audit-report.md");
const timestamp = new Date().toISOString();
const lines = [
  "# Information Audit Report",
  "",
  `Generated: ${timestamp}`,
  "",
  "## Checks",
  ...checks.map((entry) => `- [${entry.ok ? "x" : " "}] ${entry.id} - ${entry.details}`),
  "",
  `## Summary`,
  `- Passed: ${checks.filter((entry) => entry.ok).length}`,
  `- Failed: ${checks.filter((entry) => !entry.ok).length}`,
];

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

const failed = checks.filter((entry) => !entry.ok);
if (failed.length > 0) {
  console.error("Information audit failed. See docs/information-audit-report.md");
  process.exit(1);
}

console.log("Information audit passed. Report written to docs/information-audit-report.md");
