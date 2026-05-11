# 🧪 Testing Guide

This project uses **Vitest** and **React Testing Library** for unit and integration testing. We use **Global APIs**, so functions like `test`, `expect`, and `describe` are available everywhere without imports.

---

## 🚀 Running Tests (Modes)

### 1. Terminal Watch Mode (Fastest)
Runs tests in the terminal and waits for changes.
```bash
npm test
```

### 2. Visual Dashboard Mode (Recommended)
Opens a beautiful browser interface to see results, errors, and files.
```bash
npm run test:ui
```

### 3. Coverage Mode (Scorecard)
See exactly which lines of code are NOT tested.
```bash
npm run test:coverage       # Text report in terminal
npm run test:ui:coverage    # Visual report in browser (Awesome!)
```

> [!TIP]
> **Focus on one file**: You can run coverage for just one file by adding its name:
> `npm run test:ui:coverage -- FoodCard`


#### ❓ Why use Coverage?
Testing shows that your code **works**. Coverage shows what you **forgot to test**.
*   **Find Blind Spots**: It highlights `if/else` branches or `error` handlers that your tests never touched.
*   **Quality Score**: It gives you a clear percentage (e.g., 85%) of how much of your logic is "safe".
*   **Risk Management**: Untested code is where bugs hide. Coverage finds those hiding spots.

#### 🛣️ Branch Coverage (The "Fork in the Road")
A 100% "Line Coverage" score doesn't always mean your code is perfect. You also need to watch **Branch Coverage**:
*   **The Happy Path**: Testing when everything works as expected.
*   **The Sad Path**: Testing the `else` blocks, error handlers, and empty states.
*   **The Rule**: If you have an `if/else`, you must have tests that trigger **both** sides to get 100% branch coverage.

---

## 🛡️ The Quality Gate (Thresholds)

We have a **Strict Quality Policy** in this project. The tests will **FAIL** automatically if the coverage drops below **80%**.

*   **Branches**: 80%
*   **Functions**: 80%
*   **Lines**: 80%
*   **Statements**: 80%

**Why?** This prevents "code decay" and ensures that as the project grows, we maintain a high standard of safety. If you add new code without tests, Vitest will alert you!

---

## ⚙️ Configuration Location

We store our test configuration in **`vitest.config.ts`** instead of `package.json`.

*   **Type Safety**: TypeScript provides auto-completion and error checking while writing config.
*   **Power & Logic**: `.ts` files allow us to use variables and dynamic logic (e.g., changing paths).
*   **Cleanliness**: Keeps `package.json` focused only on dependencies and scripts.

---

### 4. CI Mode (Run Once)
Runs all tests and exits (useful for GitHub Actions).
```bash
npm run test -- --run
```

---

## 🎯 Testing Specific Files

If you want to focus on a single part of the app, you can filter by filename:

**In the terminal:**
```bash
npm test FoodCard
```

**In UI Mode:**
1. Run `npm run test:ui -- FoodCard`
2. OR: Use the **Search (🔍)** bar in the browser dashboard.

---

## 📦 Test Fixtures (Centralized Data)

To keep tests clean and consistent, we store all mock data in **`app/tests/fixtures.ts`**.
*   **Why?** If you change your data structure, you only fix it once.
*   **Usage:** `import { mockFoodData } from "@/app/tests/fixtures";`

---

## ❓ How Vitest Works

### Test Detection (Test vs. Component)
Vitest is smart enough to know which files are logic and which are tests. It identifies files based on the **suffix**:
- ✅ **Included:** `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- ❌ **Ignored:** `*.ts`, `*.tsx` (Your actual UI components)

### Global APIs
You do **not** need to write `import { test } from 'vitest'` in every file. This is enabled via:
- `vitest.config.ts`: `globals: true`
- `tsconfig.json`: `"types": ["vitest/globals"]`

---

## 💡 Pro Tips

### Regex Matchers
Don't use exact strings for text that might change or have labels. Use **Regex literals** instead:
```typescript
// ❌ Exact Match (fails if text is "P: 31g")
expect(screen.getByText('31')).toBeInTheDocument()

// ✅ Regex Match (passes if "31" exists anywhere in the text)
expect(screen.getByText(/31/)).toBeInTheDocument()
```

### Mocking Next.js
If a component uses `next/image`, it will fail in tests unless mocked. We have global mocks for this, but you can add specific ones using `vi.mock()`.

---

## 🛠️ Custom Render Helper (`test-utils.tsx`)

In professional React projects, components often depend on **Global Providers** (Theme, Auth, Language). Instead of manually wrapping every test in `<ThemeProvider>`, we use a **Custom Render Helper**.

### ❓ Why use `app/tests/test-utils.tsx`?

1.  **Automatic Wrapping**: Every time you call `render()`, the component is automatically wrapped in all necessary providers.
2.  **Scalability**: If you add a new provider (e.g., `AuthProvider`), you only add it in **one place** (`test-utils.tsx`) instead of fixing 100 test files.
3.  **Clean Tests**: Your test files stay focused on the logic, not the boilerplate.

### 🚀 How to use it:

Instead of importing from `@testing-library/react`, always import from your local helper:

```typescript
// ❌ Avoid this
import { render } from "@testing-library/react"; 

// ✅ Do this
import { render, screen } from "./tests/test-utils"; 

test("my test", () => {
  render(<MyComponent />); // Works perfectly with Theme!
});
```

---

---

## 🔍 Debugging & Finding Selectors

When you're struggling to find the right `role` or `label` for an element, use the **Testing Playground**.

### 🛠️ Using `logTestingPlaygroundURL()`
Add this line inside your test after `render()`:
```typescript
screen.logTestingPlaygroundURL()
```
When you run the test, it will print a link in your terminal. Open it to see:
1.  **Visual Render**: A browser-like view of your component.
2.  **Selector Suggestions**: Click any element to see the **best** React Testing Library query to find it.
3.  **Accessibility Tree**: See how screen readers "see" your UI.

---
