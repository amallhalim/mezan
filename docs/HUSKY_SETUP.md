# 🐕 Husky: The Project Bodyguard

Husky is a tool that allows you to easily manage **Git Hooks**. Git hooks are scripts that run automatically at specific points in the Git workflow (like before a commit or before a push).

---

## ❓ Why use Husky?

In a professional development environment, you want to ensure that:

1. **No Broken Code**: Code that doesn't pass TypeScript checks or tests should never be committed.
2. **Consistent Style**: Code should be automatically formatted so everyone follows the same rules.
3. **Automated Quality**: Instead of remembering to run `npm test`, the machine does it for you.

**Husky acts as a "Quality Gate" that protects your codebase from human error.**

---

## 🛠️ How it was Created (Setup)

To set up Husky in this project, we followed these steps:

1. **Installation**:

   ```bash
   npm install husky --save-dev
   ```

2. **Initialization**:

   ```bash
   npx husky init
   ```

   This created the `.husky/` directory and added a `prepare` script to `package.json`.

3. **Configuring Hooks**:
   We created the `pre-commit` hook by editing the `.husky/pre-commit` file to include our quality checks.

---

## 🚀 How to Use it

As a developer, **you don't have to do anything special!** Husky works silently in the background.

### 1. The Automatic Check

When you run `git commit`, Husky automatically triggers the scripts in order:

- **`npm run type-check`**: Validates TypeScript types.
- **`npm test`**: Runs all unit tests.
- **`npx lint-staged`**: Formats and lints only the files you changed.

### 2. If it Fails ❌

If your code has an error (e.g., a failing test), Husky will **block the commit**. You will see an error message in your terminal. You must fix the error before you can successfully commit.

### 3. If it Passes ✅

If everything is perfect, the commit will proceed as normal. You can be 100% confident that the code you just saved is high-quality and working.

---

## 🪄 The Magic of `lint-staged`

Husky runs scripts, but running `eslint` or `prettier` on your _entire_ codebase every time you commit would be incredibly slow. This is where **`lint-staged`** comes in.

`lint-staged` is configured in our `package.json` to only run linters and formatters against files that are currently staged for commit (the files you just added via `git add`).

### Why use `lint-staged`?

1. **Speed**: It only analyzes the files you actually changed, making commits lightning-fast.
2. **Focus**: It prevents you from getting formatting errors for old code you didn't touch.
3. **Automatic Fixing**: It automatically formats and fixes linting issues before they are saved to git history.

### The Configuration in `package.json`

This is how `lint-staged` is configured in our project:

```json
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "**/*.{json,css,scss,md}": [
      "prettier --write"
    ]
  }
```

**How it works:**

- `**/*.{js,jsx,ts,tsx}`: Any staged JavaScript or TypeScript files will first run through ESLint (`eslint --fix` to auto-fix code quality issues) and then Prettier (`prettier --write` to auto-format the code style).
- `**/*.{json,css,scss,md}`: Any staged data, styling, or documentation files will just run through Prettier to ensure they are nicely formatted.

---

## ⚙️ Current Configuration

Your project is currently protected by these rules in `.husky/pre-commit`:

```bash
# 🛡️ QUALITY GATE: Verify types
npm run type-check

# 🧪 TEST RUNNER: Verify logic
npm test

# 🧹 AUTO-FORMAT: Clean up code
npx lint-staged
```
