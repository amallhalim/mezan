# Data Model: Calculator

## Entities

### `FoodItem`
Represents a single item of food available in the database.
- `id`: string/number (Unique identifier)
- `name`: string (English name)
- `nameAr`: string (Arabic name)
- `category_id`: number (Foreign key to Category)
- `macros`: Object (protein, carbs, fat, calories per standard unit)
- `serving_sizes`: Array (Available portion sizes)

### `MealPlate`
Represents the user's current selection of food items.
- `items`: Array of `CalculatedFoodItem` (FoodItem + selectedAmount + isRaw + custom quantity)
- `totalMacros`: Object (Sum of protein, carbs, fat, calories from all items)

## Validation Rules
- `selectedAmount` must be a positive number.
- Cannot add an item without a valid `id`.
