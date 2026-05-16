import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // 🛡️ THE QUALITY GATE
      // This will make tests FAIL if coverage drops below these numbers
      thresholds: {
        branches: 80, // 🛣️ Every 'if' and 'else' must be triggered
        functions: 80, // 🧠 Every function/method must be called
        lines: 80, // 📝 80% of total lines must be executed
        statements: 80, // 🧱 80% of individual commands must be reached
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
