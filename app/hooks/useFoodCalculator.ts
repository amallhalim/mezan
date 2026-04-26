import { useState, useMemo, useEffect } from 'react';
import { Food, SIZE_PRESETS, SizePreset } from '@/app/lib/data';
import { calculateNutrients } from '@/app/lib/calculatorUtils';

export interface FoodCalculatorState {
  amount: number;
  selectedSizeId: string;
  isRaw: boolean;
  quantity: number;
}

export function useFoodCalculator(food: Food | null, initialValues?: Partial<FoodCalculatorState>) {
  const [amount, setAmount] = useState<number>(initialValues?.amount ?? 100);
  const [selectedSizeId, setSelectedSizeId] = useState<string>(initialValues?.selectedSizeId ?? 'small');
  const [isRaw, setIsRaw] = useState(initialValues?.isRaw ?? false);
  const [quantity, setQuantity] = useState(initialValues?.quantity ?? 1);

  // Reset state when food changes, unless we have initialValues
  useEffect(() => {
    if (food && !initialValues) {
      setAmount(100);
      setSelectedSizeId('small');
      setIsRaw(false);
      setQuantity(1);
    } else if (food && initialValues) {
      setAmount(initialValues.amount ?? 100);
      setSelectedSizeId(initialValues.selectedSizeId ?? 'small');
      setIsRaw(initialValues.isRaw ?? false);
      setQuantity(initialValues.quantity ?? 1);
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

    const nutrients = calculateNutrients(food, amount, quantity, isRaw);

    return {
      ...food,
      ...nutrients,
      nameAr: food.nameAr,
      selectedAmount: amount,
      unit: presets[0]?.unit || 'g',
      isRaw,
      quantity
    };
  }, [food, amount, isRaw, quantity, presets]);

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
    presets,
    currentSize,
    calculated,
    handleSizeSelect
  };
}
