import { useState, useMemo } from 'react';
import { Food } from '@/app/lib/data';
import { calculateMacros, CalculatedMacros } from '@/app/lib/calculateMacros';
import { calculateMealTotals } from '../lib/calculatorUtils';

export interface CalculatedServing extends CalculatedMacros {
  id?: string;
  foodId: string;
  name: string;
  inputQuantity: number;
}

export function useCalorieCalculator(initialFood: Food | null = null) {
  const [activeFood, setActiveFood] = useState<Food | null>(initialFood);
  const [amount, setAmount] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [isRaw, setIsRaw] = useState<boolean>(false);

  // The meal plate
  const [mealPlate, setMealPlate] = useState<CalculatedServing[]>([]);

  const activeCalculation = useMemo(() => {
    if (!activeFood) return null;
    const macros = calculateMacros(activeFood, amount, quantity, isRaw);

    const serving: CalculatedServing = {
      foodId: activeFood.id,
      name: activeFood.name,
      inputQuantity: amount,
      ...macros
    };
    return serving;
  }, [activeFood, amount, quantity, isRaw]);

  const addToPlate = (serving: CalculatedServing) => {
    setMealPlate(prev => [...prev, serving]);
  };

  const removeFromPlate = (index: number) => {
    setMealPlate(prev => prev.filter((_, i) => i !== index));
  };

  const updateInPlate = (index: number, serving: CalculatedServing) => {
    setMealPlate(prev => {
      const copy = [...prev];
      copy[index] = serving;
      return copy;
    });
  };

  const clearPlate = () => {
    setMealPlate([]);
  };

  const mealTotals = useMemo(() => {
    return calculateMealTotals(mealPlate);
  }, [mealPlate]);

  return {
    activeFood,
    setActiveFood,
    amount,
    setAmount,
    quantity,
    setQuantity,
    isRaw,
    setIsRaw,
    activeCalculation,
    mealPlate,
    addToPlate,
    removeFromPlate,
    updateInPlate,
    clearPlate,
    mealTotals
  };
}
