import type { URIDefinition } from "../types.js";

/**
 * x-callback-url catalog entries for well‑known Apple‑ecosystem apps. Each
 * entry documents the host scheme; consumers compose the final URL with
 * `buildXCallback(...)` or by supplying `host: "x-callback-url"` + `path`
 * + `params`.
 *
 * See: https://x-callback-url.com
 */
export const X_CALLBACK: Record<string, URIDefinition> = {
  "xcb.bear": {
    id: "xcb.bear",
    title: "Bear (x-callback)",
    scheme: "bear",
    host: "x-callback-url",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    source: "https://bear.app/faq/X-callback-url%20Scheme%20documentation/",
    notes: "Supported actions: /open-note, /create, /add-text, /search, /grab-url, /tags.",
  },
  "xcb.things": {
    id: "xcb.things",
    title: "Things (x-callback)",
    scheme: "things",
    host: "x-callback-url",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    source: "https://culturedcode.com/things/support/articles/2803573/",
  },
  "xcb.drafts": {
    id: "xcb.drafts",
    title: "Drafts (x-callback)",
    scheme: "drafts",
    host: "x-callback-url",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    source: "https://docs.getdrafts.com/docs/automation/urlschemes",
  },
  "xcb.shortcuts.run": {
    id: "xcb.shortcuts.run",
    title: "Shortcuts — Run (x-callback)",
    scheme: "shortcuts",
    host: "x-callback-url",
    path: "run-shortcut",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    notes: "Params: `name`, `input` (text/clipboard), plus x-success/x-cancel/x-error callbacks.",
  },
  "xcb.ulysses": {
    id: "xcb.ulysses",
    title: "Ulysses (x-callback)",
    scheme: "ulysses",
    host: "x-callback-url",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    source: "https://ulysses.app/kb/x-callback-url/",
  },
  "xcb.omnifocus": {
    id: "xcb.omnifocus",
    title: "OmniFocus (x-callback)",
    scheme: "omnifocus",
    host: "x-callback-url",
    platforms: ["ios", "ipados", "macos"],
    category: "x-callback",
    source: "https://inside.omnifocus.com/url-schemes",
  },
};
