import { buildURL } from "uri-kit";
import { APPLE_APPS, CATALOG, IOS_SETTINGS, MACOS_SETTINGS, X_CALLBACK } from "uri-kit/data";

export const dynamic = "force-static";

const PATCHES = {
  "apple-core": APPLE_APPS,
  "ios-settings": IOS_SETTINGS,
  macos: MACOS_SETTINGS,
  "x-callback": X_CALLBACK,
  all: CATALOG,
} as const;

type PatchName = keyof typeof PATCHES;

export function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  return (async () => {
    const { name } = await ctx.params;
    const bare = name.replace(/\.json$/, "") as PatchName;
    const source = PATCHES[bare];
    if (!source) return new Response("not found", { status: 404 });

    const payload = {
      name: bare,
      version: "0.1.0",
      description: `First‑party ${bare} patch.`,
      uris: Object.fromEntries(
        Object.entries(source).map(([id, def]) => [id, { ...def, url: buildURL(def) }]),
      ),
    };
    return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  })();
}

export async function generateStaticParams() {
  return Object.keys(PATCHES).flatMap((n) => [{ name: n }, { name: `${n}.json` }]);
}
