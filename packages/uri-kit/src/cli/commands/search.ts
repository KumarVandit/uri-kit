import kleur from "kleur";
import { buildURL } from "../../build.js";
import { queryCatalog } from "../../data/index.js";

export async function runSearch(args: string[]): Promise<void> {
  const query = args.join(" ").trim();
  if (!query) {
    console.log(kleur.red("Usage: uri-kit search <query>"));
    process.exit(1);
  }
  const results = queryCatalog({ search: query }).slice(0, 25);
  if (results.length === 0) {
    console.log(kleur.dim("No matches."));
    return;
  }
  for (const r of results) {
    const url = buildURL(r);
    console.log(`${kleur.bold(r.id ?? "")}  ${kleur.dim(url)}`);
    if (r.title) console.log(`  ${r.title}`);
  }
}
