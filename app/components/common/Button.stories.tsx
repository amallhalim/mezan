import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import React from "react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // onClick is wired to the Actions panel — every click is logged automatically
    onClick: { action: "clicked" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "category"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
    },
    isLoading: { control: "boolean" },
    isSelected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  // fn() spy — logs every call with arguments to the Actions panel
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: "Outline Button",
  },
};

export const Category: Story = {
  args: {
    variant: "category",
    size: "md",
    children: "Category Button",
    isSelected: false,
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Loading...",
    isLoading: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Continue",
    rightIcon: <ArrowRight className="size-4" />,
  },
};
