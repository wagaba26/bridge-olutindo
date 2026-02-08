import { google } from "googleapis";

const DEFAULT_TIMEZONE = "Africa/Kampala";
export const DEFAULT_CONSULTATION_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

type DeskKey = "language" | "jobs" | "study" | "partners" | "business";

const CALENDAR_ENV_BY_DESK: Record<DeskKey, string> = {
  language: "GOOGLE_CALENDAR_ID_LANGUAGE",
  jobs: "GOOGLE_CALENDAR_ID_JOBS",
  study: "GOOGLE_CALENDAR_ID_STUDY",
  partners: "GOOGLE_CALENDAR_ID_PARTNERS",
  business: "GOOGLE_CALENDAR_ID_BUSINESS",
};

function getPrivateKey() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  return raw ? raw.replace(/\\n/g, "\n") : "";
}

function getAuthClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export function getDeskCalendarId(desk: string) {
  const key = desk as DeskKey;
  const envName = CALENDAR_ENV_BY_DESK[key];
  return envName ? process.env[envName] : undefined;
}

export function hasGoogleCalendarIntegration() {
  return Boolean(getAuthClient());
}

function toUtcIsoFromKampala(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours - 3, minutes, 0));
  return utcDate.toISOString();
}

function addMinutes(iso: string, minutesToAdd: number) {
  const date = new Date(iso);
  date.setUTCMinutes(date.getUTCMinutes() + minutesToAdd);
  return date.toISOString();
}

export async function getAvailableSlotsForDesk({
  desk,
  date,
  slotDurationMinutes = 45,
}: {
  desk: string;
  date: string;
  slotDurationMinutes?: number;
}) {
  const auth = getAuthClient();
  const calendarId = getDeskCalendarId(desk);

  if (!auth || !calendarId) {
    return { slots: DEFAULT_CONSULTATION_SLOTS, source: "fallback" as const };
  }

  const calendar = google.calendar({ version: "v3", auth });
  const timeMin = toUtcIsoFromKampala(date, "00:00");
  const timeMax = toUtcIsoFromKampala(date, "23:59");

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: DEFAULT_TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busyRanges = freeBusy.data.calendars?.[calendarId]?.busy ?? [];

  const available = DEFAULT_CONSULTATION_SLOTS.filter((slot) => {
    const start = toUtcIsoFromKampala(date, slot);
    const end = addMinutes(start, slotDurationMinutes);

    const overlaps = busyRanges.some((busy) => {
      if (!busy.start || !busy.end) return false;
      return start < busy.end && end > busy.start;
    });

    return !overlaps;
  });

  return { slots: available, source: "google-calendar" as const };
}

export async function createConsultationEvent({
  desk,
  date,
  time,
  fullName,
  email,
  phone,
  notes,
}: {
  desk: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}) {
  const auth = getAuthClient();
  const calendarId = getDeskCalendarId(desk);

  if (!auth || !calendarId) {
    return { created: false as const };
  }

  const calendar = google.calendar({ version: "v3", auth });
  const start = toUtcIsoFromKampala(date, time);
  const end = addMinutes(start, 45);

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Bridge consultation: ${desk} desk`,
      description: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nNotes:\n${notes || "None"}`,
      start: { dateTime: start, timeZone: DEFAULT_TIMEZONE },
      end: { dateTime: end, timeZone: DEFAULT_TIMEZONE },
      attendees: [{ email, displayName: fullName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    },
    sendUpdates: "all",
  });

  return { created: true as const };
}
