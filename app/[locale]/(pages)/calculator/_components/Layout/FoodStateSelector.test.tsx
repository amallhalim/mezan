import { render, screen } from "@testing-library/react";
import { expect, test, vi, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import FoodStateSelector from "./FoodStateSelector";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("FoodStateSelector", () => {
  test("renders correctly with raw and cooked buttons", () => {
    const setIsRaw = vi.fn();
    render(<FoodStateSelector isRaw={true} setIsRaw={setIsRaw} />);

    expect(screen.getByText("foodState")).toBeInTheDocument();
    expect(screen.getByText("raw")).toBeInTheDocument();
    expect(screen.getByText("cooked")).toBeInTheDocument();
  });

  test("calls setIsRaw(true) when raw is clicked", async () => {
    const user = userEvent.setup();
    const setIsRaw = vi.fn();
    render(<FoodStateSelector isRaw={false} setIsRaw={setIsRaw} />);

    await user.click(screen.getByText("raw"));
    expect(setIsRaw).toHaveBeenCalledWith(true);
  });

  test("calls setIsRaw(false) when cooked is clicked", async () => {
    const user = userEvent.setup();
    const setIsRaw = vi.fn();
    render(<FoodStateSelector isRaw={true} setIsRaw={setIsRaw} />);

    await user.click(screen.getByText("cooked"));
    expect(setIsRaw).toHaveBeenCalledWith(false);
  });
});
