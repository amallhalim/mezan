# Tasks: Food Calorie Calculator

## Phase 1: Foundational

**Goal**: Establish the core mathematical logic and utility functions required by all user stories.

- [x] T001 Implement mathematical utility for calorie calculation in `app/lib/calculateMacros.ts`
- [x] T002 [P] Implement unit tests for calculation accuracy in `app/lib/calculateMacros.test.ts`

## Phase 2: User Story 1 - Calculate Single Food Item (P1)

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

## Phase 4: Polish & Cross-Cutting Concerns

**Goal**: Ensure edge cases and precision guidelines from research are fully met.

- [x] T008 Validate mathematical rounding strictly adheres to 1 decimal place on display per `research.md`.
- [x] T009 Ensure missing macro data defaults gracefully to "0" or "N/A" per edge cases.
