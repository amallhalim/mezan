# Testing & Code Quality Workflow

This project uses a modern automated workflow to ensure high code quality and prevent bugs from reaching production.

## 🚀 The Core Tools

| Tool            | Purpose                    | Why we use it                                                                                    |
| :-------------- | :------------------------- | :----------------------------------------------------------------------------------------------- |
| **Vitest**      | Unit & Integration Testing | Ensures your logic works correctly. If you break a feature, the tests will tell you immediately. |
| **Prettier**    | Code Formatting            | No more "space vs tabs" arguments. It keeps the code clean and consistent automatically.         |
| **ESLint**      | Static Analysis            | Catches potential bugs (like unused variables or bad React patterns) while you write code.       |
| **Husky**       | Git Hooks                  | The "Gatekeeper." It runs your checks automatically whenever you try to `git commit`.            |
| **Lint-staged** | Targeted Checks            | Makes hooks fast by only checking the files you actually modified.                               |

---

## 🛠️ How it works (The "Guardrail" System)

### 1. Pre-commit Protection (Husky)

When you run `git commit`, Husky steps in before the commit is finalized. It runs the scripts defined in `.husky/pre-commit`.

- **If everything passes**: Your code is committed.
- **If a test fails or code is messy**: The commit is **blocked**. You must fix the issue before you can commit.
- _Benefit_: You can never accidentally push broken code to the repository.

### 2. Standardized Style (Prettier + ESLint)

By combining these with "Format on Save" in VS Code, your code stays professional without you having to think about it.

- Prettier handles the **Aesthetics** (spaces, quotes, commas).
- ESLint handles the **Quality** (security, logic errors, accessibility).

---

## 📋 Common Commands

- `npm run test`: Run all tests once.
- `npm run test:watch`: Keep tests running while you code (great for TDD).
- `npm run format`: Manually fix formatting in the whole project.
- `npm run lint`: Check for code quality issues.

---

## 💡 Best Practices for Developers

1.  **Don't skip hooks**: Avoid using `--no-verify` unless absolutely necessary. The hooks are there to help you!
2.  **Write tests first**: When fixing a bug, write a test that fails first, then fix the code until it passes.
3.  **Check the "Output" tab**: If Prettier or ESLint isn't working in VS Code, check the Output panel for error messages.
