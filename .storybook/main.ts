import type { StorybookConfig } from "@storybook/nextjs-vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["..\\public"],
  async viteFinal(config) {
    // Mock next-intl and next/navigation modules
    const mockDir = join(__dirname, "mocks");

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl": join(mockDir, "next-intl.ts"),
      "next/navigation": join(mockDir, "next-navigation.ts"),
    };

    return config;
  },
};
export default config;
