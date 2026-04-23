import { buildURL } from "./build.js";
import { isBrowser } from "./env.js";
import type { CallableURI, URIDefinition } from "./types.js";

const APP_STORE_HOST = "https://apps.apple.com/app/id";

function openInBrowser(url: string): void {
  if (!isBrowser()) return;
  try {
    window.location.href = url;
  } catch {
    window.open(url, "_self");
  }
}

/**
 * Turn a {@link URIDefinition} into a callable that opens the URI.
 *
 * @example
 * ```ts
 * const openWiFi = defineURI({ scheme: "prefs", path: "WIFI" });
 * openWiFi(); // navigates
 * openWiFi.url; // "prefs:///WIFI"
 * ```
 */
export function defineURI(definition: URIDefinition): CallableURI {
  const url = buildURL(definition);

  const invoke = (async () => {
    if (!isBrowser()) {
      if (definition.onInvoke) definition.onInvoke(url);
      return;
    }

    openInBrowser(url);
    if (definition.onInvoke) definition.onInvoke(url);

    if (definition.fallback) {
      const fb = definition.fallback;
      const wait = new Promise<void>((r) => setTimeout(r, 1500));
      const hidden = new Promise<void>((r) => {
        const handler = () => {
          if (document.visibilityState === "hidden") r();
        };
        document.addEventListener("visibilitychange", handler, { once: true });
      });
      const stillHere = await Promise.race([wait.then(() => true), hidden.then(() => false)]);

      if (stillHere && !fb.silent) {
        if (fb.appStoreId) {
          openInBrowser(`${APP_STORE_HOST}${fb.appStoreId}`);
        } else if (fb.universalLink) {
          openInBrowser(fb.universalLink);
        }
      }
    }
  }) as CallableURI;

  Object.defineProperty(invoke, "url", { value: url, enumerable: true });
  Object.defineProperty(invoke, "definition", { value: definition, enumerable: true });

  return invoke;
}

/**
 * Programmatic open of a URIDefinition or already‑built URL string.
 */
export async function open(target: URIDefinition | CallableURI | string): Promise<void> {
  if (typeof target === "string") {
    openInBrowser(target);
    return;
  }
  if (typeof target === "function") {
    await target();
    return;
  }
  await defineURI(target)();
}

/**
 * Best‑effort check for whether a URI can be opened. Cannot be accurate on
 * iOS Safari (the OS gives us no signal); returns `true` on Apple platforms
 * when the scheme is in the catalog and `undefined` otherwise.
 *
 * Use {@link URIDefinition.fallback} for real fallback behaviour.
 */
export function canOpen(target: URIDefinition | string): boolean | undefined {
  if (!isBrowser()) return undefined;
  const scheme = typeof target === "string" ? target.split(":")[0] : target.scheme;
  if (!scheme) return undefined;
  return undefined;
}
