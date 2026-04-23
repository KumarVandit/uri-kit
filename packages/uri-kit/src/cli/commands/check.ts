import kleur from "kleur";
import { buildURL } from "../../build.js";
import { CATALOG } from "../../data/index.js";

export async function runCheck(_args: string[]): Promise<void> {
  let ok = 0;
  let failed = 0;
  const problems: string[] = [];

  for (const [id, def] of Object.entries(CATALOG)) {
    try {
      const url = buildURL(def);
      if (!url.includes(":")) throw new Error("missing scheme separator");
      ok++;
    } catch (e) {
      failed++;
      problems.push(`${id}: ${(e as Error).message}`);
    }
  }

  if (failed > 0) {
    for (const p of problems) console.log(kleur.red("✗"), p);
    console.log();
  }
  console.log(
    kleur.bold(`${ok} ok, ${failed} failed, ${Object.keys(CATALOG).length} total`),
  );
  if (failed > 0) process.exit(1);
}
