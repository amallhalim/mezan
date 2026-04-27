# Implementation Plan: Calculator Production Enhancements

**Branch**: `us/calcaualtor` | **Date**: 2026-04-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-calc-prod-enhancements/spec.md`

## Summary

This feature aims to make the Calculator route production-ready through a phased approach: decoupling state management into custom hooks, polishing the UI with theme colors, and preparing the component for dynamic data fetching.

## Technical Context

**Language/Version**: TypeScript, React 18
**Primary Dependencies**: Next.js App Router, TailwindCSS, React Hooks (useState, useMemo)
**Storage**: N/A (Client-side state for now, future data from API)
**Testing**: Jest / React Testing Library (assumed standard Next.js setup)
**Target Platform**: Web (Desktop & Mobile)
**Project Type**: Next.js Web Application
**Performance Goals**: Fast interaction, < 1.5s initial load, minimal CLS
**Constraints**: Must run entirely on the client side (`"use client"`) due to heavy interactivity.
**Scale/Scope**: Single calculator page handling a plate of food items.

## Constitution Check

*GATE: Passed*
- **I. Reusable Components First**: We are extracting state from the UI, which will allow us to break the calculator into more reusable sub-components.
- **II. Separation of UI and Logic**: This is the core goal of Phase 1 (moving state to a custom hook).
- **III. Clean and Modular Code**: Decoupling the logic will drastically reduce the `page.tsx` file size.
- **IV. Theme-Driven Styling**: Phase 2 explicitly replaces hardcoded inline styles with theme utilities.

## Project Structure

### Documentation (this feature)

```text
specs/001-calc-prod-enhancements/
├── plan.md              # This file
├── research.md          # State management and UI research
├── data-model.md        # FoodItem and MealPlate models
├── quickstart.md        # Guide to running the calculator
└── contracts/           # API fetch contracts
```

### Source Code (repository root)

```text
app/
├── (pages)/calculator/
│   ├── page.tsx
│   └── useCalculatorState.ts  # New state hook
├── components/calculator/
│   ├── Layout/
│   │   ├── CalculatorHeader.tsx
│   │   ├── FoodListSection.tsx
│   │   ├── TotalMacrosFooter.tsx
│   │   ├── AddedFoodsSummary.tsx
│   │   ├── QuickAdjustPanel.tsx
│   │   └── ResultModal.tsx
├── lib/
│   └── data.ts
└── hooks/
    └── useMealSummary.ts
```

**Structure Decision**: The calculator page will remain in `app/(pages)/calculator/page.tsx`, but we will extract the state management logic into a co-located hook `useCalculatorState.ts` or add it to `app/hooks/`. The components already exist in `app/components/calculator/Layout/` and will be updated.

## Complexity Tracking

No violations found. The plan strictly adheres to the Constitution.
