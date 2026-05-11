import { useMemo } from "react";
import { calculateMealTotals } from "@/app/lib/calculatorUtils";
import { Plate } from "@/app/store/usePlatesStore";

export function useMealSummary(selectedFoodList: Plate[]) {
  const totals = useMemo(() => {
    return calculateMealTotals(selectedFoodList);
  }, [selectedFoodList]);

  const isEmpty = selectedFoodList.length === 0;

  return {
    totals,
    isEmpty,
    itemCount: selectedFoodList.length,
  };
}
