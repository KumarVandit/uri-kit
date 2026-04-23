/**
 * Bundled MCP (Model Context Protocol) server for uri-kit.
 *
 * Exposes four tools over stdio JSON‑RPC 2.0:
 *
 *   - `search_uri`   — search the catalog
 *   - `get_uri`      — fetch a single entry by id
 *   - `build_uri`    — compose a URL from a URIDefinition
 *   - `validate_uri` — sanity‑check a URIDefinition against platform rules
 *
 * Run it with: `npx uri-kit mcp`
 *
 * Implements enough of the MCP spec (initialize / tools/list / tools/call)
 * that Cursor, Claude Desktop, and any MCP‑aware agent can use it directly.
 * Zero runtime dependencies.
 */
import { buildURL, URIBuildError } from "../build.js";
import { CATALOG, queryCatalog } from "../data/index.js";
import type { Category, Platform, URIDefinition } from "../types.js";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: number | string | null;
  method: string;
  params?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_NAME = "uri-kit";
const SERVER_VERSION = "0.1.0";

const TOOL_DEFS = [
  {
    name: "search_uri",
    description:
      "Search the uri-kit catalog of Apple platform deep links. Filter by platform, category, and free text. Returns matching URI entries with resolved URLs.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free‑text search." },
        platform: {
          type: "string",
          enum: ["ios", "ipados", "macos", "watchos", "visionos"],
        },
        category: { type: "string" },
        includeDeprecated: { type: "boolean" },
      },
    },
  },
  {
    name: "get_uri",
    description: "Get a single URI entry from the catalog by its stable id (e.g. `settings.wifi`).",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "build_uri",
    description:
      "Compose a final URL string from a URIDefinition object. The object accepts scheme, host, path, params, fragment, to, and url.",
    inputSchema: {
      type: "object",
      properties: {
        scheme: { type: "string" },
        host: { type: "string" },
        path: { type: "string" },
        fragment: { type: "string" },
        to: { type: "string" },
        url: { type: "string" },
        params: { type: "object", additionalProperties: true },
      },
    },
  },
  {
    name: "validate_uri",
    description:
      "Sanity‑check a URIDefinition. Returns { ok, errors, warnings } with schema‑style findings.",
    inputSchema: {
      type: "object",
      properties: {
        scheme: { type: "string" },
        host: { type: "string" },
        path: { type: "string" },
        params: { type: "object", additionalProperties: true },
        platforms: { type: "array", items: { type: "string" } },
      },
    },
  },
] as const;

function textBlock(text: string): { content: Array<{ type: "text"; text: string }> } {
  return { content: [{ type: "text", text }] };
}

function validate(def: URIDefinition): { ok: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!def.scheme && !def.url) errors.push("Either `scheme` or `url` is required.");
  if (def.scheme && /[:/]/.test(def.scheme)) errors.push("`scheme` must not contain ':' or '/'.");
  if (def.platforms && def.platforms.length === 0) warnings.push("`platforms` is empty.");
  return { ok: errors.length === 0, errors, warnings };
}

function handle(req: JsonRpcRequest): JsonRpcResponse | null {
  const id = req.id ?? null;
  try {
    switch (req.method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: { listChanged: false } },
            serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
          },
        };
      case "initialized":
      case "notifications/initialized":
        return null;
      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: TOOL_DEFS } };
      case "tools/call": {
        const p = (req.params ?? {}) as { name: string; arguments?: Record<string, unknown> };
        const args = p.arguments ?? {};
        switch (p.name) {
          case "search_uri": {
            const entries = queryCatalog({
              search: typeof args.query === "string" ? args.query : undefined,
              platform: args.platform as Platform | undefined,
              category: args.category as Category | undefined,
              includeDeprecated: args.includeDeprecated === true,
            }).slice(0, 50);
            const withUrls = entries.map((e) => ({ ...e, url: buildURL(e) }));
            return { jsonrpc: "2.0", id, result: textBlock(JSON.stringify(withUrls, null, 2)) };
          }
          case "get_uri": {
            const entry = CATALOG[args.id as string];
            if (!entry) throw new Error(`No URI with id "${args.id as string}"`);
            return {
              jsonrpc: "2.0",
              id,
              result: textBlock(JSON.stringify({ ...entry, url: buildURL(entry) }, null, 2)),
            };
          }
          case "build_uri": {
            const url = buildURL(args as URIDefinition);
            return { jsonrpc: "2.0", id, result: textBlock(url) };
          }
          case "validate_uri": {
            const v = validate(args as URIDefinition);
            return { jsonrpc: "2.0", id, result: textBlock(JSON.stringify(v, null, 2)) };
          }
          default:
            throw new Error(`Unknown tool: ${p.name}`);
        }
      }
      default:
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${req.method}` },
        };
    }
  } catch (e) {
    const message = e instanceof URIBuildError || e instanceof Error ? e.message : String(e);
    return { jsonrpc: "2.0", id, error: { code: -32000, message } };
  }
}

/**
 * Start the MCP server over stdio. Blocks until stdin closes.
 */
export async function startMCPServer(): Promise<void> {
  const stdin = process.stdin;
  const stdout = process.stdout;
  stdin.setEncoding("utf8");

  let buffer = "";
  stdin.on("data", (chunk: string) => {
    buffer += chunk;
    let newline: number;
    while ((newline = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      let req: JsonRpcRequest;
      try {
        req = JSON.parse(line) as JsonRpcRequest;
      } catch {
        continue;
      }
      const res = handle(req);
      if (res) stdout.write(`${JSON.stringify(res)}\n`);
    }
  });

  await new Promise<void>((resolve) => {
    stdin.on("end", resolve);
    stdin.on("close", resolve);
  });
}
