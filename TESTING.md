# 🧪 Testing Guide

This project uses **Vitest** and **React Testing Library** for unit and integration testing.

## 🚀 Running All Tests
To run every test in the project:
```powershell
npm run test
```
*This starts Vitest in **Watch Mode**. It will watch your files and re-run tests automatically when you save changes.*

---

## 📄 Running a Specific Test File
If you only want to test a specific page or component, you can pass the path to the file:

```powershell
# Run only the main page tests
npx vitest run app/page.test.tsx

# Run only the calculator page tests (note the quotes for paths with parentheses)
npx vitest run "app/(pages)/calculator/calculator.test.tsx"
```

---

## 🛠️ Commands Summary
| Command | Description |
| :--- | :--- |
| `npm run test` | Starts Vitest in interactive watch mode. |
| `npm run test -- --run` | Runs all tests once and exits (CI mode). |
| `npx vitest run <path>` | Runs a specific test file and exits. |
| `npx vitest <path>` | Runs a specific test file in watch mode. |

---

## 📁 File Naming Convention
Tests are automatically detected if they follow these naming patterns:
- `*.test.tsx` or `*.test.ts`
- `*.spec.tsx` or `*.spec.ts`
- Files inside a `__tests__` folder.

## 💡 Best Practices
1. **Mocking**: For Next.js components like `next/image`, always use `vi.mock` as seen in `app/page.test.tsx`.
2. **Store Mocking**: If a component uses the Zustand store (`usePlatesStore`), ensure you mock the store state to keep tests isolated.
3. **Regex Matchers**: Use regular expressions (e.g. `/text/i`) in `getByText` to avoid failing due to small whitespace or casing differences.
