"use client";

import { useEffect } from "react";
import type { RecruiterAnalyticsEvent } from "@/types/recruiter";

export function trackRecruiterEvent(
  event: RecruiterAnalyticsEvent,
  target?: string,
) {
  const payload = JSON.stringify({
    event,
    target,
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/recruiter", blob);
    return;
  }

  void fetch("/api/recruiter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function RecruiterAnalyticsTracker() {
  useEffect(() => {
    trackRecruiterEvent("recruiter_page_opened");
  }, []);

  return null;
}
