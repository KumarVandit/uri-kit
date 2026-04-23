import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "react/index": "src/react/index.ts",
    "agent/index": "src/agent/index.ts",
    "data/index": "src/data/index.ts",
    "cli/index": "src/cli/index.ts",
    "mcp/index": "src/mcp/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  splitting: false,
  treeshake: true,
  external: ["react"],
  banner: ({ format }) => {
    if (format === "esm") {
      return {
        js: "",
      };
    }
    return {};
  },
});
