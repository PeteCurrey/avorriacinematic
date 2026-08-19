"use client";

import { logAnalyticsEvent } from "./events";
import { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  logAnalyticsEvent(name, {
    ...payload,
    timestamp: Date.now()
  });
}
