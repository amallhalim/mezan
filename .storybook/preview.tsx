import type { Preview } from "@storybook/nextjs-vite";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    // Global background options — accessible via the toolbar in every story
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "light", value: "#f4f4f5" },
        { name: "surface", value: "#0d1f14" },
        { name: "dark", value: "#030a06" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
