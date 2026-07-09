## 📝 Description

Please include a summary of the changes, the motivation behind them, and any relevant context. List any dependencies that are required for this change.

## 🔗 Related Issues / Tickets

- Fixes # (issue)
- Ticket: `[MEZ-XXXX]` (e.g., `MEZ-123` - must match branch naming ticket structure)

## 🛠️ Type of Change

Please select the options that apply:

- [ ] ✨ **New Feature** (non-breaking change which adds functionality)
- [ ] 🐛 **Bug Fix** (non-breaking change which fixes an issue)
- [ ] ⚙️ **Refactor / Chore** (non-breaking change that improves code quality or updates configuration)
- [ ] 📖 **Documentation** (updates to documentation or guides)
- [ ] ⚡ **Performance Enhancement** (improves efficiency or load times)
- [ ] 🧪 **Test Suite** (adding or fixing tests)
- [ ] 💥 **Breaking Change** (fix or feature that would cause existing functionality to not work as expected)

## 🧪 Testing & Verification

Describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration.

### Automated Tests

- [ ] **Unit Tests:** `npm run test` (Vitest)
- [ ] **E2E Tests:** `npm run cy:run` (Cypress) - _if changes affect UI/flows_

### Manual Verification

1.
2.

---

## 🛡️ Pre-Flight Developer Checklist

Before submitting this pull request, please ensure:

- [ ] **Formatting:** Code is formatted according to `.prettierrc.json` (`npm run format` or auto-format on save).
- [ ] **Linting:** There are no ESLint warnings or errors (`npm run lint`).
- [ ] **Types:** TypeScript compilation compiles without any errors (`npm run type-check`).
- [ ] **Husky Hooks:** All local git hooks passed successfully (no bypassed quality gates without exceptional reasons).
- [ ] **Error Boundaries:** Any component additions/modifications utilize Next.js error boundaries (`error.tsx`) to prevent blank-screen crashes.
- [ ] **Monitoring:** Critical error cases and API failures are correctly wired to Sentry (`Sentry.captureException`).
- [ ] **Security:** No secrets or private tokens are exposed via `NEXT_PUBLIC_` environment variables.
