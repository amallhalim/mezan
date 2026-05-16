import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodCard from "./FoodCard";
import { mockFoodData } from "@/app/tests/fixtures";

/**
 * 📂 Why use 'describe' blocks?
 * 1. Organization: Groups related tests (Visual vs Interaction).
 * 2. Readability: Creates a "Table of Contents" in test reports.
 * 3. Scoping: Allows specific setup (beforeEach) for a group of tests.
 */
describe("FoodCard Component", () => {
  describe("Visual Rendering", () => {
    test("renders all food data correctly", () => {
      render(
        <FoodCard food={mockFoodData} isSelected={false} onSelect={vi.fn()} />
      );

      expect(screen.getByText("Chicken Breast")).toBeInTheDocument();
      expect(screen.getByText("صدر دجاج")).toBeInTheDocument();
      expect(screen.getByText(/165/)).toBeInTheDocument();
      expect(screen.getByText(/31/)).toBeInTheDocument();
      expect(screen.getByText(/4g/)).toBeInTheDocument();
      expect(screen.getByText(/3.6/)).toBeInTheDocument();
      expect(screen.getByText("🐔")).toBeInTheDocument();
    });

    test("shows active styles when selected", () => {
      const { container } = render(
        <FoodCard food={mockFoodData} isSelected={true} onSelect={vi.fn()} />
      );
      // Check if the primary color classes are applied to the card
      expect(container.firstChild).toHaveClass("bg-primary/10");
      expect(container.firstChild).toHaveClass("border-primary/40");
    });
  });

  describe("Interactions (Accessibility)", () => {
    test("calls onSelect when clicked by a human", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <FoodCard food={mockFoodData} isSelected={false} onSelect={onSelect} />
      );

      /**
       * 💡 WHY getByRole?
       * It finds the element by its FUNCTION (button) and its ACCESSIBLE NAME (aria-label).
       * The /.../i is a Case-Insensitive Regex.
       */
      const card = screen.getByRole("button", {
        name: /Select Chicken Breast/i,
      });
      await user.click(card);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith(mockFoodData);
    });

    test("calls onSelect when Enter key is pressed (Keyboard Nav)", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <FoodCard food={mockFoodData} isSelected={false} onSelect={onSelect} />
      );

      screen.getByRole("button", {
        name: /Select Chicken Breast/i,
      });

      // Simulate Tab and Enter key
      await user.tab();
      await user.keyboard("{Enter}");

      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases & Security", () => {
    test("renders 0 values correctly (not hiding them)", () => {
      const zeroFood = {
        ...mockFoodData,
        caloriesPer100: 0,
        proteinPer100: 0,
        carbsPer100: 0,
        fatPer100: 0,
      };
      render(
        <FoodCard food={zeroFood} isSelected={false} onSelect={vi.fn()} />
      );

      // Ensure '0' is visible and not replaced by empty strings or null
      const zeros = screen.getAllByText(/0/);
      expect(zeros.length).toBeGreaterThan(0);
    });

    test("does NOT call onSelect when non-action keys are pressed", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <FoodCard food={mockFoodData} isSelected={false} onSelect={onSelect} />
      );

      screen.getByRole("button");
      await user.tab(); // Focus the card
      await user.keyboard("a"); // Press a random letter
      await user.keyboard("{Shift}"); // Press Shift

      expect(onSelect).not.toHaveBeenCalled();
    });
  });
});
