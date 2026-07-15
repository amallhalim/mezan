import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // 🛡️ THE QUALITY GATE
      // This will make tests FAIL if coverage drops below these numbers
      thresholds: {
        branches: 80,
        // 🛣️ Every 'if' and 'else' must be triggered
        functions: 80,
        // 🧠 Every function/method must be called
        lines: 80,
        // 📝 80% of total lines must be executed
        statements: 80, // 🧱 80% of individual commands must be reached
      },
    },
    // Exclude non-existent files and storybook/playwright tests
    // (Playwright requires `npx playwright install` to be run first)
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "app/[locale]/(pages)/calculator/page.test.tsx",
    ],
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
