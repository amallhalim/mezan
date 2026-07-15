import { renderHook, act } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { useFoodCalculator } from "./useFoodCalculator";
import { Food } from "@/app/lib/data";

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

    // amount is a number, not a formatted string
    expect(result.current.amount).toBe(100);
    expect(result.current.isRaw).toBe(false);
    expect(result.current.quantity).toBe(1);
    expect(result.current.calculated?.calories).toBe(130);
  });

  test("scales macros correctly when amount changes", () => {
    const { result } = renderHook(() => useFoodCalculator(mockFood));

    act(() => {
      result.current.setAmount(200);
    });
    expect(result.current.amount).toBe(200);
    // 130 calories * (200 / 100) = 260
    expect(result.current.calculated?.calories).toBe(260);
  });
});
