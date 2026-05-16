# 🧪 Testing Coverage Tasklist

This document outlines the missing unit and integration tests required to reach full project coverage.

## 🔴 High Priority (Core Logic)

- [ ] **Utility Functions**
  - [ ] `app/lib/calculatorUtils.ts`: Test `calculateNutrients`, `getCalorieColor`, `getHealthInsight`, and `calculateMealTotals`.
  - [ ] `app/lib/calculateMacros.ts`: Test macro distribution and goal calculations.
- [ ] **Custom Hooks**
  - [ ] `app/hooks/useFoodCalculator.ts`: Test food selection, portion adjustment, and state synchronization.
  - [ ] `app/hooks/useCalorieCalculator.ts`: Test the core calculation engine.

## 🟡 Medium Priority (Stores & State)

- [ ] **Zustand Stores**
  - [ ] `app/store/usePlatesStore.tsx`: Unit tests for `addPlate`, `removePlate`, `updatePlate`, and `clearPlates`.
  - [ ] `app/store/useUserStore.tsx`: Test user profile and target setting state.
- [ ] **Complex Components**
  - [ ] `app/components/calculator/Layout/TotalMacrosFooter.tsx`: Ensure it accurately reflects store state.
  - [ ] `app/components/calculator/FoodCustomizerModal.tsx`: Test full interaction flow (portion selection -> adding to plate).

## 🟢 Low Priority (UI & Helpers)

- [ ] **Common Components**
  - [ ] `Button.tsx`, `Card.tsx`, `ScrollArrow.tsx`: Basic rendering and interaction tests.
- [ ] **Portion Selector Sub-components**
  - [ ] `MacroNutrientStats.tsx`, `QuantitySelector.tsx`, `SugarSelector.tsx`.
- [ ] **Hooks (Helpers)**
  - [ ] `useScroller.ts`, `useMealSummary.ts`.

---

## 🛠️ Testing Strategy

1.  **Unit Tests**: Focus on pure functions and isolated hooks using `vitest`.
2.  **Component Tests**: Use `react-testing-library` for user-centric interactions.
3.  **Integration Tests**: Test the flow between hooks, stores, and multiple components.
