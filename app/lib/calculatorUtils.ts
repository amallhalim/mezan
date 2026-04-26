import React from 'react';
import { Flame, Award, TrendingUp } from 'lucide-react';

/**
 * Pure function to calculate nutrients for a single food item
 */
export const calculateNutrients = (
  food: any,
  amount: number,
  quantity: number,
  isRaw: boolean
) => {
  // If it's a piece/unit, we multiply amount by weightPerUnit to get total weight
  // If no weightPerUnit, we treat amount as a direct multiplier (backward compatibility)
  const effectiveWeight = food.sizeType === 'UNIT' && food.weightPerUnit 
    ? amount * food.weightPerUnit 
    : (food.sizeType === 'UNIT' ? amount * 100 : amount);
    
  const factor = effectiveWeight / 100;
  const cookingFactor = isRaw ? 1.2 : 1.0;

  return {
    calories: Math.round(food.caloriesPer100 * factor * cookingFactor * quantity),
    protein: Math.round(food.proteinPer100 * factor * cookingFactor * quantity * 10) / 10,
    carbs: Math.round(food.carbsPer100 * factor * cookingFactor * quantity * 10) / 10,
    fat: Math.round(food.fatPer100 * factor * cookingFactor * quantity * 10) / 10,
  };
};

/**
 * Helper to get tailwind color class based on calorie intensity
 */
export const getCalorieColor = (calories: number) => {
  if (calories < 150) return 'text-emerald-400';
  if (calories < 400) return 'text-[#10B981]';
  if (calories < 700) return 'text-amber-400';
  return 'text-orange-500';
};

/**
 * Generate a health insight object based on calories
 */
export const getHealthInsight = (calories: number) => {
  if (calories > 800) return { text: "High Energy", icon: Flame, color: "text-orange-400" };
  if (calories < 100) return { text: "Light Choice", icon: Award, color: "text-emerald-400" };
  return { text: "Balanced", icon: TrendingUp, color: "text-primary" };
};

/**
 * Calculate totals for a list of items
 */
export const calculateMealTotals = (items: any[]) => {
  return items.reduce((acc, curr) => ({
    calories: acc.calories + curr.calories,
    protein: acc.protein + curr.protein,
    carbs: acc.carbs + curr.carbs,
    fat: acc.fat + curr.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
};
