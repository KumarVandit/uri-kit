import { useMemo } from "react";
import { defineURI } from "../define.js";
import type { CallableURI, URIDefinition } from "../types.js";
import { useURIKit } from "./provider.js";

/**
 * Memoized `defineURI`. Re‑builds when the definition identity changes.
 */
export function useURI(definition: URIDefinition): CallableURI {
  const ctx = useURIKit();
  return useMemo(
    () =>
      defineURI({
        ...definition,
        onInvoke: (url) => {
          definition.onInvoke?.(url);
          ctx.onInvoke?.(url);
        },
      }),
    // definition is typically an object literal; stable values in the object
    // decide identity via JSON.stringify in the user's render tree.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(definition), ctx.onInvoke],
  );
}
