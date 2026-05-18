import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi, beforeEach, describe } from "vitest";
import CalculatorPage from "./page";
import userEvent from "@testing-library/user-event";
import { usePlatesStore } from "@/app/store/usePlatesStore";
import CalculatorHeader from "./_components/Layout/CalculatorHeader";

// 🧹 This resets the plate before EVERY test starts
beforeEach(() => {
  usePlatesStore.getState().clearPlates();
});

/**
 * 🛠️ FIX: We need this small "Mock" for the Image component.
 * Next.js Images don't work in a testing environment without it.
 */
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" {...props} />
  ),
}));

test("full calculator workflow: search, add, and verify", async () => {
  // 🎭 HIRE AN ACTOR: This prepares the virtual human to interact with our UI.
  const user = userEvent.setup();
  const { rerender } = render(<CalculatorPage />);

  const searchInput = screen.getByPlaceholderText(/Search 1000\+ foods/i);
  await user.type(searchInput, "Chicken");

  const chickenItem = screen.getAllByText(/Chicken Breast/i)[0];
  await user.click(chickenItem);

  const addBtn = screen.getByRole("button", { name: /ADD TO PLATE/i });
  await user.click(addBtn);

  rerender(<CalculatorPage />);
  expect(screen.getAllByText(/Your Plate/i).length).toBeGreaterThan(0);
});

test("opens result modal when calculation button is clicked", async () => {
  const user = userEvent.setup();
  usePlatesStore.getState().addPlate({
    name: "Chicken",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    id: "1",
  });
  render(<CalculatorPage />);
  const calcBtn = screen.getByRole("button", {
    name: /Calculate Meal Summary/i,
  });
  await user.click(calcBtn);
  expect(screen.getByText(/My Full Plate/i)).toBeInTheDocument();
});

test("test exist calculator page", () => {
  render(<CalculatorPage />);
  expect(screen.getByText(/Macro/i)).toBeInTheDocument();
});

test("expect plate section is hidden when no food added", () => {
  render(<CalculatorPage />);
  expect(screen.queryByText(/Your Plate/i)).not.toBeInTheDocument();
});

test("expect element exists once", () => {
  render(<CalculatorPage />);
  expect(screen.getAllByText(/Chicken Breast/i)).toHaveLength(1);
});

test("query all headings", () => {
  render(<CalculatorPage />);
  const headings = screen.queryAllByRole("heading");
  expect(headings.length).toBeGreaterThan(0);
});

test("verify search label exists", () => {
  render(<CalculatorPage />);
  expect(screen.getByLabelText(/Search 1000\+ foods/i)).toBeInTheDocument();
});

test("shows 'No results' message for unknown food", async () => {
  // 🎭 HIRE AN ACTOR: userEvent.setup() creates a "virtual user" that
  // simulates real human behavior (like mouse clicks and key presses).
  const user = userEvent.setup();
  render(<CalculatorPage />);
  const searchInput = screen.getByPlaceholderText(/Search 1000\+ foods/i);
  await user.type(searchInput, "Xyz123");
  expect(screen.getByText(/No results/i)).toBeInTheDocument();
  expect(screen.getByText(/Can't find/i)).toBeInTheDocument();
  expect(screen.getByText(/"Xyz123"/i)).toBeInTheDocument();
});

test("Integration: Adding multiple foods calculates correct total macros", async () => {
  // 🎭 HIRE AN ACTOR: We set up the user BEFORE rendering for the best realism.
  const user = userEvent.setup();
  render(<CalculatorPage />);

  const searchInput = screen.getByPlaceholderText(/Search 1000\+ foods/i);
  await user.type(searchInput, "Chicken");
  await user.click(screen.getAllByText(/Chicken Breast/i)[0]);
  await user.click(screen.getByRole("button", { name: /ADD TO PLATE/i }));

  await user.clear(searchInput);
  await user.type(searchInput, "Rice");
  await user.click(screen.getAllByText(/White Rice/i)[0]);
  await user.click(screen.getByRole("button", { name: /ADD TO PLATE/i }));

  const totalDisplay = screen.getByLabelText(/Total Calories/i);
  expect(totalDisplay).toHaveTextContent("295");
});

describe("Comparison: fireEvent vs userEvent", () => {
  test("Using fireEvent (The 'Teleport' way)", () => {
    const setSearchQuery = vi.fn();
    render(
      <CalculatorHeader
        searchQuery=""
        setSearchQuery={setSearchQuery}
        selectedCategory={1}
        setSelectedCategory={vi.fn()}
        selectedFoodListLength={0}
        setShowCart={vi.fn()}
      />
    );

    const searchInput = screen.getByTestId(/search-input/i);
    fireEvent.change(searchInput, { target: { value: "Chicken" } });

    expect(setSearchQuery).toHaveBeenCalledWith("Chicken");
    expect(setSearchQuery).toHaveBeenCalledTimes(1);
  });

  test("Using userEvent (The 'Human' way)", async () => {
    const user = userEvent.setup();
    const setSearchQuery = vi.fn();
    render(
      <CalculatorHeader
        searchQuery=""
        setSearchQuery={setSearchQuery}
        selectedCategory={1}
        setSelectedCategory={vi.fn()}
        selectedFoodListLength={0}
        setShowCart={vi.fn()}
      />
    );

    const searchInput = screen.getByTestId(/search-input/i);
    await user.type(searchInput, "C");

    expect(setSearchQuery).toHaveBeenCalledWith("C");
  });

  test("search close button fire", async () => {
    const setSearchQuery = vi.fn();
    render(
      <CalculatorHeader
        searchQuery="Chicken"
        setSearchQuery={setSearchQuery}
        selectedCategory={1}
        setSelectedCategory={vi.fn()}
        selectedFoodListLength={1}
        setShowCart={vi.fn()}
      />
    );

    const closeButton = screen.getByTestId(/search-close-button/i);
    await userEvent.click(closeButton);
    expect(setSearchQuery).toHaveBeenCalledWith("");
  });
});

describe("UI & Attributes Verification", () => {
  test("search input has correct initial attributes and classes", () => {
    render(<CalculatorPage />);
    const input = screen.getByPlaceholderText(/Search 1000\+ foods/i);

    // 1. Check HTML Attributes
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("aria-label", "Search 1000+ foods");

    // 2. Check CSS Classes (Tailwind)
    expect(input).toHaveClass("bg-white/[0.04]");
    expect(input).toHaveClass("rounded-2xl");
  });

  test("calculate button has correct role and class", () => {
    render(<CalculatorPage />);
    const calcBtn = screen.getByRole("button", {
      name: /Calculate Meal Summary/i,
    });
    expect(calcBtn).toBeInTheDocument();
    expect(calcBtn).toHaveClass("relative");
  });
});

describe("Asynchronous & Promises", () => {
  test("findByText: Waits for the Result Modal to appear", async () => {
    // 🎭 HIRE AN ACTOR
    const user = userEvent.setup();
    render(<CalculatorPage />);

    // 1. Add a food so the calculate button works
    usePlatesStore.getState().addPlate({
      name: "Egg",
      calories: 70,
      protein: 6,
      carbs: 0,
      fat: 5,
      id: "egg1",
    });

    // 2. Click the calculate button
    const calcBtn = screen.getByRole("button", { name: /Calculate/i });
    await user.click(calcBtn);

    // 3. 🚀 WAIT for the Modal:
    // We use findByText because the Modal might take a millisecond to animate in.
    // findByText is AUTOMATICALLY asynchronous!
    const modalTitle = await screen.findByText(/My Full Plate/i);

    expect(modalTitle).toBeInTheDocument();
  });
});
