import kleur from "kleur";
import { buildURL } from "../../build.js";
import type { URIDefinition } from "../../types.js";

export async function runBuild(args: string[]): Promise<void> {
  const raw = args.join(" ").trim();
  if (!raw) {
    console.log(kleur.red("Usage: uri-kit build '<JSON URIDefinition>'"));
    process.exit(1);
  }
  let def: URIDefinition;
  try {
    def = JSON.parse(raw) as URIDefinition;
  } catch (e) {
    console.log(kleur.red(`Invalid JSON: ${(e as Error).message}`));
    process.exit(1);
  }
  console.log(buildURL(def));
}
