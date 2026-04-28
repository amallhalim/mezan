# Tasks: Food Calorie Calculator (Zustand Architecture)

**Input**: Design documents from `specs/002-food-calorie-calc/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Phase 1: Foundational & Global State

**Goal**: Establish the core mathematical logic and the global state management system.

- [x] T001 Implement mathematical utility for calorie calculation in `app/lib/calculateMacros.ts`
- [x] T002 [P] Implement unit tests for calculation accuracy in `app/lib/calculateMacros.test.ts`
- [x] T003 [US2] Implement modular Zustand store in `app/store/` with search and plate slices.

## Phase 2: User Story 1 - Calculate Single Food Item (P1) 🎯 MVP

**Goal**: Allow a user to input the weight or serving size of a specific food item to instantly see its total calories and macronutrients.
**Independent Test**: Can be tested by entering a known quantity of a standard food and verifying the math.

- [x] T004 [US1] Create the reusable WeightInput component in `app/components/shared/WeightInput.tsx`
- [x] T005 [US1] Integrate WeightInput and Zustand store into the existing UI in `app/(pages)/calculator/page.tsx`

## Phase 3: User Story 2 - Add Multiple Foods to a Meal (P2)

**Goal**: Allow a user to add multiple calculated food items together to see the total calories and macros for an entire meal.
**Independent Test**: Test by adding two items with known values and verifying the sum is perfectly accurate.

- [x] T006 [US2] Implement merging and aggregation logic in `app/store/slices/createPlateSlice.ts`.
- [x] T007 [US2] Connect `app/(pages)/calculator/page.tsx` to the global plate store to display aggregated totals.

## Phase 4: User Story 2 Enhancements (LocalStorage & Merging)

**Goal**: Ensure meal data persists across refreshes and handle duplicate food items gracefully.
**Independent Test**: Verify that refreshing the page keeps the plate intact, and adding "Rice" twice merges the rows.

- [x] T010 [US2] Implement LocalStorage persistence logic using Zustand `persist` middleware.
- [x] T011 [US2] Implement duplicate detection and merging logic in the store actions.
- [ ] T012 [US2] Add UI Toast/Notification for merged items in `app/(pages)/calculator/page.tsx`
- [ ] T013 [P] [US2] Implement sticky "Plate Summary" layout for mobile in `app/(pages)/calculator/page.tsx`

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Ensure edge cases, precision guidelines, and strictly Metric unit enforcement.

- [x] T008 Validate mathematical rounding strictly adheres to 1 decimal place.
- [ ] T009 [US1] Implement input capping at 5000g in `QuickAdjustPanel.tsx` and utility functions.
- [ ] T016 [SC-003] Perform manual UX validation: Verify 3-item meal total can be completed in < 30s.
- [ ] T014 [P] Verify strict Metric (grams) enforcement across all inputs per `spec.md`.
- [ ] T015 Run final validation of `quickstart.md` scenarios including persistence and merging.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: Complete
- **User Story 1 (Phase 2)**: Complete
- **User Story 2 (Phase 3)**: Complete
- **Enhancements (Phase 4)**: In Progress (T012-T013 remaining)
- **Polish (Phase 5)**: In Progress

---

## Implementation Strategy

### Incremental Delivery
1.  **UI Feedback**: Implement T012 to notify users of successful merges.
2.  **Mobile UX**: Implement T013 to improve the experience on small screens.
3.  **Safety & Performance**: Complete T009 and T016.
4.  **Final Polish**: Complete T014 and T015.
