import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./Badge";
// The "meta" object configures how the component behaves in Storybook globally.
const meta = {
  // title: The path/category where this component will appear in the Storybook sidebar.
  title: "UI/Badge",

  // component: The actual React component being documented.
  component: Badge,

  // parameters: An object that configures Storybook features and addons for all stories of this component.
  parameters: {
    // layout: "centered" centers the component within the Storybook canvas preview area.
    layout: "centered",
    // backgrounds: Configures the background color options in the Storybook UI toolbar.
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },

  // tags: Enables specific Storybook behaviors. "autodocs" automatically generates a Docs page from these stories.
  tags: ["autodocs"],

  // decorators: Wraps all stories in extra markup (like providers, theme wrappers, or layout containers).
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],

  // argTypes: Configures the controls panel. It lets you define how users can interact with props.
  argTypes: {
    variant: {
      // control: "select" creates a dropdown menu for these specific options.
      control: "select",
      options: ["primary", "success", "warning", "error", "outline"],
    },
    size: {
      // control: "radio" creates radio buttons since there are only two options.
      control: "radio",
      options: ["sm", "md"],
    },
  },

  // args: The default prop values that apply to ALL stories unless overridden.
  args: {
    children: "Badge Label",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------
// Individual Stories
// Each export represents a different state or variant of the component.
// The `args` here override the default `args` defined in the `meta` object above.
// -----------------------------------------------------------------------------
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Badge",
  },
};
export const Success: Story = {
  args: {
    variant: "success",
    size: "md",
    children: "Completed",
  },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    size: "md",
    children: "Pending",
  },
};
export const ErrorState: Story = {
  args: {
    variant: "error",
    size: "md",
    children: "Failed",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: "Outline",
  },
};
