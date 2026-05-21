import { render, screen } from "@/app/tests/test-utils";
import LanguageSwitcher from "./LanguageSwitcher";
import userEvent from "@testing-library/user-event";
import { useRouter } from "@/i18n/navigation";
import { vi } from "vitest";

describe("LanguageSwitcher Component", () => {
  test("renders correctly", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("العربية")).toBeInTheDocument();
  });
  test("base styles", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("العربية")).toHaveClass(
      "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold backdrop-blur-xl transition-all hover:bg-white/10"
    );
  });
  test("check toggle language", async () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole("button", { name: "العربية" });

    await userEvent.click(button);

    const router = useRouter();
    expect(router.replace).toHaveBeenCalledWith("/", { locale: "ar" });
  });
});
