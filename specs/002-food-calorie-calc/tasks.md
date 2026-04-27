# Tasks: Food Calorie Calculator

**Input**: Design documents from `specs/002-food-calorie-calc/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Phase 1: Foundational

**Goal**: Establish the core mathematical logic and utility functions required by all user stories.

- [x] T001 Implement mathematical utility for calorie calculation in `app/lib/calculateMacros.ts`
- [x] T002 [P] Implement unit tests for calculation accuracy in `app/lib/calculateMacros.test.ts`

## Phase 2: User Story 1 - Calculate Single Food Item (P1) 🎯 MVP

**Goal**: Allow a user to input the weight or serving size of a specific food item to instantly see its total calories and macronutrients.
**Independent Test**: Can be tested by entering a known quantity of a standard food and verifying the math.

- [x] T003 [US1] Create the reusable WeightInput component in `app/components/shared/WeightInput.tsx`
- [x] T004 [US1] Implement the standalone state hook for calculations in `app/hooks/useCalorieCalculator.ts`
- [x] T005 [US1] Integrate WeightInput and useCalorieCalculator into the existing UI in `app/(pages)/calculator/page.tsx`

## Phase 3: User Story 2 - Add Multiple Foods to a Meal (P2)

**Goal**: Allow a user to add multiple calculated food items together to see the total calories and macros for an entire meal.
**Independent Test**: Test by adding two items with known values and verifying the sum is perfectly accurate.

- [x] T006 [US2] Update `useCalorieCalculator.ts` to support accumulating multiple `CalculatedServing` entities into a MealPlate array.
- [x] T007 [US2] Update `app/(pages)/calculator/page.tsx` to display the aggregated meal totals accurately using the new state.

## Phase 4: User Story 2 Enhancements (LocalStorage & Merging)

**Goal**: Ensure meal data persists across refreshes and handle duplicate food items gracefully.
**Independent Test**: Verify that refreshing the page keeps the plate intact, and adding "Rice" twice merges the rows.

- [ ] T010 [US2] Implement LocalStorage persistence logic in `app/hooks/useCalorieCalculator.ts`
- [ ] T011 [US2] Implement duplicate detection and merging logic in `app/hooks/useCalorieCalculator.ts`
- [ ] T012 [US2] Add UI Toast/Notification for merged items in `app/(pages)/calculator/page.tsx`
- [ ] T013 [P] [US2] Implement sticky "Plate Summary" layout for mobile in `app/(pages)/calculator/page.tsx`

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Ensure edge cases, precision guidelines, and strictly Metric unit enforcement.

- [x] T008 Validate mathematical rounding strictly adheres to 1 decimal place on display per `research.md`.
- [x] T009 Ensure missing macro data defaults gracefully to "0" or "N/A" per edge cases.
- [ ] T014 [P] Verify strict Metric (grams) enforcement across all inputs per `spec.md` (Remove any Imperial placeholders).
- [ ] T015 Run final validation of `quickstart.md` scenarios including persistence and merging.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: Complete (T001-T002)
- **User Story 1 (Phase 2)**: Complete (T003-T005)
- **User Story 2 (Phase 3)**: Complete (T006-T007)
- **Enhancements (Phase 4)**: Depends on Phase 3 completion.
- **Polish (Phase 5)**: Can be done alongside or after Phase 4.

---

## Implementation Strategy

### Incremental Delivery
1.  **Persistence**: Implement T010 first so users don't lose work.
2.  **Merging**: Implement T011 and T012 together to handle duplicates.
3.  **Mobile UX**: Implement T013 to improve the experience on small screens.
4.  **Final Polish**: Complete T014 and T015 to reach "Production Ready" status.
