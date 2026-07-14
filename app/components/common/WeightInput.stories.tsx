import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import WeightInput from "./WeightInput";

const meta = {
  title: "UI/WeightInput",
  component: WeightInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    amount: { control: "number" },
    unit: { control: "text" },
    label: { control: "text" },
  },
  args: {
    amount: 100,
    unit: "g",
    label: "Amount",
    onChange: fn(),
  },
  // Give the input a fixed width so it doesn't collapse
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WeightInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Units ───────────────────────────────────────────────────────────────────

export const Grams: Story = {
  args: { amount: 150, unit: "g", label: "Weight" },
};

export const Kilograms: Story = {
  args: { amount: 1.5, unit: "kg", label: "Weight" },
};

export const Milligrams: Story = {
  args: { amount: 500, unit: "mg", label: "Sodium" },
};

export const Calories: Story = {
  args: { amount: 350, unit: "kcal", label: "Calories" },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Empty: Story = {
  args: { amount: 0, unit: "g", label: "Amount" },
};

export const AtMaximum: Story = {
  args: { amount: 5000, unit: "g", label: "Max Amount (5000g)" },
};

export const LargeAmount: Story = {
  args: { amount: 2500, unit: "g", label: "Large Amount" },
};

// ─── Real-world labels ────────────────────────────────────────────────────────

export const ProteinServing: Story = {
  args: { amount: 150, unit: "g", label: "Chicken Breast" },
};

export const RiceServing: Story = {
  args: { amount: 200, unit: "g", label: "Cooked Rice" },
};

export const OilServing: Story = {
  args: { amount: 15, unit: "ml", label: "Olive Oil" },
};
