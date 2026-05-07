import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodCard from "./FoodCard";

const mockFoodData = {
  name: 'Chicken Breast',
  nameAr: 'صدر دجاج',
  caloriesPer100: 165,
  proteinPer100: 31,
  carbsPer100: 4,
  fatPer100: 3.6,
  icon: '🐔',
}

describe("FoodCard Component", () => {
  
  describe("Visual Rendering", () => {
    test("renders all food data correctly", () => {
      render(<FoodCard food={mockFoodData} />);
      
      expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
      expect(screen.getByText('صدر دجاج')).toBeInTheDocument();
      expect(screen.getByText(/165/)).toBeInTheDocument();
      expect(screen.getByText(/31/)).toBeInTheDocument();
      expect(screen.getByText(/4g/)).toBeInTheDocument();
      expect(screen.getByText(/3.6/)).toBeInTheDocument();
      expect(screen.getByText('🐔')).toBeInTheDocument();
    });

    test("shows active styles when selected", () => {
      const { container } = render(<FoodCard food={mockFoodData} isSelected={true} />);
      // Check if the primary color classes are applied to the card
      expect(container.firstChild).toHaveClass('bg-primary/10');
      expect(container.firstChild).toHaveClass('border-primary/40');
    });
  });

  describe("Interactions (Accessibility)", () => {
    test("calls onSelect when clicked by a human", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(<FoodCard food={mockFoodData} onSelect={onSelect} />);
      
      /**
       * 💡 WHY getByRole?
       * It finds the element by its FUNCTION (button) and its ACCESSIBLE NAME (aria-label).
       * The /.../i is a Case-Insensitive Regex.
       */
      const card = screen.getByRole('button', { name: /Select Chicken Breast/i });
      await user.click(card);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith(mockFoodData);
    });

    test("calls onSelect when Enter key is pressed (Keyboard Nav)", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(<FoodCard food={mockFoodData} onSelect={onSelect} />);
      
      const card = screen.getByRole('button', { name: /Select Chicken Breast/i });
      
      // Simulate Tab and Enter key
      await user.tab(); 
      await user.keyboard('{Enter}');

      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

});