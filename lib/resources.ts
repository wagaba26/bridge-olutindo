export type ResourceCategory =
  | "Language Strategy"
  | "Study Planning"
  | "Life Systems"
  | "Compliance & Residency";

export type ResourceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ResourceArticle = {
  slug: string;
  title: string;
  category: ResourceCategory;
  readTime: string;
  excerpt: string;
  image: string;
  updatedAt: string;
  sections: ResourceSection[];
  sources: Array<{ label: string; href: string }>;
};

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: "japan-study-planning-roadmap",
    title: "Japan Study Planning Roadmap: A practical 12-month preparation system",
    category: "Study Planning",
    readTime: "15 min read",
    excerpt:
      "A structured planning model covering timelines, eligibility checks, funding paths, and document sequencing before departure.",
    image: "/images/blog/guide-2.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Define your intake window first",
        paragraphs: [
          "Start with the intake month, then plan backward. Most timelines fail because the intake target is vague or changes midstream.",
          "Pick the target intake, then set milestones for language evidence, documentation, and final submissions.",
        ],
        bullets: [
          "Lock a target intake month and a backup month.",
          "Set a submission window that ends at least 2 weeks before official deadlines.",
          "Assign an owner for each milestone so nothing is orphaned.",
        ],
      },
      {
        heading: "Baseline language evidence",
        paragraphs: [
          "Admissions and scholarship routes often require proof of Japanese or English proficiency. Treat language evidence as a core dependency, not a bonus.",
          "If you plan to take JLPT or EJU, align your study plan with the official examination cycles and submission windows.",
        ],
        bullets: [
          "Identify which exams are required for your target schools.",
          "Schedule exam dates early to avoid missing the intake window.",
          "Keep score reports and registration receipts in one folder.",
        ],
      },
      {
        heading: "Scholarship and funding map",
        paragraphs: [
          "Funding is a sequence, not a single step. Some scholarship routes require earlier planning and different documentation than standard admissions.",
          "Confirm each scholarship or support program timeline separately so your application order stays correct.",
        ],
        bullets: [
          "Check eligibility and deadlines for MEXT and JASSO related programs.",
          "Track embassy and university routes separately when both exist.",
          "Create a budget gap plan in case scholarship timing shifts.",
        ],
      },
      {
        heading: "Document production calendar",
        paragraphs: [
          "Document timing is the most common hidden risk. Transcripts, recommendation letters, and financial proofs often have lead times that are longer than expected.",
          "Build a production calendar with issue dates, expiry windows, and a weekly review cadence.",
        ],
        bullets: [
          "Create one tracker with status: requested, in progress, ready, submitted.",
          "Standardize file names for every document scan.",
          "Rebaseline the plan immediately if any document slips.",
        ],
      },
      {
        heading: "Decision model for school selection",
        paragraphs: [
          "Compare schools with a weighted decision model rather than reputation alone. This keeps decisions transparent and defensible.",
          "Include tuition, support systems, location costs, progression paths, and language support in the model.",
        ],
        bullets: [
          "Score each school against the same criteria.",
          "Write one sentence explaining each score to reduce bias.",
          "Validate hidden costs such as insurance, transport, and materials.",
        ],
      },
      {
        heading: "Submission and follow through",
        paragraphs: [
          "The final month should be execution only. Freeze edits and focus on quality control, submission confirmation, and response speed.",
          "Set a weekly status review with owners and dates so the plan stays stable under pressure.",
        ],
        bullets: [
          "Confirm portal uploads and attachments after submission.",
          "Monitor email daily for requests or corrections.",
          "Prepare arrival logistics once acceptance is confirmed.",
        ],
      },
    ],
    sources: [
      {
        label: "Study in Japan: Planning",
        href: "https://www.studyinjapan.go.jp/en/planning/",
      },
      {
        label: "Study in Japan: Examinations (EJU)",
        href: "https://www.studyinjapan.go.jp/en/planning/examination/",
      },
      {
        label: "Study in Japan: MEXT Scholarships",
        href: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/",
      },
    ],
  },
  {
    slug: "student-compliance-checklist-japan",
    title: "Student compliance checklist in Japan: Status, attendance, and documentation",
    category: "Compliance & Residency",
    readTime: "12 min read",
    excerpt:
      "A compliance-first guide to maintaining student status through attendance discipline, document updates, and clear reporting habits.",
    image: "/images/blog/guide-1.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Compliance is an operating system",
        paragraphs: [
          "Student status is protected by consistent attendance, accurate records, and early communication with your school.",
          "Treat compliance as a routine system with weekly and monthly checks, not a one time task.",
        ],
      },
      {
        heading: "Attendance and reporting rhythm",
        paragraphs: [
          "Attendance issues are the most common compliance risk. Build a weekly review habit so problems are visible early.",
          "If illness or emergencies occur, notify your school in writing as early as possible.",
        ],
        bullets: [
          "Track attendance weekly and review missed sessions.",
          "Keep written notices for any absence or schedule disruption.",
          "Ask your school for attendance thresholds and monitoring policy.",
        ],
      },
      {
        heading: "Address and document updates",
        paragraphs: [
          "Address changes and document renewals are time sensitive. Many downstream tasks depend on these records.",
          "Keep digital copies and renewal dates in one checklist that you review monthly.",
        ],
        bullets: [
          "Store copies of your residence card, address registration, and school records.",
          "Add reminders for renewals at least 60 days in advance.",
          "Confirm document submission windows with your school office.",
        ],
      },
      {
        heading: "School communication templates",
        paragraphs: [
          "Clear written updates reduce confusion. Use short, factual updates when you have schedule changes or documentation questions.",
          "Keep a record of messages and responses so you can track what was agreed.",
        ],
      },
      {
        heading: "Monthly compliance audit",
        paragraphs: [
          "Run a simple monthly audit: attendance summary, document status, and upcoming deadlines.",
          "This keeps small issues from becoming compliance risks later in the term.",
        ],
        bullets: [
          "Attendance: last 4 weeks vs required threshold.",
          "Documents: renewal dates and missing items.",
          "Deadlines: next 60 days for school and municipal updates.",
        ],
      },
      {
        heading: "Verify current guidance",
        paragraphs: [
          "Rules and documentation requirements can change. Always confirm the latest guidance with your school and official sources before acting.",
        ],
      },
    ],
    sources: [
      {
        label: "MOJ: Living Guidebook for Foreigners",
        href: "https://www.moj.go.jp/ENGLISH/m_nyuukokukanri10_00014.html",
      },
      {
        label: "Study in Japan: Planning and living information",
        href: "https://www.studyinjapan.go.jp/en/",
      },
    ],
  },
  {
    slug: "first-90-days-japan-systems-checklist",
    title: "Your first 90 days in Japan: Systems checklist for housing, health, and administration",
    category: "Life Systems",
    readTime: "16 min read",
    excerpt:
      "A detailed execution checklist for the first three months after arrival, focused on municipal procedures, health systems, and daily operations.",
    image: "/images/blog/guide-3.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Week 1 to 2: Registration and address workflow",
        paragraphs: [
          "Complete address registration and any linked municipal procedures first. Many services depend on this step.",
          "Use the Living Guidebook as your baseline for local procedure order and required documents.",
        ],
        bullets: [
          "Confirm what was completed at entry and what requires municipal follow up.",
          "Keep digital and printed copies of key residence documents.",
          "Track filing dates and update requirements in one checklist.",
        ],
      },
      {
        heading: "Week 2 to 4: Health and insurance readiness",
        paragraphs: [
          "Health system access should be operational before you need it. Know your local clinic options and emergency routes.",
          "Confirm insurance enrollment steps and any documents required by your municipality.",
        ],
      },
      {
        heading: "Week 4 to 8: Housing and utilities",
        paragraphs: [
          "Stabilize housing setup and utility accounts early so your study schedule is not disrupted later.",
          "Record account numbers, billing dates, and service contacts in one document.",
        ],
        bullets: [
          "Confirm billing cycles for electricity, gas, water, and internet.",
          "Set automatic reminders for payments.",
          "Keep a simple maintenance log for the first three months.",
        ],
      },
      {
        heading: "Week 4 to 8: Financial control rhythm",
        paragraphs: [
          "Build a monthly operating model with fixed costs, variable costs, and a buffer. Small tracking habits prevent large surprises.",
          "Run a weekly close on spending and adjust early when needed.",
        ],
        bullets: [
          "Run a weekly budget close every Sunday.",
          "Track rent, utilities, transport, communication, and food in one place.",
          "Set a minimum reserve target for unexpected expenses.",
        ],
      },
      {
        heading: "Week 8 to 12: Community and routines",
        paragraphs: [
          "Long term stability comes from predictable routines, study loops, and local support.",
          "Join campus or community activities that increase daily language exposure.",
        ],
      },
      {
        heading: "Continuous compliance habit",
        paragraphs: [
          "Keep all status related obligations visible in one recurring checklist. Missed deadlines often happen from fragmented notes, not complexity.",
        ],
      },
    ],
    sources: [
      {
        label: "MOJ: Living Guidebook for Foreigners",
        href: "https://www.moj.go.jp/ENGLISH/m_nyuukokukanri10_00014.html",
      },
      {
        label: "MHLW: Medical insurance system overview",
        href: "https://www.mhlw.go.jp/english/org/policy/p34-35.html",
      },
    ],
  },
  {
    slug: "japanese-language-progression-n5-to-n3",
    title: "From N5 to N3 without burnout: A high-discipline weekly language system",
    category: "Language Strategy",
    readTime: "13 min read",
    excerpt:
      "A detailed study architecture for learners moving from basic literacy to practical communication and exam readiness.",
    image: "/images/blog/guide-2.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Anchor to JLPT descriptors",
        paragraphs: [
          "JLPT levels provide clear benchmarks for reading, listening, and vocabulary scope. Use these descriptors to define your next target rather than guessing.",
          "Your weekly plan should map to the level you are aiming for next, not the level you already passed.",
        ],
      },
      {
        heading: "Weekly cycle that scales",
        paragraphs: [
          "Use a repeating five part cycle: vocabulary acquisition, grammar pattern drills, listening, output practice, and review.",
          "Each cycle should end with one measurable checkpoint, not just hours spent.",
        ],
        bullets: [
          "Vocabulary: curated target list with spaced repetition.",
          "Grammar: pattern drills with production examples.",
          "Listening: short daily exposure plus one longer session weekly.",
          "Output: structured speaking and short writing weekly.",
          "Review: error log and correction sprint every week.",
        ],
      },
      {
        heading: "Script progression: hiragana, katakana, kanji",
        paragraphs: [
          "Early stages should move from hiragana and katakana to increasing kanji load. Keep romaji only as a short term support and remove it quickly.",
          "Introduce kanji through high frequency words first, then expand by topic to match the JLPT level.",
        ],
      },
      {
        heading: "Listening and speaking loops",
        paragraphs: [
          "Daily listening builds pattern recognition. Pair it with short speaking drills so comprehension becomes usable output.",
          "Record yourself weekly and review error patterns instead of relying on memory.",
        ],
        bullets: [
          "Daily listening: 10 to 20 minutes of level aligned audio.",
          "Weekly speaking: 2 to 3 recorded prompts with feedback notes.",
          "Shadowing: repeat short audio lines for timing and rhythm.",
        ],
      },
      {
        heading: "Assessment checkpoints",
        paragraphs: [
          "Run a checkpoint every 4 to 6 weeks. Use a mix of reading, listening, and output to avoid blind spots.",
          "Track accuracy, speed, and error categories so you can adjust the next cycle.",
        ],
      },
      {
        heading: "Burnout control",
        paragraphs: [
          "Burnout usually comes from unstable workload and low feedback quality. Use sustainable session caps and weekly retrospectives.",
          "One missed week should trigger a recovery plan, not overcompensation.",
        ],
        bullets: [
          "Cap high intensity study blocks and protect sleep consistency.",
          "Keep one low pressure review day each week.",
          "Adjust monthly based on measurable performance trends.",
        ],
      },
    ],
    sources: [
      {
        label: "JLPT Official Website",
        href: "https://www.jlpt.jp/e/",
      },
      {
        label: "Japan Foundation: JF Standard Guidebook",
        href: "https://www.jpf.go.jp/e/project/japanese/education/standards.html",
      },
      {
        label: "Agency for Cultural Affairs: Handbook for Learning and Teaching Japanese",
        href: "https://www.bunka.go.jp/seisaku/kokugo_nihongo/kyoiku/handbook.html",
      },
    ],
  },
  {
    slug: "japan-budget-blueprint-first-six-months",
    title: "Japan Budget Blueprint: First six months without financial shocks",
    category: "Life Systems",
    readTime: "12 min read",
    excerpt:
      "A practical budgeting system for tuition, housing, transport, food, and emergency reserves for your first six months.",
    image: "/images/blog/guide-1.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Build a fixed cost baseline",
        paragraphs: [
          "Most new arrivals underestimate fixed monthly obligations. Build your budget around tuition, rent, utilities, transport, and insurance before discretionary spending.",
          "This prevents month two and month three cash flow pressure, where most planning failures happen.",
        ],
        bullets: [
          "Separate fixed and variable costs in different lines.",
          "Model best case and stress case monthly spending.",
          "Keep one reserve bucket for unexpected setup expenses.",
        ],
      },
      {
        heading: "One time setup costs",
        paragraphs: [
          "Initial setup includes housing deposits, transport cards, mobile setup, and basic household items. These costs hit early and should be budgeted separately.",
          "If possible, stage purchases over the first two months rather than the first two weeks.",
        ],
      },
      {
        heading: "Weekly close discipline",
        paragraphs: [
          "A monthly plan without weekly control breaks quickly. Use one weekly close process every Sunday to reconcile planned and actual spending.",
          "Small corrections weekly are easier than large corrections after a full month.",
        ],
      },
      {
        heading: "Protect emergency capacity",
        paragraphs: [
          "Your emergency reserve is a risk control system, not optional savings. Unexpected costs can include housing changes, medical needs, or document related expenses.",
          "The goal is continuity and calm decision making under pressure.",
        ],
      },
      {
        heading: "Cost control levers",
        paragraphs: [
          "Focus on a few high impact levers: housing choice, transport routes, and grocery planning.",
          "Make changes based on actual spending data rather than assumptions.",
        ],
        bullets: [
          "Track transport costs weekly and adjust routes if needed.",
          "Use a weekly meal plan to avoid high variance spending.",
          "Set a cap for discretionary spending and review monthly.",
        ],
      },
    ],
    sources: [
      {
        label: "Study in Japan: Planning and living information",
        href: "https://www.studyinjapan.go.jp/en/",
      },
      {
        label: "MOJ: Living Guidebook for Foreigners",
        href: "https://www.moj.go.jp/ENGLISH/m_nyuukokukanri10_00014.html",
      },
    ],
  },
  {
    slug: "uganda-to-japan-document-checklist-system",
    title: "Uganda to Japan document checklist: A no-miss preparation system",
    category: "Study Planning",
    readTime: "11 min read",
    excerpt:
      "A sequencing framework for transcripts, financial proofs, references, and application documents with owner based tracking.",
    image: "/images/blog/guide-3.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Start with issuer lead times",
        paragraphs: [
          "Strong applicants still miss windows because documents are requested too late or in the wrong order.",
          "Create a timeline based on the slowest issuing authority and work backward.",
        ],
        bullets: [
          "List every issuer and average processing time.",
          "Identify which documents require certified copies.",
          "Reserve time for corrections and reissues.",
        ],
      },
      {
        heading: "Use one tracker as source of truth",
        paragraphs: [
          "Split spreadsheets and chat only updates create blind spots. Keep one shared tracker and review it weekly with clear ownership.",
          "If one item moves, update downstream dates immediately.",
        ],
        bullets: [
          "Status labels: not started, requested, in progress, ready, submitted.",
          "Standard naming convention for all scanned files.",
          "Weekly quality check before submission windows.",
        ],
      },
      {
        heading: "Financial proof and sponsor clarity",
        paragraphs: [
          "Financial documentation is often the highest scrutiny area. Verify required formats and validity windows with your target institution.",
          "Keep sponsor letters and bank statements consistent in names, dates, and amounts.",
        ],
      },
      {
        heading: "Pre submission integrity review",
        paragraphs: [
          "Before submission, validate consistency across statements, references, and supporting records.",
          "An integrity review catches mismatch errors that delay decisions.",
        ],
      },
      {
        heading: "Submission and follow up",
        paragraphs: [
          "After submission, keep a log of confirmations, portal receipts, and follow up requests.",
          "Respond quickly to clarification requests so your application does not stall.",
        ],
      },
    ],
    sources: [
      {
        label: "Study in Japan: Planning",
        href: "https://www.studyinjapan.go.jp/en/planning/",
      },
      {
        label: "Study in Japan: Support programs",
        href: "https://www.studyinjapan.go.jp/en/about/support-program.html",
      },
    ],
  },
  {
    slug: "how-bridge-supports-your-japan-pathway",
    title: "How Bridge supports your Japan pathway: What we do at each stage",
    category: "Language Strategy",
    readTime: "10 min read",
    excerpt:
      "A stage by stage map of Bridge support from language baseline and intake planning to readiness reviews and ongoing advisory.",
    image: "/images/blog/guide-2.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Stage 1: Intake and baseline",
        paragraphs: [
          "We start by mapping your goal, timeline, current level, and constraints. The output is a practical action plan with a clear priority sequence.",
          "This stage reduces random effort and sets realistic execution expectations.",
        ],
      },
      {
        heading: "Stage 2: Structured language progression",
        paragraphs: [
          "You get a level aligned learning path from N5 to N3 with weekly cadence and feedback loops.",
          "For independent learners, teach yourself tasks and daily quizzes create continuity between sessions.",
        ],
      },
      {
        heading: "Stage 3: Study planning and relocation readiness",
        paragraphs: [
          "We support planning discipline around documentation, timeline management, and decision checkpoints.",
          "Our role is advisory and systems oriented: clear steps, clear owners, and clear next actions.",
        ],
      },
      {
        heading: "Stage 4: Ongoing accountability",
        paragraphs: [
          "Progress is maintained through periodic reviews, measurable milestones, and refinement of the weekly plan.",
          "We help learners stay consistent when schedules change or pressure increases.",
        ],
      },
    ],
    sources: [
      {
        label: "Bridge Learn page",
        href: "https://bridgeolutindo.com/learn",
      },
      {
        label: "Bridge Intake page",
        href: "https://bridgeolutindo.com/intake",
      },
    ],
  },
  {
    slug: "japan-visa-document-sequence-study-residence",
    title: "Japan visa document sequence for study and residence: A no-gap checklist",
    category: "Compliance & Residency",
    readTime: "12 min read",
    excerpt:
      "A practical sequence for COE, embassy processing, and post arrival registration, with timing controls for common delays.",
    image: "/images/blog/guide-1.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Confirm sponsor and acceptance",
        paragraphs: [
          "Confirm your accepting school or sponsoring organization first. Visa operations cannot start reliably without verified acceptance.",
          "Set one owner for each document to avoid duplicated effort and missed steps.",
        ],
      },
      {
        heading: "COE preparation controls timeline risk",
        paragraphs: [
          "The Certificate of Eligibility stage is often the longest and most variable step.",
          "Track document issuance dates and request clarifications early when sponsor requirements change.",
        ],
      },
      {
        heading: "Embassy submission quality",
        paragraphs: [
          "Use a final integrity check before embassy submission: naming, validity dates, and consistency across all forms.",
          "Keep digital copies and submission receipts for follow up operations.",
        ],
      },
      {
        heading: "Arrival registration and linked services",
        paragraphs: [
          "After entry, complete local registration and linked obligations in the first two weeks where possible.",
          "This makes banking, mobile setup, and service enrollment smoother.",
        ],
      },
      {
        heading: "Keep a renewal calendar",
        paragraphs: [
          "Create a simple renewal calendar for residence related documentation and school confirmations.",
          "Review it monthly so deadlines are visible before they become urgent.",
        ],
      },
    ],
    sources: [
      {
        label: "Immigration Services Agency of Japan",
        href: "https://www.moj.go.jp/isa/index.html",
      },
      {
        label: "MOJ: Living Guidebook for Foreigners",
        href: "https://www.moj.go.jp/ENGLISH/m_nyuukokukanri10_00014.html",
      },
    ],
  },
  {
    slug: "japan-daily-life-systems-neighborhood-banking-tax",
    title: "Daily life systems in Japan: Neighborhood rules, banking, and tax basics",
    category: "Life Systems",
    readTime: "11 min read",
    excerpt:
      "A practical operating guide for resident registration, waste sorting, banking setup, and first year administrative habits.",
    image: "/images/blog/guide-3.jpg",
    updatedAt: "2026-02-24",
    sections: [
      {
        heading: "Resident registration and municipal services",
        paragraphs: [
          "Complete your address registration and identify local service counters early. This unlocks many downstream tasks including insurance and local notices.",
          "Keep a simple file of municipal receipts and confirmations for future updates.",
        ],
      },
      {
        heading: "Neighborhood etiquette and waste rules",
        paragraphs: [
          "Local waste categories and schedules vary by municipality. Follow your district rules exactly to avoid fines or rejected pickups.",
          "Simple actions like greeting neighbors and observing quiet hours improve daily integration.",
        ],
      },
      {
        heading: "Banking and recurring payments",
        paragraphs: [
          "Set up one account for fixed costs and one record for monthly obligations.",
          "Track rent, utilities, transport, insurance, and tax reminders in a single monthly checklist.",
        ],
      },
      {
        heading: "Tax and record discipline",
        paragraphs: [
          "Keep all income records and administrative receipts. Annual obligations are easier when documents are organized from month one.",
          "When unsure, verify with municipal support offices before taking action.",
        ],
      },
      {
        heading: "Health and insurance orientation",
        paragraphs: [
          "Know your local clinic options and emergency procedures before you need them.",
          "Confirm insurance enrollment requirements and keep a copy of all related paperwork.",
        ],
      },
    ],
    sources: [
      {
        label: "MOJ: Living Guidebook for Foreigners",
        href: "https://www.moj.go.jp/ENGLISH/m_nyuukokukanri10_00014.html",
      },
      {
        label: "MHLW: Medical insurance system overview",
        href: "https://www.mhlw.go.jp/english/org/policy/p34-35.html",
      },
      {
        label: "National Tax Agency Japan (English)",
        href: "https://www.nta.go.jp/english/",
      },
    ],
  },
];

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "Language Strategy",
  "Study Planning",
  "Life Systems",
  "Compliance & Residency",
];

export function getResourceBySlug(slug: string) {
  return RESOURCE_ARTICLES.find((article) => article.slug === slug);
}
