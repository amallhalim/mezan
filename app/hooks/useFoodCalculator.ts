import { useState, useMemo, useEffect } from 'react';
import { Food, SIZE_PRESETS, SizePreset } from '@/app/lib/data';
import { calculateNutrients } from '@/app/lib/calculatorUtils';

export interface FoodCalculatorState {
  amount: number;
  selectedSizeId: string;
  isRaw: boolean;
  quantity: number;
  sugarCount?: number;
  sugarType?: string; // 's1', 's2', 's3'
}

export function useFoodCalculator(food: Food | null, initialValues?: Partial<FoodCalculatorState>) {
  const [amount, setAmount] = useState<number>(initialValues?.amount ?? 100);
  const [selectedSizeId, setSelectedSizeId] = useState<string>(initialValues?.selectedSizeId ?? 'small');
  const [isRaw, setIsRaw] = useState(initialValues?.isRaw ?? false);
  const [quantity, setQuantity] = useState(initialValues?.quantity ?? 1);
  const [sugarCount, setSugarCount] = useState(initialValues?.sugarCount ?? 0);
  const [sugarType, setSugarType] = useState(initialValues?.sugarType ?? 's1');

  // Reset state when food changes, unless we have initialValues
  useEffect(() => {
    if (food && !initialValues) {
      setAmount(100);
      setSelectedSizeId('small');
      setIsRaw(false);
      setQuantity(1);
      setSugarCount(0);
      setSugarType('s1');
    } else if (food && initialValues) {
      setAmount(initialValues.amount ?? 100);
      setSelectedSizeId(initialValues.selectedSizeId ?? 'small');
      setIsRaw(initialValues.isRaw ?? false);
      setQuantity(initialValues.quantity ?? 1);
      setSugarCount(initialValues.sugarCount ?? 0);
      setSugarType(initialValues.sugarType ?? 's1');
    }
  }, [food, initialValues]);

  const presets = useMemo(() => {
    if (!food) return [];
    return SIZE_PRESETS[food.sizeType] || SIZE_PRESETS.FOOD;
  }, [food]);

  const currentSize = useMemo(() => {
    return presets.find(p => p.id === selectedSizeId);
  }, [presets, selectedSizeId]);

  const calculated = useMemo(() => {
    if (!food) return null;

    let baseNutrients = calculateNutrients(food, amount, quantity, isRaw);

    // Handle Sugar for Drinks
    if (food.sizeType === 'DRINK' && sugarCount > 0) {
      const { FOODS } = require('@/app/lib/data');
      const sugarItem = FOODS.find((f: any) => f.id === sugarType);
      if (sugarItem) {
        const sugarNutrients = calculateNutrients(sugarItem, sugarCount, quantity, false);
        baseNutrients = {
          calories: baseNutrients.calories + sugarNutrients.calories,
          protein: Math.round((baseNutrients.protein + sugarNutrients.protein) * 10) / 10,
          carbs: Math.round((baseNutrients.carbs + sugarNutrients.carbs) * 10) / 10,
          fat: Math.round((baseNutrients.fat + sugarNutrients.fat) * 10) / 10,
        };
      }
    }

    return {
      ...food,
      ...baseNutrients,
      nameAr: food.nameAr,
      selectedAmount: amount,
      unit: presets[0]?.unit || 'g',
      isRaw,
      quantity,
      sugarCount,
      sugarType
    };
  }, [food, amount, isRaw, quantity, presets, sugarCount, sugarType]);

  const handleSizeSelect = (size: SizePreset) => {
    setSelectedSizeId(size.id);
    setAmount(size.amount);
  };

  return {
    amount,
    setAmount,
    selectedSizeId,
    setSelectedSizeId,
    isRaw,
    setIsRaw,
    quantity,
    setQuantity,
    sugarCount,
    setSugarCount,
    sugarType,
    setSugarType,
    presets,
    currentSize,
    calculated,
    handleSizeSelect
  };
}
