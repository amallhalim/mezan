import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginCypress from "eslint-plugin-cypress";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  // Dedicated configuration block for Cypress E2E testing files.
  // We use eslint-plugin-cypress to apply Cypress-specific linting rules 
  // because Cypress uses a different environment and different global variables (like cy) than Next.js.
  {
    files: ["cypress/**/*.ts", "cypress/**/*.js", "cypress.config.ts"],
    extends: [
      pluginCypress.configs.recommended,
    ],
    rules: {
      // Cypress heavily relies on expressions like `expect(val).to.be.true` which triggers this rule.
      "@typescript-eslint/no-unused-expressions": "off",
      // Cypress setup files use global namespaces (`declare global { namespace Cypress { ... } }`).
      "@typescript-eslint/no-namespace": "off",
      // Cypress configuration files often define parameters (like `on`, `config`) that aren't immediately used.
      "@typescript-eslint/no-unused-vars": "off",
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
