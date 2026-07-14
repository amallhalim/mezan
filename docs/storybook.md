# 🎨 Storybook Guide

Storybook is our primary tool for UI component development, testing, and documentation. It allows us to build components in isolation, away from the complex business logic and routing of the main application.

## 🚀 Getting Started

To launch the Storybook environment locally:

```bash
npm run storybook
```

This will start a local development server, typically available at [http://localhost:6006](http://localhost:6006).

To build a static production version of the documentation:

```bash
npm run build-storybook
```

---

## 🏗️ How Storybook is Configured

- **Framework**: `@storybook/nextjs-vite`
- **Tailwind CSS**: Storybook is fully integrated with our Tailwind configuration. The `.storybook/preview.tsx` file automatically imports `app/globals.css`, ensuring all custom design tokens, fonts, and CSS variables (like `--radius-lg`) work exactly as they do in the Next.js app.
- **Location**: All stories should be co-located with their components or placed in the `stories/` directory for general components.

---

## 📝 Writing Stories

A story captures a single specific state of a UI component. We use Component Story Format (CSF) version 3.

### Basic Structure

Here is a template for creating a story (e.g., `Button.stories.tsx`):

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// 1. Meta Configuration
// Describes the component to Storybook.
//This object tells Storybook:
//- Which component to render.
//- Where it appears in the Storybook sidebar.
//- What configuration applies to all stories in the file.
const meta = {
  title: "UI/Button", //This determines the sidebar hierarchy.  UI--->> Button
  component: Button,  //This tells Storybook which React component to render.
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // Auto-generates documentation pages
  argTypes: {
    // Defines interactive controls for props
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    args : {
      //These are the default values for the props.
    children: "Button",
    label:"Button",
    variant:"primary",

  },
} satisfies Meta<typeof Button>;
//### `StoryObj`
//Represents a single story.
//Every exported story is typed using `StoryObj`.
//This gives you:
//- Type safety
//- IntelliSense
//- Automatic prop validation


export default meta;

//This creates a reusable type for all stories in the file.
type Story = StoryObj<typeof meta>;



//A single component can have many stories.
//Each story represents a different state of the same component.
// 2. Stories
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Not Allowed",
  },
};
```

---

## ✅ Best Practices

1. **Use `autodocs`:** Always include `tags: ["autodocs"]` in the meta configuration so Storybook automatically parses your JSDoc comments into a readable documentation page.
2. **Document Props:** Ensure all props in your component interface have TSDoc comments (e.g., `/** The color variant */`). Storybook will read these and display them in the generated tables.
3. **Showcase All States:** Create separate stories for all critical states: Default, Hover/Active (if controlled by props), Disabled, Loading, and Error.
4. **Interactive Controls:** Use `argTypes` to let developers tweak component properties directly in the Storybook UI without modifying code.
5. **Location:** Keep one .stories.tsx file per component.
   Story files usually live beside the component.
6. **Export:** Always export `default meta;` and all stories as named exports.
