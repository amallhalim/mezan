# 🎨 Storybook Guide

Storybook is the primary tool for UI component development, visual testing, and documentation in Mizan. It lets you build and review components in isolation — completely separate from app routing, auth, or business logic.

> **Live Storybook:** Published automatically to Chromatic on every push to `main`.  
> Visit the published URL linked in the GitHub Actions workflow results.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Available Components](#available-components)
- [Configuration](#configuration)
- [Writing Stories](#writing-stories)
- [Actions & Events](#actions--events)
- [Parameters & Layout](#parameters--layout)
- [Decorators](#decorators)
- [Publishing to Chromatic](#publishing-to-chromatic)
- [Best Practices](#best-practices)

---

## 🚀 Getting Started

### Run Locally

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

### Build Static Output

```bash
npm run build-storybook
```

Produces a `storybook-static/` folder you can serve or deploy anywhere.

### Publish to Chromatic

```bash
npx chromatic --project-token=<your-token>
```

---

## 📦 Available Components

All reusable components have complete story coverage. Stories live **beside** their component file.

| Component       | Story File                                       | Stories                        | Category               |
| --------------- | ------------------------------------------------ | ------------------------------ | ---------------------- |
| `Button`        | `app/components/common/Button.stories.tsx`       | Variants, Sizes, States, Icons | `UI/Button`            |
| `Badge`         | `app/components/common/Badge.stories.tsx`        | Variants, Sizes, Showcases     | `UI/Badge`             |
| `WeightInput`   | `app/components/common/WeightInput.stories.tsx`  | Units, States, Labels          | `UI/WeightInput`       |
| `ScrollArrow`   | `app/components/common/ScrollArrow.stories.tsx`  | Direction, Visibility          | `UI/ScrollArrow`       |
| `MacroPieChart` | `app/components/chart/MacroPieChart.stories.tsx` | Profiles, Sizes, Meals         | `Charts/MacroPieChart` |

---

## ⚙️ Configuration

### Files

| File                     | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `.storybook/main.ts`     | Framework, addons, story file patterns     |
| `.storybook/preview.tsx` | Global decorators, parameters, CSS imports |

### Installed Addons

| Addon                      | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `@storybook/addon-docs`    | Auto-generates Docs pages from JSDoc + stories |
| `@storybook/addon-a11y`    | Accessibility audit panel                      |
| `@storybook/addon-vitest`  | Run Vitest tests inside Storybook              |
| `@chromatic-com/storybook` | Chromatic integration for visual testing       |

### Global Setup (`storybook.css` + `preview.tsx`)

Two files control the Storybook environment:

| File                       | Purpose                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `.storybook/storybook.css` | Imports Tailwind + app design tokens, then forces `:root { --background: #ffffff }` to override the dark green from `dark.css`. |
| `.storybook/preview.tsx`   | Imports `storybook.css`, sets background presets, adds Storybook addons.                                                        |

Together they ensure:

1. All Tailwind utilities, CSS variables, and design tokens are available.
2. The canvas background is white (`--background: #ffffff`) by default.
3. Toggle between white, light, surface, and dark via the toolbar (Backgrounds addon).

---

## 📝 Writing Stories

Stories use **Component Story Format 3 (CSF3)**.

### Minimal Template

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MyComponent from "./MyComponent";

const meta = {
  title: "UI/MyComponent", // Sidebar path: UI → MyComponent
  component: MyComponent,
  tags: ["autodocs"], // Auto-generates a Docs page
  args: {
    // Default props shared by all stories
    label: "Hello",
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Default State" },
};

export const Active: Story = {
  args: { label: "Active State", isActive: true },
};
```

### Key Concepts

| Concept              | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `meta.title`         | Sets the component's position in the sidebar (e.g. `"UI/Button"`) |
| `meta.component`     | The React component to render                                     |
| `tags: ["autodocs"]` | Auto-generates a Docs page from JSDoc comments                    |
| `meta.args`          | Default prop values shared across all stories in the file         |
| `story.args`         | Per-story overrides on top of `meta.args`                         |
| `meta.argTypes`      | Configures the Controls panel (dropdowns, radios, toggles)        |

---

## ⚡ Actions & Events

Wire component events to the **Actions panel** (bottom tab in Storybook) so every interaction is logged.

```tsx
import { fn } from "storybook/test";

const meta = {
  argTypes: {
    // Auto-label the action in the panel
    onClick: { action: "clicked" },
    onChange: { action: "changed" },
  },
  // fn() spy — logs every call with its arguments
  args: {
    onClick: fn(),
  },
};
```

> **Note:** In Storybook v10, always import `fn` from `"storybook/test"` — **not** from `"@storybook/test"` or `"@storybook/addon-actions"`.

---

## 🎛️ Parameters & Layout

Control the Storybook canvas environment per component or per story.

```tsx
const meta = {
  parameters: {
    // How the component is positioned in the canvas
    layout: "centered", // centered | fullscreen | padded

    // Background color switcher in the toolbar
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#030a06" },
        { name: "surface", value: "#0d1f14" },
        { name: "light", value: "#f4f4f5" },
      ],
    },

    // Simulate different screen sizes
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// Override parameters for a single story
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "padded",
  },
};
```

---

## 🎁 Decorators

Decorators wrap stories in extra UI or context. There are three levels:

```
Global (.storybook/preview.tsx)      → applies to ALL stories in the project
  └── Component (meta.decorators)    → applies to ALL stories in one file
        └── Story (story.decorators) → applies to ONE specific story
```

### Component-level Decorator

```tsx
const meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", background: "#0f172a" }}>
        <Story />
      </div>
    ),
  ],
};
```

### Story-level Decorator

```tsx
export const DangerState: Story = {
  decorators: [
    (Story) => (
      <div style={{ border: "1px solid red", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "error" },
};
```

---

## 🚀 Publishing to Chromatic

Storybook is published automatically via GitHub Actions to **Chromatic** on every push to `main`.

### Workflow File

See [`.github/workflows/chromatic.yml`](../.github/workflows/chromatic.yml).

### First-time Setup

1. Create a free account at [chromatic.com](https://www.chromatic.com)
2. Link your GitHub repository
3. Copy the **Project Token** from the Chromatic dashboard
4. Add it to GitHub Secrets:
   ```
   Repository → Settings → Secrets and variables → Actions
   → New repository secret
     Name:  CHROMATIC_PROJECT_TOKEN
     Value: <paste token>
   ```
5. Push to `main` — the Action runs and returns a public Storybook URL

### Manual Publish (local)

```bash
npx chromatic --project-token=<your-token>
```

### What Chromatic Provides

- ✅ **Public hosted URL** for your Storybook
- ✅ **Visual diff testing** on every PR (screenshot comparison)
- ✅ **Review workflow** to approve or reject UI changes
- ✅ **Free tier:** 5,000 snapshots/month

---

## ✅ Best Practices

1. **Import from the right package**

   ```tsx
   // ✅ Correct
   import type { Meta, StoryObj } from "@storybook/nextjs-vite";
   import { fn } from "storybook/test";

   // ❌ Wrong
   import type { Meta, StoryObj } from "@storybook/react";
   import { action } from "@storybook/addon-actions";
   ```

2. **Always use `autodocs`** — include `tags: ["autodocs"]` so a Docs page is auto-generated from your JSDoc comments.

3. **Document all props** — add TSDoc comments to every interface property so they appear in the Storybook controls table:

   ```ts
   interface ButtonProps {
     /** The visual style of the button */
     variant?: "primary" | "secondary";
   }
   ```

4. **Cover all states** — create separate stories for: Default, Loading, Disabled, Error, and any variant.

5. **Co-locate stories** — keep `Component.stories.tsx` in the same folder as `Component.tsx`.

6. **Use `satisfies`** for type safety:

   ```tsx
   } satisfies Meta<typeof MyComponent>;
   ```

7. **Never ignore `storybook-static/`** in ESLint manually — it's already in `globalIgnores` in `eslint.config.mjs` and `.prettierignore`.
