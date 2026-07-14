import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./")
    }
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
        statements: 80 // 🧱 80% of individual commands must be reached
      }
    },
    projects: [{
      extends: true,
      test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./vitest.setup.ts"
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});