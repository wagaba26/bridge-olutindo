export type JobCategory = "Factory" | "Caregiving" | "IT & Digital" | "Other";
export type JobMode = "In-person" | "Hybrid" | "Online";

export interface JobItem {
  slug: string;
  title: string;
  category: JobCategory;
  location: string;
  jlpt: "N5" | "N4" | "N3";
  duration: string;
  mode: JobMode;
  popular?: boolean;
  summary: string;
  image: string;
}

export const JOBS: JobItem[] = [
  {
    slug: "automotive-manufacturing-associate",
    title: "Automotive Manufacturing Associate",
    category: "Factory",
    location: "Aichi, Japan",
    jlpt: "N4",
    duration: "3-6 months pre-departure",
    mode: "In-person",
    popular: true,
    summary: "Assembly line work, quality checks, and shift operations for major manufacturing plants.",
    image: "/images/jobs/factory.jpg",
  },
  {
    slug: "food-processing-technician",
    title: "Food Processing Technician",
    category: "Factory",
    location: "Shizuoka, Japan",
    jlpt: "N5",
    duration: "3-6 months pre-departure",
    mode: "Hybrid",
    summary: "Support food handling, packaging, and hygiene control in regulated facilities.",
    image: "/images/jobs/factory.jpg",
  },
  {
    slug: "elderly-care-assistant",
    title: "Elderly Care Assistant",
    category: "Caregiving",
    location: "Osaka, Japan",
    jlpt: "N4",
    duration: "6-9 months pre-departure",
    mode: "Hybrid",
    popular: true,
    summary: "Work with licensed caregivers to support daily routines in elder care institutions.",
    image: "/images/jobs/caregiving.jpg",
  },
  {
    slug: "rehabilitation-support-staff",
    title: "Rehabilitation Support Staff",
    category: "Caregiving",
    location: "Tokyo, Japan",
    jlpt: "N3",
    duration: "6-9 months pre-departure",
    mode: "Hybrid",
    summary: "Assist therapists with mobility routines, documentation, and patient support workflows.",
    image: "/images/jobs/caregiving.jpg",
  },
  {
    slug: "junior-software-developer",
    title: "Junior Software Developer",
    category: "IT & Digital",
    location: "Tokyo, Japan",
    jlpt: "N3",
    duration: "6-12 months pre-departure",
    mode: "Hybrid",
    summary: "Entry-level engineering roles with onboarding support for code collaboration and delivery.",
    image: "/images/jobs/it.jpg",
  },
  {
    slug: "it-support-helpdesk",
    title: "IT Support and Helpdesk",
    category: "IT & Digital",
    location: "Kanagawa, Japan",
    jlpt: "N4",
    duration: "6-9 months pre-departure",
    mode: "Online",
    summary: "Provide first-line troubleshooting, ticket handling, and user support in mixed-language teams.",
    image: "/images/jobs/it.jpg",
  },
  {
    slug: "hospitality-service-staff",
    title: "Hospitality Service Staff",
    category: "Other",
    location: "Hokkaido, Japan",
    jlpt: "N4",
    duration: "3-6 months pre-departure",
    mode: "Hybrid",
    summary: "Support hotel and guest operations with customer service and front-of-house duties.",
    image: "/images/jobs/factory.jpg",
  },
  {
    slug: "agriculture-field-assistant",
    title: "Agriculture Field Assistant",
    category: "Other",
    location: "Nagano, Japan",
    jlpt: "N5",
    duration: "3-6 months pre-departure",
    mode: "In-person",
    summary: "Seasonal and structured farm tasks with safety onboarding and team coordination.",
    image: "/images/jobs/factory.jpg",
  },
];
