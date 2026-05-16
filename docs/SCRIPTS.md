# 🛠️ Project Scripts Documentation

This document explains the available scripts in `package.json`, why they were added, and when you should run them.

## Core Development Scripts

### `npm run dev`

- **What it does**: Starts the Next.js development server with Turbopack.
- **Why we use it**: It provides Fast Refresh, allowing you to see UI changes instantly.
- **When to run it**: Every time you are actively coding or testing the UI in your browser.

### `npm run build`

- **What it does**: Compiles the application for production. It performs a full TypeScript check, optimizes images, and minifies code.
- **Why we use it**: To ensure the app is stable, bug-free, and ready to be deployed to a server.
- **When to run it**: Before deploying to production or when you want to verify that the entire project is 100% correct.

### `npm run start`

- **What it does**: Starts the production server (requires `npm run build` first).
- **When to run it**: Only in production environments or when testing the final built version of the app.

---

## Code Quality & Safety

### `npm run type-check` 🚀 (New)

- **What it does**: Runs the TypeScript compiler (`tsc --noEmit`) to verify types across the **entire project**.
- **Why we added it**: Development mode (`npm run dev`) only checks the files you have open. This script ensures that a change in one file hasn't accidentally broken another file somewhere else in the project.
- **When to run it**:
  - Before you `git commit` or `git push`.
  - After refactoring or changing any shared interfaces/types.
  - To catch all "hidden" errors without waiting for a slow build.

### `npm run lint`

- **What it does**: Runs ESLint to find code style issues and potential bugs.
- **When to run it**: To ensure your code follows the project's formatting and quality rules.

### `npm run format`

- **What it does**: Automatically fixes formatting issues using Prettier.
- **When to run it**: Whenever your code looks messy or before committing.

---

## Testing Suite

### `npm run test`

- **What it does**: Runs all unit and integration tests using Vitest in the terminal.
- **When to run it**: In CI/CD pipelines or when you want a quick "Pass/Fail" report for all logic.

### `npm run test:ui`

- **What it does**: Opens the interactive Vitest UI in your browser.
- **Why we use it**: It provides a beautiful dashboard to visualize tests, see which lines are failing, and use the "Testing Playground" for debugging.
- **When to run it**: While writing new tests or debugging complex interactions.

### `npm run test:coverage`

- **What it does**: Generates a report showing which lines of code are covered by tests.
- **When to run it**: When you want to find "untested" areas of your application.
