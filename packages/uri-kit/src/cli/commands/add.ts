import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import kleur from "kleur";

interface PatchManifest {
  name: string;
  version: string;
  uris: Record<string, unknown>;
}

const REGISTRY_URL = "https://github.com/KumarVandit/uri-kit";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return (await res.json()) as T;
}

async function installFromGitHub(slug: string): Promise<void> {
  const raw = `https://raw.githubusercontent.com/${slug}/main/.uri-kit/patch.json`;
  const fallback = `https://raw.githubusercontent.com/${slug}/master/.uri-kit/patch.json`;
  let manifest: PatchManifest;
  try {
    manifest = await fetchJSON<PatchManifest>(raw);
  } catch {
    manifest = await fetchJSON<PatchManifest>(fallback);
  }

  const outDir = resolve(process.cwd(), ".uri-kit", "packs");
  await mkdir(outDir, { recursive: true });
  const outFile = join(outDir, `${manifest.name}.json`);
  await writeFile(outFile, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    kleur.green("✓"),
    `Installed ${kleur.bold(manifest.name)} v${manifest.version} → ${kleur.dim(outFile)}`,
  );
}

export async function runAdd(args: string[]): Promise<void> {
  const target = args[0];
  if (!target) {
    console.log(kleur.bold("Browse the uri-kit patch registry"));
    console.log(kleur.dim(`  ${REGISTRY_URL}`));
    console.log();
    console.log("Install with one of:");
    console.log("  uri-kit add user/repo");
    console.log("  uri-kit add ./path/to/patch.json");
    return;
  }

  if (target.includes("/") && !target.startsWith(".") && !target.startsWith("/")) {
    await installFromGitHub(target);
    return;
  }

  console.log(kleur.yellow("Local patch install not yet implemented."));
}
