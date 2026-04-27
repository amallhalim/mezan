# Tasks: Calculator Production Enhancements

## Phase 1: User Story 1 - State & Logic Separation (P1)

**Goal**: Extract state management from the page component to a dedicated custom hook.
**Independent Test**: Can be tested by verifying adding/editing items works exactly as before.

- [x] T001 [US1] Create the standalone `useCalculatorState.ts` hook in `app/(pages)/calculator/useCalculatorState.ts`.
- [x] T002 [US1] Refactor `app/(pages)/calculator/page.tsx` to use the new `useCalculatorState` hook and remove local state logic.

## Phase 2: User Story 2 - UI Polish & Theme Integration (P2)

**Goal**: Replace hardcoded styles with theme utilities.
**Independent Test**: Inspect UI visually to ensure no inline hardcoded colors exist.

- [x] T003 [US2] Remove radial-gradient inline styles from the background wrapper in `app/(pages)/calculator/page.tsx` and replace with a Tailwind theme class.
- [x] T004 [US2] Update any non-theme classes (e.g. `bg-[#161B21]`) in nested calculator components to strictly use Tailwind preset colors.

## Phase 3: User Story 3 - Data Integration & API Readiness (P3)

**Goal**: Support async data fetching for food categories and items.
**Independent Test**: Mock the API response and verify the UI populates correctly with skeletons while loading.

- [ ] T005 [P] [US3] Create skeleton loader component `app/components/calculator/Layout/FoodListSkeleton.tsx`.
- [ ] T006 [US3] Create an API route `app/api/foods/route.ts` that serves the mock database data.
- [ ] T007 [US3] Update `useCalculatorState.ts` or page component to fetch data asynchronously on mount instead of synchronous imports.
