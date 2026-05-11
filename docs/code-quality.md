# Code Quality & Automation Guide

This document explains the tools and workflows we use to keep this project clean, bug-free, and professional.

---

## 🛠️ The Quality Stack

| Tool            | Role             | Function                                                                          |
| :-------------- | :--------------- | :-------------------------------------------------------------------------------- |
| **Vitest**      | **Testing**      | Runs your logic through automated tests to ensure features don't break.           |
| **Prettier**    | **Formatting**   | Automatically fixes your code style (spaces, quotes, alignment).                  |
| **ESLint**      | **Linting**      | Analyzes code for potential bugs, security risks, and best practices.             |
| **Husky**       | **Automation**   | Triggers scripts automatically during Git actions (like `commit`).                |
| **lint-staged** | **Optimization** | Ensures only the files you actually changed are checked, keeping everything fast. |

---

## 🔄 The Development Workflow

### 1. In the Editor (Real-time)

- **ESLint** highlights errors in red/yellow as you type.
- **Prettier** fixes your code every time you save (if "Format on Save" is enabled in VS Code).

### 2. The "Pre-Commit" Gate (Husky + lint-staged)

When you run `git commit`, the following sequence happens automatically:

1.  **Filter**: `lint-staged` finds only the files you are about to commit.
2.  **Fix**: It runs `eslint --fix` and `prettier --write` on those files.
3.  **Validate**: It runs your tests (`vitest run`).
4.  **Decision**:
    - ✅ **Pass**: The commit is finalized.
    - ❌ **Fail**: The commit is blocked. You must fix the errors before you can try again.

---

## 🧩 Key Configurations

### Prettier (`.prettierrc.json`)

We use standard settings (2-space tabs, semicolons, double quotes) to ensure the whole team's code looks identical.

### ESLint (`eslint.config.mjs`)

We use `eslint-config-prettier` to ensure ESLint doesn't argue with Prettier. Prettier handles the _look_, ESLint handles the _logic_.

### Husky (`.husky/pre-commit`)

This file contains the "orders" for what to do before a commit. We use `npx lint-staged` to keep it efficient.

---

## 📋 Pro Tips

- **Format Manually**: If you want to format the whole project at once, run:
  ```bash
  npm run format
  ```
- **Run Related Tests**: `lint-staged` is configured to run tests related to your changes, so you don't have to wait for the whole suite.
- **Bypassing**: If you _absolutely must_ commit something without running the checks (not recommended!), you can add `--no-verify` to your git command.
- **ESM Support**: We use `.mts` for configuration files to ensure modern Node.js compatibility and avoid "Experimental Warnings."

---

## 🛑 Troubleshooting

- **Husky failed?** Check the terminal output. It will tell you exactly which test failed or which file has a linting error.
- **Prettier not working?** Ensure the "Prettier - Code formatter" extension is installed and set as the "Default Formatter" in VS Code.
- **ESLint Conflicts?** We use `eslint-config-prettier` to disable all conflicting rules automatically.
