#!/usr/bin/env node
/**
 * uri-kit CLI entry point.
 *
 *   uri-kit add [user/repo]   # install a patch from the registry or a GitHub repo
 *   uri-kit init [name]       # scaffold a new patch
 *   uri-kit list              # list installed patches
 *   uri-kit check             # validate the catalog
 *   uri-kit mcp               # start the bundled MCP server
 *   uri-kit search <query>    # search the catalog from the terminal
 *   uri-kit build <json>      # compose a URL from a JSON URIDefinition
 *   uri-kit llms [path]       # emit llms.txt + llms-full.txt + api.json
 */
import kleur from "kleur";
import { runAdd } from "./commands/add.js";
import { runBuild } from "./commands/build.js";
import { runCheck } from "./commands/check.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runLLMs } from "./commands/llms.js";
import { runMCP } from "./commands/mcp.js";
import { runSearch } from "./commands/search.js";

const VERSION = "0.1.0";

function printHelp(): void {
  console.log(
    [
      `${kleur.bold("uri-kit")} ${kleur.dim(`v${VERSION}`)}`,
      "Declarative deep links for Apple platforms.",
      "",
      kleur.bold("Usage"),
      "  uri-kit <command> [options]",
      "",
      kleur.bold("Commands"),
      "  add [user/repo]    Install a patch from the registry or a GitHub repo",
      "  init [name]        Scaffold a new patch",
      "  list               List installed patches",
      "  check              Validate the catalog",
      "  search <query>     Search the catalog from the terminal",
      "  build <json>       Compose a URL from a JSON URIDefinition",
      "  llms [out]         Emit llms.txt, llms-full.txt, api.json",
      "  mcp                Start the bundled MCP server (stdio)",
      "",
      kleur.bold("Repo"),
      "  https://github.com/KumarVandit/uri-kit",
    ].join("\n"),
  );
}

async function main(): Promise<void> {
  const [, , command, ...rest] = process.argv;

  switch (command) {
    case undefined:
    case "help":
    case "-h":
    case "--help":
      printHelp();
      return;
    case "version":
    case "-v":
    case "--version":
      console.log(VERSION);
      return;
    case "add":
      await runAdd(rest);
      return;
    case "init":
      await runInit(rest);
      return;
    case "list":
    case "ls":
      await runList(rest);
      return;
    case "check":
      await runCheck(rest);
      return;
    case "search":
      await runSearch(rest);
      return;
    case "build":
      await runBuild(rest);
      return;
    case "llms":
      await runLLMs(rest);
      return;
    case "mcp":
      await runMCP();
      return;
    default:
      console.error(kleur.red(`Unknown command: ${command}`));
      printHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(kleur.red(err instanceof Error ? err.stack ?? err.message : String(err)));
  process.exit(1);
});
