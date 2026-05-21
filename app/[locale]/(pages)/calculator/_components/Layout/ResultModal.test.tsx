import { render, screen } from "@testing-library/react";
import { expect, test, vi, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import ResultModal from "./ResultModal";
import { Plate } from "@/app/store/usePlatesStore";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock chart to avoid canvas issues in jsdom
vi.mock("../../../../../components/chart/MacroPieChart", () => ({
  default: () => <div data-testid="macro-pie-chart" />,
}));

const mockItem = {
  id: "1",
  name: "Chicken Breast",
  nameAr: "صدر دجاج",
  calories: 165,
  protein: 31,
  carbs: 0,
  fat: 3.6,
  selectedAmount: 100,
  unit: "g",
  icon: "🍗",
};

describe("ResultModal", () => {
  test("renders nutritional information correctly", () => {
    render(
      <ResultModal item={mockItem as unknown as Plate} onClose={vi.fn()} />
    );

    expect(screen.getByText("Chicken Breast")).toBeInTheDocument();
    expect(screen.getByText("totalEnergy")).toBeInTheDocument();
    expect(screen.getByText("165")).toBeInTheDocument(); // calories
    expect(screen.getByText("31g")).toBeInTheDocument(); // protein
  });

  test("triggers navigator.share when share button is clicked", async () => {
    const user = userEvent.setup();

    // Mock navigator.share
    const shareMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      share: shareMock,
    });

    render(
      <ResultModal item={mockItem as unknown as Plate} onClose={vi.fn()} />
    );

    const shareBtn = screen.getByRole("button", { name: /share/i });
    await user.click(shareBtn);

    expect(shareMock).toHaveBeenCalled();
    const shareCallArgs = shareMock.mock.calls[0][0];
    expect(shareCallArgs.title).toBe("Chicken Breast");
    expect(shareCallArgs.text).toContain("165");
    expect(shareCallArgs.text).toContain("31g"); // protein
  });
});
