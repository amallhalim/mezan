# 📖 Project Overview: Mizan Health Suite

📚 **External Documentation**: [Mizan Mintlify Docs](https://amal-13ec13d1.mintlify.app/introduction)

Welcome to the **Mizan Health Suite**, a modern, fully-internationalized web application built on **Next.js** (App Router). The project heavily emphasizes high-quality, scalable code and a premium user experience.

## 🏗️ Architectural & Tech Stack Details

- **Framework:** Next.js (React) using the App Router.
- **Language:** TypeScript for strict type-safety across the application.
- **Styling:** Tailwind CSS with a strong focus on modern aesthetics, dynamic micro-animations, and responsive design (e.g., using `geist` fonts and complex gradients).
- **Localization:** Fully internationalized using `next-intl`, supporting multiple locales with dedicated localized routing structures.
- **Quality Assurance:** Strict quality gates enforced via **Husky** and `lint-staged` to format and lint code on every commit. It also features a robust testing environment utilizing **Vitest** for unit tests and **Cypress** for End-to-End testing.
- **Workflow:** Driven by a structured `spec-kit` workflow, which enforces strict planning, specification (`spec.md`, `plan.md`), and task-tracking before implementation.

## ✨ Core Feature Highlights

### The Food Calorie Calculator

A highly-precise, client-side nutritional calculator designed to help users accurately track their macros.

- **Functionality:** Users can select food items from a database, input specific weights (strictly in grams), and instantly see the calculated calories and macronutrients (Protein, Carbs, Fat).
- **Meal Aggregation:** Users can add these calculated items to a "Meal Plate". The system dynamically aggregates the totals for the entire meal.
- **Data Persistence:** The user's "Plate" is saved to LocalStorage so data is preserved across page reloads.
- **Premium UX:** Includes features like automatically merging duplicate foods on the plate, providing a sticky mobile summary, and capping maximum weights (5000g) to prevent overflow errors.

## 🐞 Monitoring & Error Tracking

**Sentry** is integrated to automatically track and report errors across the application.

### Sentry SDK Setup & Verification

To verify that Sentry is correctly capturing errors on your local environment:

1. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```
2. **Visit the test page**: Open your browser and navigate to `http://localhost:3000/sentry-example-page`.
3. **Trigger the error**: Click the **"Throw Sample Error"** button. This will send a test exception to the Sentry dashboard, confirming that the integration is active.

### Error Boundaries (Senior-level Practice)

**Why use them?**
Without Error Boundaries, a single component crash causes the entire React UI to crash, resulting in a blank screen. Error Boundaries catch rendering errors and child component crashes to:

- Show a graceful fallback UI instead of raw error text.
- Allow a retry mechanism (e.g., a "Try Again" button).
- Log the exact error to an external service (like **Sentry**) so the engineering team is notified.
  _A React application without Error Boundaries is not considered production-ready._

**How we apply them in Next.js:**
Instead of writing complex React Class Components manually, we leverage the Next.js App Router conventions:

- **Global Error Handling:** Our app has a root `app/global-error.tsx` file (configured with Sentry). If a critical failure occurs, this boundary catches it, automatically logs the exception via `Sentry.captureException()`, and provides a generic fallback.
- **Localized Error Handling:** We have implemented `app/[locale]/error.tsx` which serves as the primary error boundary for all localized application routes. This ensures that any crashes within the main application content are caught, logged to Sentry, and the user is presented with a graceful fallback UI featuring a recovery mechanism (a "Try again" button) instead of a broken application. You can further isolate errors by creating nested `error.tsx` files inside specific feature route folders.

---

_Mizan Health Suite is designed to be a premium, highly-tested, and localized health tool, starting with robust nutritional calculation._
