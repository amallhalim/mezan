import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    // Global background options — accessible via the toolbar in every story
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#030a06" }, // matches --background
        { name: "surface", value: "#0d1f14" }, // matches --surface
        { name: "light", value: "#f4f4f5" },
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

  // Global decorator: wraps EVERY story in the app's dark theme shell.
  // Also injects the macro CSS variables needed by MacroPieChart.
  decorators: [
    (Story) => (
      <div
        style={
          {
            // App design token values
            "--protein": "#10b981",
            "--carbs": "#f59e0b",
            "--fat": "#ef4444",
          } as React.CSSProperties
        }
      >
        <div
          style={{
            background: "#030a06",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
