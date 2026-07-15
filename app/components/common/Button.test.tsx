import { render, screen } from "@/app/tests/test-utils";
import Button from "./Button";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

describe("Button Component", () => {
  test("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    await user.click(screen.getByRole("button", { name: "Clickable" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shows loading spinner and disables button when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // The text 'Submit' should not be rendered when loading
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();

    // We check for the spinner by checking if the animate-spin class is present in the button's children
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
  });

  test("renders left and right icons", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Icon Button
      </Button>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  test("applies isSelected ring styles for normal variants", () => {
    render(
      <Button isSelected variant="primary">
        Selected Primary
      </Button>
    );
    const button = screen.getByRole("button", { name: "Selected Primary" });

    // Should have ring classes
    expect(button).toHaveClass(
      "ring-primary",
      "ring-offset-background",
      "ring-2",
      "ring-offset-2"
    );
  });

  test("applies category specific styles when variant is category", () => {
    const { rerender } = render(
      <Button variant="category" isSelected={false}>
        Category Unselected
      </Button>
    );
    let button = screen.getByRole("button", { name: "Category Unselected" });

    // Should have the unselected style for category
    expect(button).toHaveClass("bg-primary/20", "text-foreground");
    expect(button).not.toHaveClass("ring-2"); // Should NOT have rings

    // Re-render as selected
    rerender(
      <Button variant="category" isSelected={true}>
        Category Selected
      </Button>
    );
    button = screen.getByRole("button", { name: "Category Selected" });

    // Should have the selected style for category
    expect(button).toHaveClass("bg-primary", "text-secondary");
    expect(button).not.toHaveClass("ring-2"); // Still should NOT have rings
  });
});
