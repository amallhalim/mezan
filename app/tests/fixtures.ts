import { Food } from "../lib/data";
import { Plate } from "../store/usePlatesStore";

/**
 * 📦 TEST FIXTURES
 */

export const mockFoodData: Food = {
  id: "p1",
  categoryId: 1,
  name: "Chicken Breast",
  nameAr: "صدر دجاج",
  icon: "🐔",
  caloriesPer100: 165,
  proteinPer100: 31,
  carbsPer100: 4,
  fatPer100: 3.6,
  sizeType: "FOOD",
  isRawCookedToggle: true,
};

export const mockPlateData: Plate[] = [
  {
    ...mockFoodData,
    id: "1",
    calories: 165,
    protein: 31,
    carbs: 4,
    fat: 3.6,
    selectedAmount: 100,
    quantity: 1,
  },
  {
    id: "2",
    name: "White Rice",
    calories: 195,
    protein: 4,
    carbs: 42,
    fat: 0.5,
    selectedAmount: 150,
    quantity: 1,
  },
];
