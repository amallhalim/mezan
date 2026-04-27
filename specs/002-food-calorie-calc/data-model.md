# Data Model: Food Calorie Calculator

## Entities

### `CalculatedServing`
Represents a specific quantity of a food item and its resulting macro values.

- `foodId`: string (Reference to the base FoodItem)
- `inputQuantity`: number (The user-provided weight in grams, e.g., 150)
- `calculatedCalories`: number (Dynamic calculation based on base per 100g)
- `calculatedProtein`: number
- `calculatedCarbs`: number
- `calculatedFat`: number

## Validation Rules
- `inputQuantity` must be > 0.
- If a base food item has `0` for a macro, the calculated macro must also strictly be `0`.
