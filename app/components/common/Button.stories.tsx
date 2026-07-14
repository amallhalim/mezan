import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./Button";
import { ArrowRight, Trash2, Plus, Check } from "lucide-react";
import React from "react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "category"],
    },
    size: { control: "radio", options: ["sm", "md", "lg", "xl"] },
    isLoading: { control: "boolean" },
    isSelected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "Save Meal" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "View Details" },
};

export const Outline: Story = {
  args: { variant: "outline", size: "md", children: "Cancel" },
};

export const Category: Story = {
  args: {
    variant: "category",
    size: "md",
    children: "Breakfast",
    isSelected: false,
  },
};

export const CategorySelected: Story = {
  args: {
    variant: "category",
    size: "md",
    children: "Breakfast",
    isSelected: true,
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const ExtraLarge: Story = {
  args: { size: "xl", children: "Extra Large" },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Saving...",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Unavailable",
    disabled: true,
  },
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    rightIcon: <ArrowRight className="size-4" />,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Add Food",
    variant: "primary",
    leftIcon: <Plus className="size-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "Confirm",
    variant: "outline",
    leftIcon: <Check className="size-4" />,
    rightIcon: <ArrowRight className="size-4" />,
  },
};

// ─── All Sizes Showcase (story-level decorator) ───────────────────────────────

export const AllSizes: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Button size="sm" onClick={fn()}>
          Small Button
        </Button>
        <Button size="md" onClick={fn()}>
          Medium Button
        </Button>
        <Button size="lg" onClick={fn()}>
          Large Button
        </Button>
        <Button size="xl" onClick={fn()}>
          Extra Large Button
        </Button>
      </div>
    ),
  ],
  args: { children: "placeholder" },
};

// ─── Destructive — story-level decorator (Danger Zone wrapper) ───────────────

export const DestructiveAction: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#1c0a0a",
          border: "1px solid #7f1d1d",
          padding: "1.5rem",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            color: "#f87171",
            fontSize: "11px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "0.1em",
          }}
        >
          ⚠️ DANGER ZONE
        </p>
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Delete Account",
    variant: "outline",
    leftIcon: <Trash2 className="size-4" />,
  },
};
