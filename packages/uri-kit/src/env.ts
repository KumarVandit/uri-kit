import type { Platform } from "./types.js";

/**
 * Detect the current platform from the browser user agent, if available.
 * Returns `undefined` in non‑browser contexts (Node, SSR).
 */
export function detectPlatform(): Platform | undefined {
  if (typeof navigator === "undefined") return undefined;
  const ua = navigator.userAgent ?? "";
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData?.platform;

  if (/iPhone|iPod/.test(ua)) return "ios";
  if (/iPad/.test(ua)) return "ipados";
  if (/Macintosh|Mac OS X/.test(ua) || platform === "macOS") return "macos";
  if (/Watch/.test(ua)) return "watchos";
  if (/Vision/.test(ua)) return "visionos";
  return undefined;
}

/** True if we're running in a browser context. */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** True if we appear to be on an Apple platform, based on UA. */
export function isApple(): boolean {
  const p = detectPlatform();
  return p === "ios" || p === "ipados" || p === "macos" || p === "watchos" || p === "visionos";
}
