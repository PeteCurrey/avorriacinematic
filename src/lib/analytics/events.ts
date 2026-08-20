import type { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";

export function logAnalyticsEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[ANALYTICS] ${eventName}`, payload);
  }

  if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag("event", eventName, payload);
  }
}
