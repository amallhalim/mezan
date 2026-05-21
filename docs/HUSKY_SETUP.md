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

> [!NOTE]
> Detailed error messages are now automatically saved to **`husky-errors.log`** in your project root. Additionally, Husky now outputs clear, high-visibility banners in your terminal with examples (✅ CORRECT vs ❌ WRONG) to help you fix issues instantly.

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

## 📅 The Complete Hook Lifecycle (When & Why)

Our project uses a comprehensive suite of Husky hooks to automate the development workflow from branching to pushing. You don't have to trigger these manually—they happen automatically based on your Git commands.

### 1. Branching & Checking Out

- **`post-checkout`**:
  - **When it runs:** Immediately after you run `git checkout <branch>`.
  - **What it does:** Runs `npm run clean` to wipe the `.next` cache directory.
  - **Why:** Prevents Next.js from throwing weird caching errors because you swapped to a branch with a different codebase.

### 2. Creating a Commit

The commit process has three protective layers:

- **Layer A: `pre-commit`** (The Quality Gate)
  - **When it runs:** As soon as you type `git commit`, but before the commit is created.
  - **What it does:**
    1. **Types:** Runs `npm run type-check`.
    2. **Lint/Format:** Runs `npx lint-staged`.
    3. **Secret Scan:** Scans the diff for leaked AWS/Stripe keys.
    4. **Workflow Protection:** Blocks direct commits to `main`, `master`, or `develop`.
    5. **Branch Name Enforcer:** Blocks the commit if your branch doesn't start with `feature/`, `bugfix/`, `hotfix/`, or `chore/`.
- **Layer B: `prepare-commit-msg`** (Auto-Tagging)
  - **When it runs:** Just before the text editor opens for you to write your message.
  - **What it does:** Extracts ticket numbers (like `MEZ-123`) from your branch name and automatically prepends them to your commit message.
  - **How it works under the hood:**
    1. Grabs the branch name (e.g., `feature/MEZ-456-new-button`).
    2. Uses Regex (`[A-Z]+-[0-9]+`) to extract the exact ticket ID (`MEZ-456`).
    3. Rewrites your commit message from `"added new button"` to `"[MEZ-456] added new button"`.
  - **Why:** Keeps Git history perfectly searchable against Jira/Linear tickets without relying on developers to remember to type the ID every single time.

- **Layer C: `commit-msg`** (Message Formatting)
  - **When it runs:** After you save your message, but before it writes to history.
  - **What it does:** Runs `commitlint` to ensure you used conventional commit prefixes (e.g., `feat:`, `fix:`) and keeps the first line under **200 characters**.

### 3. Syncing with the Team

- **`post-merge`** (Auto-Installer)
  - **When it runs:** Immediately after `git pull` successfully merges remote changes.
  - **What it does:** Runs `npm install` automatically.
  - **Why:** Ensures you never get "missing module" errors if a teammate installed a new dependency.

- **`post-rewrite`** (History Sync)
  - **When it runs:** After you run `git commit --amend` or `git rebase`.
  - **What it does:** Runs `npm install` and wipes the `.next` cache.
  - **Why:** Keeps your local environment perfectly in sync when the Git timeline changes.

### 4. Pushing to GitHub

- **`pre-rebase`** (The Bodyguard)
  - **When it runs:** When you type `git rebase <branch>`.
  - **What it does:** Instantly blocks you if you try to rebase on the `main` or `master` branch.
  - **Why:** Rebasing `main` destroys history for everyone else.

- **`pre-push`** (The Final Gate)
  - **When it runs:** When you type `git push`.
  - **What it does:** Runs the full unit test suite (`npm test`).
  - **Why:** Local commits stay fast, but remote servers stay pristine. Broken code cannot leave your machine.
