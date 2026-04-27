# Implementation Plan: Food Calorie Calculator

**Branch**: `002-food-calorie-calc` | **Date**: 2026-04-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-food-calorie-calc/spec.md`

## Summary

This feature implements a robust food calorie calculator that allows users to input custom quantities (e.g., 150g) for selected foods to dynamically calculate accurate macronutrients and calories. It also supports aggregating these calculated items into a single meal plate.

## Technical Context

**Language/Version**: TypeScript, React 18
**Primary Dependencies**: Next.js App Router, TailwindCSS
**Storage**: N/A (Client-side logic)
**Testing**: Jest / React Testing Library
**Target Platform**: Web (Responsive)
**Project Type**: Next.js Web Application
**Performance Goals**: < 100ms calculation latency
**Constraints**: Pure client-side calculations to ensure instant feedback.
**Scale/Scope**: Generic utility hooks for math, and UI components for weight input.

## Constitution Check

*GATE: Passed*
- **I. Reusable Components First**: We will build a reusable `WeightInput` component and a pure utility function `calculateMacros` instead of tying the math to a specific page.
- **II. Separation of UI and Logic**: The math logic will live in a standalone utility file (`utils/math.ts` or similar), separate from the UI components.
- **III. Clean and Modular Code**: The feature will be broken down into small, composable hooks and pure functions.
- **V. Continuous & Helpful Documentation**: The mathematical formulas will be documented with JSDoc explaining *why* base-100g scaling is used and *how* precision is maintained.

## Project Structure

### Documentation (this feature)

```text
specs/002-food-calorie-calc/
├── plan.md              # This file
├── research.md          # Technical decisions for calculation precision
├── data-model.md        # Data models for calculated servings
└── quickstart.md        # Guide to testing the calculator
```

### Source Code (repository root)

```text
app/
├── lib/
│   ├── calculateMacros.ts    # Pure utility function for macro math
│   └── calculateMacros.test.ts # Unit tests for the math
├── components/
│   └── shared/
│       └── WeightInput.tsx   # Reusable UI component for inputting grams
└── hooks/
    └── useCalorieCalculator.ts # State hook for managing the current calculation
```

**Structure Decision**: The math logic is extracted into a pure utility function `calculateMacros.ts` to ensure "Separation of UI and Logic". The `WeightInput` will be a shared component so it can be used anywhere in the app that requires weight entry.

## Complexity Tracking

No constitution violations found. The plan strictly adheres to the core principles.
