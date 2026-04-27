# Feature Specification: Food Calorie Calculator

**Feature Branch**: `002-food-calorie-calc`
**Created**: 2026-04-26
**Status**: Draft
**Input**: User description: "i want to built feateu allow user calcate food calory of food"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate Single Food Item (Priority: P1)

As a health-conscious user, I want to input the weight or serving size of a specific food item so that I can instantly see its total calories and macronutrients (protein, carbs, fat).

**Why this priority**: Core functionality; without this, the calculator serves no purpose.

**Independent Test**: Can be tested by entering a known quantity of a standard food (e.g., 100g of chicken breast) and verifying the math matches nutritional standards.

**Acceptance Scenarios**:

1. **Given** I am on the calorie calculator, **When** I select "Chicken Breast" and input "150g", **Then** the system displays the proportional calories, protein, carbs, and fat based on the 100g base value.

---

### User Story 2 - Add Multiple Foods to a Meal (Priority: P2)

As a user planning a meal, I want to add multiple calculated food items together so that I can see the total calories and macros for my entire meal.

**Why this priority**: Users rarely eat just one food item at a time. Totaling a meal provides significant value.

**Independent Test**: Can be tested by adding two items with known values and verifying the sum is perfectly accurate.

**Acceptance Scenarios**:

1. **Given** I have added 150g Chicken Breast to my plate, **When** I add 200g of Rice, **Then** the total summary updates to reflect the combined macros of both items.

### Edge Cases

- What happens if the user inputs a negative weight or `0g`? (Should default to 1g or show a validation error).
- How does the system handle extremely large numbers (e.g., 99999g)? (Should cap at a reasonable maximum, like 5000g).
- What if a food item is missing macro data? (Should display "N/A" or "0" gracefully).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to select a food item from a database or list.
- **FR-002**: System MUST allow users to input a custom quantity/weight for the selected food.
- **FR-003**: System MUST dynamically calculate and display total Calories, Protein, Carbohydrates, and Fat based on the input quantity.
- **FR-004**: System MUST allow users to aggregate multiple food items into a "Meal" or "Plate" to view a combined total.

### Key Entities

- **FoodMacroProfile**: Base nutritional data per 100g or standard serving.
- **CalculatedServing**: An instance of a food item paired with a user-defined quantity and its resulting macro totals.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Calculation results update and appear instantly (< 100ms) as the user types a quantity.
- **SC-002**: Mathematical accuracy of macros must be precise to 1 decimal place.
- **SC-003**: Users can successfully calculate and total a 3-item meal within 30 seconds.

## Assumptions

- Food base data (macros per 100g) is provided or fetched from an existing dataset.
- The primary unit of measurement is grams (g), but standard servings (e.g., "1 cup", "1 piece") may also be supported if defined in the data.
