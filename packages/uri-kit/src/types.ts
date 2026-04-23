export type Platform = "ios" | "ipados" | "macos" | "watchos" | "visionos";

export type Category =
  | "settings"
  | "apple-app"
  | "third-party"
  | "communication"
  | "media"
  | "navigation"
  | "productivity"
  | "developer"
  | "system"
  | "shortcuts"
  | "x-callback";

export type ParamPrimitive = string | number | boolean;

export type Params = Record<string, ParamPrimitive | undefined>;

/**
 * Fallback behaviour when the primary URI cannot be opened (app not installed,
 * scheme not registered, user on the wrong platform, etc.).
 */
export interface Fallback {
  /** Open an App Store page for the given numeric App Store ID. */
  appStoreId?: string;
  /** Open an arbitrary HTTPS universal link as a last resort. */
  universalLink?: string;
  /** Do nothing (silent). Default is to log a warning in dev. */
  silent?: boolean;
}

/**
 * Minimal metadata every URI in the catalog carries. Enables agent‑readable
 * dumps, per‑platform filtering, version gating, and docs grouping.
 */
export interface URIMetadata {
  /** Stable dotted identifier, e.g. `settings.wifi`, `music.playlist`. */
  id?: string;
  /** Human‑readable title for docs/search/copy‑as‑prompt. */
  title?: string;
  /** Longer description. */
  description?: string;
  /** Apple platforms where this URI is known to work. */
  platforms?: Platform[];
  /** Earliest platform version that supports this URI. */
  since?: string;
  /** Platform version that removed this URI, if any. */
  deprecated?: string;
  /** Docs grouping. */
  category?: Category;
  /** Free‑form caveats, bug notes, Reddit threads, etc. */
  notes?: string;
  /** Source URL/citation. */
  source?: string;
  /** Tags for search + agent lookup. */
  tags?: string[];
}

/**
 * The declarative description of a URI.
 *
 * At least one of `scheme` or `url` is required.
 */
export interface URIDefinition extends URIMetadata {
  /** URL scheme, without `://` (e.g. `prefs`, `music`, `sms`). */
  scheme?: string;
  /** Authority/host, if any (e.g. `music.apple.com`). */
  host?: string;
  /** Path after the authority, without a leading `/`. */
  path?: string;
  /** Fragment after `#`. */
  fragment?: string;
  /**
   * Query parameters. Values are URI‑encoded automatically.
   * Undefined values are omitted.
   */
  params?: Params;
  /**
   * Convenience: `to` for `sms:` / `tel:` / `mailto:`. Written into the URI
   * before the query string.
   */
  to?: string;
  /**
   * Escape hatch: a fully formed URL. When set, all other fields are ignored
   * except `fallback` and metadata.
   */
  url?: string;
  /** What to do if the primary URI fails to open. */
  fallback?: Fallback;
  /** Optional tap/invoke analytics hook. Fires with the resolved URL string. */
  onInvoke?: (url: string) => void;
}

/**
 * A callable URI. Returns a promise that resolves once the navigation has
 * been attempted (or the fallback has fired).
 */
export type CallableURI = {
  (): Promise<void>;
  /** The resolved URL string this URI would navigate to. */
  readonly url: string;
  /** The raw definition. */
  readonly definition: URIDefinition;
};

/**
 * A patch is a named bundle of URIs, typically shipped as JSON.
 */
export interface Patch {
  name: string;
  version: string;
  description?: string;
  author?: string;
  homepage?: string;
  license?: string;
  uris: Record<string, URIDefinition>;
}
