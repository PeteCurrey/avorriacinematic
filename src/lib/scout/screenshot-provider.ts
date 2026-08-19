/**
 * AVORRIA — SCREENSHOT PROVIDER
 *
 * Server-side screenshot abstraction. Designed to work with an external
 * browser/screenshot service (e.g. Browserless, a Puppeteer sidecar, or
 * a third-party screenshot API).
 *
 * If SCREENSHOT_PROVIDER_URL is not set: returns not_configured.
 * Never fakes screenshots. Never crashes the Scout run.
 */

export interface ScreenshotResult {
  status: "captured" | "not_configured" | "failed";
  storagePath?: string;
  imageBase64?: string;
  capturedAt?: string;
  error?: string;
  width?: number;
  height?: number;
  viewport: "desktop" | "mobile";
}

const DESKTOP_WIDTH  = 1440;
const DESKTOP_HEIGHT = 900;
const MOBILE_WIDTH   = 390;
const MOBILE_HEIGHT  = 844;

export async function captureScreenshot(
  url: string,
  viewport: "desktop" | "mobile"
): Promise<ScreenshotResult> {
  const providerUrl = process.env.SCREENSHOT_PROVIDER_URL;

  if (!providerUrl) {
    return { status: "not_configured", viewport };
  }

  const width  = viewport === "mobile" ? MOBILE_WIDTH  : DESKTOP_WIDTH;
  const height = viewport === "mobile" ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30_000);

    const res = await fetch(providerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, viewport, width, height }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const txt = await res.text().catch(() => "Unknown error");
      return { status: "failed", viewport, error: `Screenshot provider error ${res.status}: ${txt.slice(0, 100)}` };
    }

    const data = (await res.json()) as { imageBase64?: string; storagePath?: string; imageUrl?: string };

    const imageBase64: string | undefined = typeof data.imageBase64 === "string" ? data.imageBase64 : undefined;
    const storagePath: string | undefined = typeof data.storagePath === "string" ? data.storagePath
                                          : typeof data.imageUrl === "string"    ? data.imageUrl
                                          : undefined;

    return {
      status: "captured",
      imageBase64,
      storagePath,
      capturedAt: new Date().toISOString(),
      width,
      height,
      viewport,
    };

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      status: "failed",
      viewport,
      error: msg.includes("AbortError") || msg.includes("abort")
        ? "Screenshot timed out"
        : msg.slice(0, 100),
    };
  }
}

export function isScreenshotConfigured(): boolean {
  return !!process.env.SCREENSHOT_PROVIDER_URL;
}
