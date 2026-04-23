import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import kleur from "kleur";

export async function runInit(args: string[]): Promise<void> {
  const name = args[0] ?? "my-patch";
  const outDir = resolve(process.cwd(), ".uri-kit", "packs");
  await mkdir(outDir, { recursive: true });
  const file = join(outDir, `${name}.json`);

  const manifest = {
    name,
    version: "0.1.0",
    description: "A uri-kit patch.",
    author: "",
    license: "MIT",
    uris: {
      "example.wifi": {
        id: "example.wifi",
        title: "Open Wi‑Fi",
        scheme: "prefs",
        path: "root=WIFI",
        platforms: ["ios", "ipados"],
        category: "settings",
      },
    },
  };

  await writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(kleur.green("✓"), `Created patch ${kleur.bold(name)} → ${kleur.dim(file)}`);
}
