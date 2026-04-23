import { startMCPServer } from "../../mcp/index.js";

export async function runMCP(): Promise<void> {
  await startMCPServer();
}
