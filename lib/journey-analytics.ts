export const ENGAGEMENT_SIGNAL_KEYS = {
  primaryIntentAt: "bridge_primary_intent_at",
  formSubmittedAt: "bridge_form_submitted_at",
} as const;

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const event = {
    event: name,
    timestamp: Date.now(),
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("bridge:analytics", { detail: event }));
}

export function markEngagementSignal(key: string, at = Date.now()) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, String(at));
}
