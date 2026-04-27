# Contracts

## `GET /api/foods`

**Description**: Fetches the list of all food categories and their nested items for the calculator.

**Response Schema**:
```json
[
  {
    "id": 1,
    "name": "Proteins",
    "foods": [
      {
        "id": "f1",
        "name": "Chicken Breast",
        "macros": { "protein": 31, "carbs": 0, "fat": 3.6, "calories": 165 }
      }
    ]
  }
]
```
