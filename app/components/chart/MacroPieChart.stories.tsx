import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MacroPieChart from "./MacroPieChart";

// MacroPieChart uses CSS variables: --protein, --carbs, --fat
// These are injected globally in .storybook/preview.tsx so all stories
// here will automatically have the correct colors.

const meta = {
  title: "Charts/MacroPieChart",
  component: MacroPieChart,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    protein: { control: { type: "range", min: 0, max: 200, step: 1 } },
    carbs: { control: { type: "range", min: 0, max: 500, step: 1 } },
    fat: { control: { type: "range", min: 0, max: 200, step: 1 } },
    size: { control: { type: "range", min: 60, max: 300, step: 10 } },
  },
  args: {
    protein: 30,
    carbs: 50,
    fat: 20,
    size: 120,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0d1f14",
          padding: "2rem",
          borderRadius: "20px",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MacroPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Balanced ─────────────────────────────────────────────────────────────────

export const Balanced: Story = {
  args: { protein: 30, carbs: 40, fat: 20 },
};

// ─── Macro Profiles ───────────────────────────────────────────────────────────

export const HighProtein: Story = {
  args: { protein: 180, carbs: 40, fat: 20 },
};

export const HighCarbs: Story = {
  args: { protein: 30, carbs: 300, fat: 20 },
};

export const HighFat: Story = {
  args: { protein: 30, carbs: 40, fat: 150 },
};

export const Keto: Story = {
  args: { protein: 80, carbs: 20, fat: 180 },
};

export const Vegan: Story = {
  args: { protein: 60, carbs: 250, fat: 40 },
};

// ─── Edge Cases ───────────────────────────────────────────────────────────────

/** When all macros are 0, the component renders an "Empty" placeholder. */
export const Empty: Story = {
  args: { protein: 0, carbs: 0, fat: 0 },
};

/** Only protein — single-slice chart. */
export const ProteinOnly: Story = {
  args: { protein: 150, carbs: 0, fat: 0 },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { protein: 30, carbs: 50, fat: 20, size: 80 },
};

export const Default: Story = {
  args: { protein: 30, carbs: 50, fat: 20, size: 120 },
};

export const Large: Story = {
  args: { protein: 30, carbs: 50, fat: 20, size: 200 },
};

// ─── Meal Examples (real-world data) ─────────────────────────────────────────

/** A typical chicken & rice meal. */
export const ChickenAndRice: Story = {
  args: { protein: 45, carbs: 55, fat: 8 },
};

/** A high-fat breakfast (eggs & bacon). */
export const EggsAndBacon: Story = {
  args: { protein: 25, carbs: 5, fat: 30 },
};

/** Daily macro summary for a 2000 kcal diet. */
export const DailySummary: Story = {
  args: { protein: 150, carbs: 200, fat: 67, size: 160 },
};
