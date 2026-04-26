import { useMemo } from 'react';
import { calculateMealTotals } from '@/app/lib/calculatorUtils';

export function useMealSummary(selectedFoodList: any[]) {
  const totals = useMemo(() => {
    return calculateMealTotals(selectedFoodList);
  }, [selectedFoodList]);

  const isEmpty = selectedFoodList.length === 0;

  return {
    totals,
    isEmpty,
    itemCount: selectedFoodList.length
  };
}
