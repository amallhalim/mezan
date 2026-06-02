# 📖 Project Overview: Mizan Health Suite

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

---

_Mizan Health Suite is designed to be a premium, highly-tested, and localized health tool, starting with robust nutritional calculation._
