import { formatNumber } from "@/app/lib/numberUtils";
import FoodCard from "./FoodCard";
import { render, screen } from "@/app/tests/test-utils";
import { vi } from "vitest";
import { Food } from "@/app/lib/data";
import { useLocale } from "next-intl";

const food = {
  id: "p1",
  name: "Chicken Breast",
  nameAr: "صدور الدجاج",
  caloriesPer100: 165,
  proteinPer100: 31,
  carbsPer100: 0,
  fatPer100: 3.6,
  icon: "🐔",
  sizeType: "FOOD",
  categoryId: 1,
  isRawCookedToggle: true,
} as Food;
const onSelect = vi.fn();

describe("FoodCard", () => {
  const locale = useLocale();

  test("renders food card in arabic mode", () => {
    render(<FoodCard food={food} onSelect={onSelect} isSelected={false} />);
    expect(screen.getByText(/Chicken Breast/)).toBeInTheDocument();
    console.log("test  kcal  kcal", `${formatNumber(165, locale)} kcal`);
    expect(
      screen.getByText(`${formatNumber(165, locale)}`)
    ).toBeInTheDocument();
    expect(screen.getByText("🐔")).toBeInTheDocument();
  });
});
