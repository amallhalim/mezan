import { describe, it, expect } from "vitest";
import { calculateMacros, calculateMealTotals } from "./calculateMacros";
import { Food } from "./data";

describe("calculateMacros", () => {
  const mockFood: Food = {
    id: "test",
    categoryId: 1,
    name: "Test",
    nameAr: "تجربة",
    icon: "🍔",
    caloriesPer100: 200,
    proteinPer100: 20,
    carbsPer100: 30,
    fatPer100: 10,
    sizeType: "FOOD",
  };

  it("calculates macros correctly for 100g", () => {
    const result = calculateMacros(mockFood, 100);
    expect(result.calories).toBe(200);
    expect(result.protein).toBe(20);
    expect(result.carbs).toBe(30);
    expect(result.fat).toBe(10);
  });

  it("calculates macros correctly for 50g", () => {
    const result = calculateMacros(mockFood, 50);
    expect(result.calories).toBe(100);
    expect(result.protein).toBe(10);
  });

  it("applies quantity correctly", () => {
    const result = calculateMacros(mockFood, 100, 3);
    expect(result.calories).toBe(600);
  });

  it("applies raw cooking factor correctly", () => {
    const result = calculateMacros(mockFood, 100, 1, true);
    expect(result.calories).toBe(240); // 200 * 1.2
  });

  it("handles UNIT types with weightPerUnit", () => {
    const unitFood: Food = { ...mockFood, sizeType: "UNIT", weightPerUnit: 50 };
    const result = calculateMacros(unitFood, 2); // 2 units * 50g = 100g
    expect(result.calories).toBe(200);
  });

  it("caps weight at 5000g", () => {
    const result = calculateMacros(mockFood, 10000);
    expect(result.calories).toBe(10000); // Wait, look at the code logic
    // const factor = effectiveWeight / 100;
    // effectiveWeight = cappedAmount = 5000
    // factor = 50
    // calories = 200 * 50 = 10000. Correct.
  });
});

describe("calculateMealTotals", () => {
  it("sums up meal items correctly", () => {
    const items = [
      { calories: 100, protein: 10, carbs: 10, fat: 5 },
      { calories: 200, protein: 20, carbs: 20, fat: 10 },
    ];
    const totals = calculateMealTotals(items);
    expect(totals.calories).toBe(300);
    expect(totals.protein).toBe(30);
    expect(totals.carbs).toBe(30);
    expect(totals.fat).toBe(15);
  });
});
