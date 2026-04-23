import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import kleur from "kleur";

export async function runList(_args: string[]): Promise<void> {
  const dir = resolve(process.cwd(), ".uri-kit", "packs");
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    console.log(kleur.dim("No patches installed. Run `uri-kit init` or `uri-kit add user/repo`."));
    return;
  }

  const jsons = files.filter((f) => f.endsWith(".json"));
  if (jsons.length === 0) {
    console.log(kleur.dim("No patches installed."));
    return;
  }

  for (const f of jsons) {
    try {
      const raw = await readFile(join(dir, f), "utf8");
      const m = JSON.parse(raw) as { name?: string; version?: string; uris?: Record<string, unknown> };
      const count = m.uris ? Object.keys(m.uris).length : 0;
      console.log(
        `${kleur.bold(m.name ?? f)} ${kleur.dim(`v${m.version ?? "?"}`)} ${kleur.dim(`(${count} URIs)`)}`,
      );
    } catch {
      console.log(kleur.red(`✗ ${f} (invalid)`));
    }
  }
}
