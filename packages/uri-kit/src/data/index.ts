import type { Category, Platform, URIDefinition } from "../types.js";
import { APPLE_APPS } from "./apple-apps.js";
import { IOS_SETTINGS } from "./ios-settings.js";
import { MACOS_SETTINGS } from "./macos.js";
import { X_CALLBACK } from "./x-callback.js";

export { APPLE_APPS, IOS_SETTINGS, MACOS_SETTINGS, X_CALLBACK };

/**
 * Flat catalog — every bundled URI, keyed by stable id.
 */
export const CATALOG: Record<string, URIDefinition> = {
  ...APPLE_APPS,
  ...IOS_SETTINGS,
  ...MACOS_SETTINGS,
  ...X_CALLBACK,
};

export interface CatalogQuery {
  platform?: Platform;
  category?: Category;
  search?: string;
  includeDeprecated?: boolean;
}

/**
 * Normalize text for search: lowercase, collapse Unicode dashes and typographic
 * punctuation into ASCII equivalents so `wi-fi` matches `Wi‑Fi`.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Filter the catalog. Plain string‑in‑string search over id, title,
 * description, notes, tags, and scheme. Dashes and typographic punctuation
 * are normalized so `wi-fi` matches `Wi‑Fi`.
 */
export function queryCatalog(query: CatalogQuery = {}): URIDefinition[] {
  const out: URIDefinition[] = [];
  const search = query.search ? normalize(query.search) : undefined;

  for (const entry of Object.values(CATALOG)) {
    if (!query.includeDeprecated && entry.deprecated) continue;
    if (query.platform && entry.platforms && !entry.platforms.includes(query.platform)) continue;
    if (query.category && entry.category !== query.category) continue;
    if (search) {
      const haystack = normalize(
        [
          entry.id ?? "",
          entry.title ?? "",
          entry.description ?? "",
          entry.notes ?? "",
          entry.scheme ?? "",
          ...(entry.tags ?? []),
        ].join(" "),
      );
      if (!haystack.includes(search)) continue;
    }
    out.push(entry);
  }

  return out;
}

export function getById(id: string): URIDefinition | undefined {
  return CATALOG[id];
}

export function allIds(): string[] {
  return Object.keys(CATALOG);
}

export const CATALOG_META = {
  version: "0.1.0",
  generatedAt: new Date("2026-04-23T00:00:00Z").toISOString(),
  counts: {
    total: Object.keys(CATALOG).length,
    appleApps: Object.keys(APPLE_APPS).length,
    iosSettings: Object.keys(IOS_SETTINGS).length,
    macosSettings: Object.keys(MACOS_SETTINGS).length,
    xCallback: Object.keys(X_CALLBACK).length,
  },
} as const;
