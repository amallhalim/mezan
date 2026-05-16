# Quickstart: Testing Calculations

## Running Tests

1. To verify the math utility:
   ```bash
   npm run test calculateMacros.test.ts
   ```

## Manual Verification

1. Select a food with exactly 100 calories per 100g.
2. Input `150g` into the weight input.
3. Verify the UI instantly updates to show `150` calories.
4. Add the item to the plate.
5. Add another item (e.g., 50g of the same food).
6. Verify the total meal summary shows `200` calories.
