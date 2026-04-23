import type { Params, URIDefinition } from "./types.js";

export class URIBuildError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "URIBuildError";
  }
}

function encodeParams(params: Params): string {
  const pairs: string[] = [];
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value === undefined) continue;
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return pairs.join("&");
}

/**
 * Build the final URL string from a {@link URIDefinition}.
 *
 * Rules:
 *   - If `url` is provided, it wins (after metadata merge).
 *   - Otherwise `scheme` is required.
 *   - `host` + `path` + `fragment` + `params` are composed in the standard order.
 *   - `to` is appended after `scheme:` before the query string, used by
 *     `sms:`, `tel:`, `mailto:`, `facetime:`, etc.
 *   - Values are URI‑encoded.
 */
export function buildURL(def: URIDefinition): string {
  if (def.url) return def.url;

  if (!def.scheme) {
    throw new URIBuildError("URIDefinition requires either `url` or `scheme`.");
  }

  const scheme = def.scheme.replace(/:+$/, "");
  const host = def.host ?? "";
  const rawPath = def.path ?? "";
  const to = def.to ?? "";

  let base: string;
  if (host) {
    const pathPart = rawPath ? (rawPath.startsWith("/") ? rawPath : `/${rawPath}`) : "";
    base = `${scheme}://${host}${pathPart}`;
  } else if (to) {
    base = `${scheme}:${to}`;
  } else if (rawPath) {
    // Without a host we emit the idiomatic single‑colon form used by
    // `prefs:root=WIFI` and `x-apple.systempreferences:com.apple.preference.security`.
    base = `${scheme}:${rawPath.replace(/^\/+/, "")}`;
  } else {
    base = `${scheme}://`;
  }

  const query = def.params ? encodeParams(def.params) : "";
  const fragment = def.fragment ? `#${def.fragment}` : "";

  return `${base}${query ? `?${query}` : ""}${fragment}`;
}

/**
 * x-callback-url builder. See https://x-callback-url.com
 */
export interface XCallbackOptions {
  scheme: string;
  action: string;
  actionParams?: Params;
  /** URL opened on success. */
  xSuccess?: string;
  /** URL opened on cancel. */
  xCancel?: string;
  /** URL opened on error. */
  xError?: string;
  /** Source name for UX. */
  xSource?: string;
}

export function buildXCallback(opts: XCallbackOptions): string {
  const params: Params = { ...opts.actionParams };
  if (opts.xSuccess) params["x-success"] = opts.xSuccess;
  if (opts.xCancel) params["x-cancel"] = opts.xCancel;
  if (opts.xError) params["x-error"] = opts.xError;
  if (opts.xSource) params["x-source"] = opts.xSource;

  return buildURL({
    scheme: opts.scheme,
    host: "x-callback-url",
    path: opts.action,
    params,
  });
}
