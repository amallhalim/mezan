import { render, screen } from "@testing-library/react";
import { expect, test, vi, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import QuickAdjustPanel from "./QuickAdjustPanel";
import { Food } from "@/app/lib/data";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

const mockFood: Food = {
  id: "1",
  name: "Chicken Breast",
  nameAr: "صدر دجاج",
  caloriesPer100: 165,
  proteinPer100: 31,
  carbsPer100: 0,
  fatPer100: 3.6,
  icon: "🍗",
  categoryId: 1,
  sizeType: "FOOD",
  isRawCookedToggle: true,
};

describe("QuickAdjustPanel", () => {
  test("renders the QuickAdjustPanel correctly", () => {
    const onAdd = vi.fn();
    const onPreview = vi.fn();
    const onClose = vi.fn();

    render(
      <QuickAdjustPanel
        food={mockFood}
        onAdd={onAdd}
        onPreview={onPreview}
        onClose={onClose}
      />
    );

    expect(screen.getByText("Chicken Breast")).toBeInTheDocument();
    expect(screen.getByText("foodState")).toBeInTheDocument();
    expect(screen.getByText("quantity")).toBeInTheDocument();
    expect(screen.getByText("addToPlate")).toBeInTheDocument();
  });

  test("calls onPreview when preview button is clicked", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onPreview = vi.fn();
    const onClose = vi.fn();

    render(
      <QuickAdjustPanel
        food={mockFood}
        onAdd={onAdd}
        onPreview={onPreview}
        onClose={onClose}
      />
    );

    const previewBtn = screen.getByRole("button", { name: /previewResult/i });
    await user.click(previewBtn);

    expect(onPreview).toHaveBeenCalled();
  });
});
