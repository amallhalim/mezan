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

### 3. CI Mode (Run Once)
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
