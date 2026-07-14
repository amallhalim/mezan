# ⚖️ Mizan Health Suite

Welcome to the **Mizan Health Suite**, a modern, high-performance, and fully internationalized health web application built on **Next.js** (App Router).

Mizan is engineered with strict production standards, complete with local and remote quality gates, automated testing, error boundaries, and real-time health telemetry.

---

## 🛠️ The Tech Stack

- **Framework:** Next.js 16 (React 19 App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 & Vanilla CSS for premium micro-animations
- **State Management:** Zustand
- **Internationalization:** `next-intl` (fully localized routing)
- **Error Tracking & Monitoring:** Sentry
- **Testing Suite:** Vitest (Unit) & Cypress (E2E)
- **Automation:** Husky, `lint-staged`, CommitLint, & GitHub Actions CI

---

## 📖 Developer Documentation Hub

All technical aspects of the application are extensively documented. Explore our guidebooks below:

| Guide                                | Description                                                       | Path / Link                                                        |
| :----------------------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------- |
| **🤝 Contributing Guidelines**       | Git Workflow, branch naming, commits, review checklist.           | [CONTRIBUTING.md](./CONTRIBUTING.md)                               |
| **📖 Project Overview**              | Architecture, Error boundaries, Sentry telemetry, security model. | [docs/project-overview.md](./docs/project-overview.md)             |
| **🌐 Online Mintlify Documentation** | The official hosted user and developer guide portal.              | [Mintlify Portal](https://amal-13ec13d1.mintlify.app/introduction) |
| **🧪 Testing Guide**                 | Testing specifications for Vitest and Cypress.                    | [docs/testing.md](./docs/testing.md)                               |
| **🌐 Localization Guide**            | Adding new locales, translating pages, managing keys.             | [docs/LOCALIZATION.md](./docs/LOCALIZATION.md)                     |
| **🐕 Husky Setup**                   | The git hook bodyguard and local validation steps.                | [docs/HUSKY_SETUP.md](./docs/HUSKY_SETUP.md)                       |
| **⚙️ Scripts Guide**                 | Package.json commands and CLI options.                            | [docs/SCRIPTS.md](./docs/SCRIPTS.md)                               |
| **🎨 Storybook Guide**               | Viewing and creating UI component stories.                        | [docs/storybook.md](./docs/storybook.md)                           |

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### 1. Prerequisites

- **Node.js:** version 20 or higher is recommended.
- **Package Manager:** `npm` (configured with package lock file).

### 2. Installation

Install all dependencies (this will automatically initialize Husky git hooks on local machines):

```bash
npm install
```

### 3. Run Development Server

Start the development server with Hot Module Replacement (Turbopack enabled):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛡️ Quality Gates & Automation

We run strict automated checks to keep the codebase clean, stable, and bug-free.

### Local Gate (Husky + lint-staged)

Every time you run `git commit`, Husky intercepts the command and executes:

1. `npm run type-check` — Strict TypeScript checking across the whole project.
2. `npx lint-staged` — ESLint (`eslint --fix`) and Prettier formatting (`prettier --write`) on modified files.
3. Secret scanning — Prevents pushing AWS, Stripe, or frontend `NEXT_PUBLIC_` secrets.
4. Branch name validation — Enforces prefixes (`feature/`, `bugfix/`, etc.).

#### Bypassing checks (Urgently)

If you need to commit a WIP branch and bypass the pre-commit checks:

```bash
npm run commit:skip -m "Your commit message"
```

### Remote Gate (GitHub Actions CI)

Upon pushing to remote or opening a Pull Request to `develop` or `main`, [GitHub Actions CI](./.github/workflows/ci.yml) will trigger:

1. Linting & Formatting validation (`prettier:check` and `eslint`).
2. Type checking compiler (`type-check`).
3. Unit test execution via Vitest (`test`).
4. End-to-End browser tests via headless Cypress (`cypress-e2e`).

---

## ⚙️ Core Command Reference

| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `npm run dev`             | Starts next.js development server.          |
| `npm run build`           | Compiles the production build bundle.       |
| `npm run start`           | Launches production built server.           |
| `npm run type-check`      | Runs TypeScript compiler validation.        |
| `npm run lint`            | Runs ESLint logic check.                    |
| `npm run format`          | Runs Prettier auto-formatter on all files.  |
| `npm run test`            | Executes Vitest unit tests.                 |
| `npm run cy:run`          | Executes Cypress E2E tests headlessly.      |
| `npm run clean`           | Deletes the `.next` compilation cache.      |
| `npm run storybook`       | Launches the local Storybook environment.   |
| `npm run build-storybook` | Builds Storybook for production deployment. |
