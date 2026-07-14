import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./Badge";
import React from "react";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "warning", "error", "outline"],
    },
    size: { control: "radio", options: ["sm", "md"] },
  },
  args: {
    children: "Badge",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Success: Story = {
  args: { variant: "success", children: "Completed" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending" },
};

export const Error: Story = {
  args: { variant: "error", children: "Failed" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  args: { size: "md", children: "Medium Badge" },
};

export const SizeSmall: Story = {
  args: { size: "sm", children: "Small Badge" },
};

// ─── Real-world content ───────────────────────────────────────────────────────

export const CalorieGoalMet: Story = {
  args: { variant: "success", children: "Goal Met" },
};

export const OverCalorie: Story = {
  args: { variant: "error", children: "Over Limit" },
};

export const NearLimit: Story = {
  args: { variant: "warning", children: "Near Limit" },
};

export const MealType: Story = {
  args: { variant: "primary", children: "Breakfast" },
};

// ─── All Variants Showcase ────────────────────────────────────────────────────

export const AllVariants: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  ],
  args: { children: "placeholder" },
};

// ─── Both Sizes Showcase ──────────────────────────────────────────────────────

export const BothSizes: Story = {
  decorators: [
    () => (
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Badge variant="primary" size="md">
          Medium
        </Badge>
        <Badge variant="primary" size="sm">
          Small
        </Badge>
      </div>
    ),
  ],
  args: { children: "placeholder" },
};
