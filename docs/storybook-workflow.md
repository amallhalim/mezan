# 🎨 Storybook Workflow Guide

This guide covers the **when, how, and why** of working with Storybook in the Mizan project — from deciding when a component needs a story, to writing one, to triggering a new build.

> **Live Storybook:** [Chromatic Portal](https://main--67ad74c52428834f8fa0bb36.chromatic.com)
>
> For the full technical reference (decorators, actions, parameters, configuration), see [docs/storybook.md](./storybook.md).

---

## 📋 Table of Contents

- [When to Add a Story](#when-to-add-a-story)
- [How to Add a Story](#how-to-add-a-story)
- [When a New Build Is Needed](#when-a-new-build-is-needed)
- [Quick Reference](#quick-reference)

---

## When to Add a Story

Add a story file (`ComponentName.stories.tsx`) whenever you:

- **Create a new reusable UI component** — every shared component in `app/components/` must have a story.
- **Add a new variant, size, or state** to an existing component (e.g. a new `"warning"` variant on `Badge`).
- **Fix a visual bug** — add a story that reproduces the buggy state so it's captured in Chromatic's visual diff.
- **Modify component styling or layout** — existing stories serve as regression baselines.

> **Rule of thumb:** If a component has more than one visual state, it needs a story for each state.

---

## How to Add a Story

1. Create a `ComponentName.stories.tsx` file **beside** your component file (co-located).
2. Use the **CSF3** format with `satisfies Meta<typeof Component>` for type safety.
3. Include `tags: ["autodocs"]` to auto-generate a Docs page.
4. Cover all visual states: Default, Loading, Disabled, Error, and every variant.

### Quick-start Template

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MyComponent from "./MyComponent";

const meta = {
  title: "UI/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  args: { label: "Hello" },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Default State" },
};
```

### Next Steps

For advanced topics — decorators, actions, parameters, layout, and best practices — see the full [Storybook Guide](./storybook.md).

---

## When a New Build Is Needed

| Scenario                         | Action                                                                                                                    |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **You push to `main`**           | ✅ **Automatic** — GitHub Actions runs Chromatic and publishes a new build. No manual steps needed.                       |
| **You open a PR**                | ✅ **Automatic** — Chromatic creates a preview with visual diffs against `main`. Review and approve in the Chromatic UI.  |
| **You want to preview locally**  | Run `npm run build-storybook` to generate a static `storybook-static/` folder, then serve it with any static file server. |
| **You want to publish manually** | Run `npx chromatic --project-token=<token>` from your local machine (useful for testing before pushing).                  |

> **Note:** The `storybook-static/` folder is git-ignored and never committed. Always rely on the CI pipeline for the canonical published version.

---

## Quick Reference

| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `npm run storybook`       | Launches the local Storybook environment.   |
| `npm run build-storybook` | Builds Storybook for production deployment. |
| `npx chromatic ...`       | Publishes to Chromatic manually.            |
