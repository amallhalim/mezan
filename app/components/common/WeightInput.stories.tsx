import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WeightInput from "./WeightInput";

const meta = {
  title: "UI/WeightInput",
  component: WeightInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    amount: { control: "number" },
    unit: { control: "text" },
    label: { control: "text" },
  },
} satisfies Meta<typeof WeightInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 150,
    unit: "g",
    label: "Custom Weight",
    onChange: (amount) => console.log("Weight changed to:", amount),
  },
};

export const Kilograms: Story = {
  args: {
    amount: 2.5,
    unit: "kg",
    label: "Total Weight",
    onChange: (amount) => console.log("Weight changed to:", amount),
  },
};
