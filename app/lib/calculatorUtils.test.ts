import { describe, it, expect } from "vitest";
import {
  calculateNutrients,
  getCalorieColor,
  getHealthInsight,
  calculateMealTotals,
} from "./calculatorUtils";
import { Food } from "./data";

describe("calculatorUtils", () => {
  const mockFood: Food = {
    id: "test-food",
    categoryId: 1,
    name: "Test Food",
    nameAr: "طعام تجريبي",
    icon: "🍎",
    caloriesPer100: 100,
    proteinPer100: 10,
    carbsPer100: 20,
    fatPer100: 5,
    sizeType: "FOOD",
  };

  describe("calculateNutrients", () => {
    it("calculates nutrients correctly for 100g", () => {
      const result = calculateNutrients(mockFood, 100, 1, false);
      expect(result.calories).toBe(100);
      expect(result.protein).toBe(10);
      expect(result.carbs).toBe(20);
      expect(result.fat).toBe(5);
    });

    it("calculates nutrients correctly for 200g", () => {
      const result = calculateNutrients(mockFood, 200, 1, false);
      expect(result.calories).toBe(200);
      expect(result.protein).toBe(20);
      expect(result.carbs).toBe(40);
      expect(result.fat).toBe(10);
    });

    it("applies quantity multiplier", () => {
      const result = calculateNutrients(mockFood, 100, 2, false);
      expect(result.calories).toBe(200);
      expect(result.protein).toBe(20);
    });

    it("applies raw/cooked cooking factor (1.2x)", () => {
      const result = calculateNutrients(mockFood, 100, 1, true);
      expect(result.calories).toBe(120); // 100 * 1.2
      expect(result.protein).toBe(12); // 10 * 1.2
    });

    it("caps weight at 5000g", () => {
      const result = calculateNutrients(mockFood, 6000, 1, false);
      expect(result.calories).toBe(5000); // Caps at 5000g * 100/100
    });

    it("handles UNIT sizeType with weightPerUnit", () => {
      const unitFood: Food = {
        ...mockFood,
        sizeType: "UNIT",
        weightPerUnit: 50,
      };
      // 2 units * 50g/unit = 100g
      const result = calculateNutrients(unitFood, 2, 1, false);
      expect(result.calories).toBe(100);
    });

    it("defaults to 100g for UNIT sizeType if weightPerUnit is missing", () => {
      const unitFood: Food = {
        ...mockFood,
        sizeType: "UNIT",
      };
      // 1 unit * 100g (default) = 100g
      const result = calculateNutrients(unitFood, 1, 1, false);
      expect(result.calories).toBe(100);
    });
  });

  describe("getCalorieColor", () => {
    it("returns emerald-400 for < 150 calories", () => {
      expect(getCalorieColor(100)).toBe("text-emerald-400");
    });

    it("returns emerald-500 for < 400 calories", () => {
      expect(getCalorieColor(300)).toBe("text-emerald-500");
    });

    it("returns amber-400 for < 700 calories", () => {
      expect(getCalorieColor(500)).toBe("text-amber-400");
    });

    it("returns orange-500 for >= 700 calories", () => {
      expect(getCalorieColor(800)).toBe("text-orange-500");
    });
  });

  describe("getHealthInsight", () => {
    it("returns High Energy for > 800 calories", () => {
      const insight = getHealthInsight(900);
      expect(insight.text).toBe("High Energy");
      expect(insight.color).toBe("text-orange-400");
    });

    it("returns Light Choice for < 100 calories", () => {
      const insight = getHealthInsight(50);
      expect(insight.text).toBe("Light Choice");
      expect(insight.color).toBe("text-emerald-400");
    });

    it("returns Balanced for middle ranges", () => {
      const insight = getHealthInsight(400);
      expect(insight.text).toBe("Balanced");
    });
  });

  describe("calculateMealTotals", () => {
    it("sums up multiple nutrient objects correctly", () => {
      const items = [
        { calories: 100, protein: 10, carbs: 20, fat: 5 },
        { calories: 200, protein: 20, carbs: 40, fat: 10 },
      ];
      const totals = calculateMealTotals(items);
      expect(totals.calories).toBe(300);
      expect(totals.protein).toBe(30);
      expect(totals.carbs).toBe(60);
      expect(totals.fat).toBe(15);
    });

    it("handles empty arrays", () => {
      const totals = calculateMealTotals([]);
      expect(totals.calories).toBe(0);
      expect(totals.protein).toBe(0);
    });
  });
});
