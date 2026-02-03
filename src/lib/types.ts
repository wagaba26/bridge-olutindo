export type EligibilityStatus = "Locked" | "Eligible" | "Applied";

export type ClassSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  access: "Paid" | "Free";
  joinLink: string;
};

export type Recording = {
  id: string;
  title: string;
  level: string;
  duration: string;
  access: "Paid" | "Free";
};

export type Opportunity = {
  id: string;
  title: string;
  track: "Jobs" | "Schools";
  requirement: string;
  status: EligibilityStatus;
};
