import type { ClassSession, Opportunity, Recording } from "@/lib/types";

export const upcomingClasses: ClassSession[] = [
  {
    id: "class-1",
    title: "N5 Live Bootcamp",
    date: "Tue, Mar 12",
    time: "6:00 PM EAT",
    access: "Paid",
    joinLink: "#",
  },
  {
    id: "class-2",
    title: "Kanji clinic",
    date: "Thu, Mar 14",
    time: "7:30 PM EAT",
    access: "Paid",
    joinLink: "#",
  },
  {
    id: "class-3",
    title: "Free orientation",
    date: "Sat, Mar 16",
    time: "11:00 AM EAT",
    access: "Free",
    joinLink: "#",
  },
];

export const recordings: Recording[] = [
  {
    id: "rec-1",
    title: "N5 Grammar: Particles",
    level: "N5",
    duration: "48 min",
    access: "Paid",
  },
  {
    id: "rec-2",
    title: "N5 Listening drills",
    level: "N5",
    duration: "32 min",
    access: "Paid",
  },
  {
    id: "rec-3",
    title: "JLPT roadmap overview",
    level: "All levels",
    duration: "18 min",
    access: "Free",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Hospitality trainee — Osaka",
    track: "Jobs",
    requirement: "N4 + CV + interview prep",
    status: "Eligible",
  },
  {
    id: "opp-2",
    title: "Caregiver pathway — Nagoya",
    track: "Jobs",
    requirement: "N3 + medical readiness",
    status: "Locked",
  },
  {
    id: "opp-3",
    title: "Language school intake — Tokyo",
    track: "Schools",
    requirement: "N5 + documents",
    status: "Applied",
  },
];
