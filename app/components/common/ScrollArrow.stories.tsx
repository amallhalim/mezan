import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import ScrollArrow from "./ScrollArrow";

// ScrollArrow uses useLocale() from next-intl internally.
// We mock the module here so it renders correctly in Storybook without a full next-intl Provider.
// The decorator below overrides the locale value per story.

const meta = {
  title: "UI/ScrollArrow",
  component: ScrollArrow,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    direction: { control: "radio", options: ["left", "right"] },
    visible: { control: "boolean" },
  },
  args: {
    onClick: fn(),
    visible: true,
    direction: "right",
  },
  decorators: [
    // Give the arrow a dark container so it's visible against the background
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          background: "#0d1f14",
          borderRadius: "16px",
          minWidth: "200px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "40px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#4b5563", fontSize: "10px" }}>
            scroll content
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Direction ───────────────────────────────────────────────────────────────

export const RightArrow: Story = {
  args: { direction: "right", visible: true },
};

export const LeftArrow: Story = {
  args: { direction: "left", visible: true },
};

// ─── Visibility ──────────────────────────────────────────────────────────────

export const Hidden: Story = {
  args: { direction: "right", visible: false },
};

export const Visible: Story = {
  args: { direction: "right", visible: true },
};

// ─── Both Arrows (as seen in the app) ────────────────────────────────────────

export const BothArrows: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#0d1f14",
          borderRadius: "16px",
          padding: "1.5rem",
        }}
      >
        <ScrollArrow direction="left" visible={true} onClick={fn()} />
        <div
          style={{
            width: "200px",
            height: "40px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#4b5563", fontSize: "10px" }}>
            horizontal scroll area
          </span>
        </div>
        <ScrollArrow direction="right" visible={true} onClick={fn()} />
      </div>
    ),
  ],
  args: { direction: "right", visible: true },
};
