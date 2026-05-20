# 🧪 E2E Tests Tracker

This document tracks the progress of implementing End-to-End (E2E) tests for the Mizan Health Suite project using Cypress. Check off the boxes as you implement the tests.

## 1. Authentication & Onboarding

- [ ] **Email Login Flow** (`cypress/e2e/auth/login.cy.ts`)
  - [ ] Test successful login with valid credentials.
  - [ ] Test error handling for invalid credentials.
  - [ ] Test redirect to dashboard/home upon success.
- [ ] **Phone Verification** (`cypress/e2e/auth/phone-verification.cy.ts`)
  - [ ] Test the phone number input step.
  - [ ] Test the OTP entry step.
  - [ ] Test the profile saving step.
  - [ ] Verify the dialog renders correctly without sizing issues.

## 2. Food Calorie Calculator (`/calculator`)

- [ ] **Food Category Navigation** (`cypress/e2e/calculator/navigation.cy.ts`)
  - [ ] Verify horizontal scroller works.
  - [ ] Test clicking categories loads the correct food items.
- [ ] **Weight Input & Macros** (`cypress/e2e/calculator/macro-scaling.cy.ts`)
  - [ ] Test selecting a food item.
  - [ ] Test inputting a specific weight in the `WeightInput`.
  - [ ] Verify calculated calories and macros scale correctly.
- [ ] **Meal Plate Aggregation** (`cypress/e2e/calculator/meal-plate.cy.ts`)
  - [ ] Add multiple different foods to the meal plate.
  - [ ] Verify total aggregated macros/calories are mathematically correct.
- [ ] **Result Modal** (`cypress/e2e/calculator/result-modal.cy.ts`)
  - [ ] Open the Result Modal.
  - [ ] Verify it doesn't block UI (checks for proper state transitions/Suspense).
  - [ ] Test final submission of the meal plate.

## 3. Admin & Role-Based Access (`/Admin`)

- [ ] **Access Control** (`cypress/e2e/admin/access-control.cy.ts`)
  - [ ] Ensure logged-out users are redirected to login.
  - [ ] Ensure non-admin users cannot access admin routes.
  - [ ] Test admin dashboard loads correctly for an admin user.

## 4. Localization / i18n

- [ ] **Language Switching** (`cypress/e2e/i18n/language-switch.cy.ts`)
  - [ ] Test switching between languages (e.g., English to Arabic).
  - [ ] Verify URL changes correctly (e.g., `/en/` to `/ar/`).
  - [ ] Verify UI strings update based on the selected language.

---

_Tip: As you write these tests, remember to store any dummy data in your `cypress/fixtures/` folder!_
