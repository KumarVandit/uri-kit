import { defineURI } from "./define.js";
import type { CallableURI, Patch, URIDefinition } from "./types.js";

export class PatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PatchError";
  }
}

/**
 * A resolved, callable patch. `patch.open("settings.wifi")` invokes the
 * matching URI; `patch.uri("settings.wifi")` returns the raw `CallableURI`.
 */
export interface ResolvedPatch {
  readonly name: string;
  readonly version: string;
  readonly entries: ReadonlyMap<string, CallableURI>;
  /** Invoke a URI by id. */
  open(id: string): Promise<void>;
  /** Get the callable without invoking. */
  uri(id: string): CallableURI | undefined;
  /** Get the raw definition. */
  get(id: string): URIDefinition | undefined;
  /** Every id in the patch. */
  ids(): string[];
}

export function resolvePatch(patch: Patch): ResolvedPatch {
  const entries = new Map<string, CallableURI>();
  for (const [id, def] of Object.entries(patch.uris)) {
    entries.set(id, defineURI({ ...def, id: def.id ?? id }));
  }

  return {
    name: patch.name,
    version: patch.version,
    entries,
    async open(id: string) {
      const callable = entries.get(id);
      if (!callable) throw new PatchError(`uri-kit: no URI with id "${id}" in patch "${patch.name}"`);
      await callable();
    },
    uri(id: string) {
      return entries.get(id);
    },
    get(id: string) {
      return patch.uris[id];
    },
    ids() {
      return Array.from(entries.keys());
    },
  };
}

/**
 * Load a patch from a JSON URL. Browser‑only; Node consumers can just import
 * the JSON directly.
 */
export async function loadPatch(source: string | Patch): Promise<ResolvedPatch> {
  if (typeof source !== "string") return resolvePatch(source);
  const res = await fetch(source);
  if (!res.ok) throw new PatchError(`uri-kit: failed to fetch patch ${source}: ${res.status}`);
  const json = (await res.json()) as Patch;
  return resolvePatch(json);
}
