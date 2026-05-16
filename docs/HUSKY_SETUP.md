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

## 🚀 How to Use it (Quick Guide)

As a developer, **you don't have to do anything special!** Husky works silently in the background.

### 1. The Automatic Check

When you run `git commit`, Husky automatically triggers:

- **`npm run type-check`**: Validates TypeScript types.
- **`npx lint-staged`**: Formats and lints only the files you changed.
- _(Optional)_ **`npm test`**: Runs unit tests (if enabled).

### 2. If it Fails ❌

Husky will **block the commit** if there's an error. You must fix the error before you can successfully commit.

### 3. If it Passes ✅

The commit will proceed as normal.

---

## 🪄 The Magic of `lint-staged`

Husky runs scripts, but running `eslint` or `prettier` on your _entire_ codebase every time you commit would be incredibly slow. This is where **`lint-staged`** comes in.

`lint-staged` only runs against files that are currently staged for commit.

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

## 🛠️ Advanced Usage & Troubleshooting

This section contains tips for common scenarios and troubleshooting.

### 1. Skipping Git Hooks

**For a Single Command:**
Use the `-n` or `--no-verify` flag:

```bash
git commit -m "..." -n # Skips Git hooks
```

**Temporarily for multiple commands:**

```bash
export HUSKY=0 # Disables all Git hooks
git commit ...
unset HUSKY # Re-enables hooks
```

**Globally (on your machine):**
Modify your local config (e.g., `~/.config/husky/init.sh`):

```bash
export HUSKY=0 # Husky won't run hooks on your machine
```

### 2. CI Server and Docker

To avoid installing Git Hooks on CI servers or in Docker, use `HUSKY=0`. In GitHub Actions:

```yaml
env:
  HUSKY: 0
```

### 3. Production Safe "Prepare" Script

To ensure `npm install` doesn't fail in production/CI when Husky is missing, we use a custom install script at `.husky/install.mjs`:

```js
// 🛡️ PRODUCTION-SAFE HUSKY INSTALLER
// Why: This script prevents Husky from trying to install in production or CI environments,
// which avoids errors when devDependencies (like Husky) are missing.

if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  console.log("🚀 Skipping Husky install (Production/CI)");
  process.exit(0);
}

try {
  const husky = (await import("husky")).default;
  console.log("🐕 Initializing Husky...");
  console.log(husky());
} catch (error) {
  console.error("⚠️ Could not initialize Husky:", error.message);
}
```

**What this file does:**

1. **Checks the Environment**: It looks at system variables (`NODE_ENV` and `CI`).
2. **Aborts Safely**: If it detects a production or CI server, it stops executing successfully (`process.exit(0)`). This prevents `npm install` from failing when trying to install development tools.
3. **Installs Husky Locally**: If it's your local machine, it imports Husky and runs the setup.

In `package.json`, we configure the `prepare` script to use this file:

```json
"prepare": "node .husky/install.mjs"
```

### 4. Testing Hooks Without Committing

To test a hook without creating a real commit, add `exit 1` to the hook script to abort:

```bash
# .husky/pre-commit
# Your script...
exit 1
```

### 5. Node Version Managers and GUIs

If you use a GUI (like VS Code Git UI) with Node installed via `nvm` or `fnm`, you might get a "command not found" error.

**Solution:** Copy your version manager initialization code to `~/.config/husky/init.sh`.
Example for `nvm`:

```bash
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

---

## ⚙️ Project Setup Reference

1. **Installation**: `npm install husky --save-dev`
2. **Initialization**: `npx husky init`
3. **Current Hook ([.husky/pre-commit](file:///e:/mezan/.husky/pre-commit))**:
   ```bash
   npm run type-check
   npx lint-staged
   ```
