import { renderHook, act } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { useFoodCalculator } from "./useFoodCalculator";
import { Food } from "@/app/lib/data";
import { formatNumber } from "../lib/numberUtils";
import { useLocale } from "next-intl";

const mockFood: Food = {
  id: "1",
  name: "Rice",
  nameAr: "أرز",
  caloriesPer100: 130, // cooked per 100g
  proteinPer100: 2.7,
  carbsPer100: 28,
  fatPer100: 0.3,
  icon: "🍚",
  categoryId: 1,
  isRawCookedToggle: true,
  sizeType: "FOOD",
};

describe("useFoodCalculator", () => {
  test("initializes correctly with base food values", () => {
    const { result } = renderHook(() => useFoodCalculator(mockFood));
    const locale = useLocale();

    expect(result.current.amount).toBe(formatNumber(100, locale));
    expect(result.current.isRaw).toBe(false);
    expect(result.current.quantity).toBe(formatNumber(1, locale));
    expect(result.current.calculated?.calories).toBe(formatNumber(130, locale));
  });

  test("scales macros correctly when amount changes", () => {
    const { result } = renderHook(() => useFoodCalculator(mockFood));

    act(() => {
      result.current.setAmount(200);
    });
    const locale = useLocale();
    expect(result.current.amount).toBe(formatNumber(200, locale));
    // 130 calories * (200 / 100) = 260
    expect(result.current.calculated?.calories).toBe(formatNumber(260, locale));
  });
});
