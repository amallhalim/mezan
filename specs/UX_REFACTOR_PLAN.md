# UX & Code Refactoring Plan

## Summary of Findings

1. **Broken Theming:** Hardcoded white text on semi-transparent backgrounds makes the app unreadable in Light Mode.
2. **Missing UX Feedback (Heuristics):** Forms lack basic validation, inputs can't be quickly cleared, and buttons don't show loading states when clicked.
3. **Technical Jargon:** The terminology used on the screen ("Asset Verification", "Node Status") feels like a developer tool rather than a user-friendly app.
4. **Hydration Bugs:** The live clock implementation will cause Next.js rendering errors in production.

## Priority Order

**Phase 1** must be completed first because the broken theming renders the application unusable in light mode.

---

## The Action Plan

### Phase 1: Architecture & Accessibility (Critical Priority)

- [ ] Create a dedicated `app/tokens/` directory (`spacing.css`, `typography.css`, `colors.css`).
- [ ] Remove the Javascript-based theme toggling (`theme === 'dark' ? ... : ...`).
- [ ] Update `HomeClient.tsx` to use Tailwind's native `dark:text-white text-zinc-900` syntax so cards are perfectly readable in both modes.

### Phase 2: UX Enhancements (User Control & Feedback)

- [ ] **Prevent Errors:** Disable the "Submit Plate" button if the food search input is completely empty.
- [ ] **System Visibility:** Add an `isLoading` React state to the "Submit Plate" button so it shows a spinner when processing.
- [ ] **User Control:** Add a small `(X)` clear icon inside the input fields so users can instantly erase mistakes.

### Phase 3: Code Stability & Bug Fixes

- [ ] Fix the Next.js Hydration Mismatch by refactoring the `setInterval` clock in `HomeClient.tsx` to safely mount on the client.
- [ ] Remove unused component imports (like the unused `Test` component in `layout.tsx`).

### Phase 4: Terminology & Linting

- [ ] Rewrite the `next-intl` dictionary keys to match real-world language (change "Identity Search" to "Your Profile", change "Asset Verification" to "Powered by Next.js").
- [ ] Fix the 21 TypeScript and Cypress errors caught by the linter.
