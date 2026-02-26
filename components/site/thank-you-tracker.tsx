"use client";

import { useEffect } from "react";

import { ENGAGEMENT_SIGNAL_KEYS, markEngagementSignal, trackEvent } from "@/lib/journey-analytics";

export function ThankYouTracker({ source, desk }: { source: string; desk?: string }) {
  useEffect(() => {
    trackEvent("form_submit_success", { source, desk: desk ?? "" });

    if (source === "intake" || source === "contact" || source === "partners" || source === "consultation") {
      markEngagementSignal(ENGAGEMENT_SIGNAL_KEYS.formSubmittedAt);
    }
  }, [desk, source]);

  return null;
}
