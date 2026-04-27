import { Food } from './data';

export interface CalculatedMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Pure function to calculate nutrients for a single food item
 */
export const calculateMacros = (
  food: Food,
  amount: number,
  quantity: number = 1,
  isRaw: boolean = false
): CalculatedMacros => {
  // If it's a piece/unit, we multiply amount by weightPerUnit to get total weight
  // If no weightPerUnit, we treat amount as a direct multiplier
  const effectiveWeight = food.sizeType === 'UNIT' && food.weightPerUnit
    ? amount * food.weightPerUnit
    : (food.sizeType === 'UNIT' ? amount * 100 : amount);

  const factor = effectiveWeight / 100;
  const cookingFactor = isRaw ? 1.2 : 1.0;

  return {
    // Calories generally are whole numbers in display, but we keep 1 decimal for consistency
    calories: Math.round((food.caloriesPer100 || 0) * factor * cookingFactor * quantity * 10) / 10 || 0,
    protein: Math.round((food.proteinPer100 || 0) * factor * cookingFactor * quantity * 10) / 10 || 0,
    carbs: Math.round((food.carbsPer100 || 0) * factor * cookingFactor * quantity * 10) / 10 || 0,
    fat: Math.round((food.fatPer100 || 0) * factor * cookingFactor * quantity * 10) / 10 || 0,
  };
};

/**
 * Calculate totals for a list of items
 */
export const calculateMealTotals = (items: CalculatedMacros[]): CalculatedMacros => {
  return items.reduce((acc, curr) => ({
    calories: Math.round(((acc.calories || 0) + (curr?.calories || 0)) * 10) / 10 || 0,
    protein: Math.round(((acc.protein || 0) + (curr?.protein || 0)) * 10) / 10 || 0,
    carbs: Math.round(((acc.carbs || 0) + (curr?.carbs || 0)) * 10) / 10 || 0,
    fat: Math.round(((acc.fat || 0) + (curr?.fat || 0)) * 10) / 10 || 0,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
};
