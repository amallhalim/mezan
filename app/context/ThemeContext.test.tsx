import { render, screen } from "../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { useTheme } from "./ThemeContext";

/**
 * 🧪 UNIT TEST FOR THEME PROVIDER
 * 
 * Since we can't test the Provider 'alone', we create a small
 * 'Dummy Component' that uses the useTheme hook.
 */
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe("ThemeProvider Unit Tests", () => {
  test("provides 'dark' as the default theme", () => {
    // 1. Render our test component (now automatically wrapped!)
    render(<TestComponent />);

    // 2. ASSERT: The text should show 'dark'
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();
  });

  test("toggles the theme when toggleTheme is called", async () => {
    const user = userEvent.setup();

    // Render our test component (now automatically wrapped!)
    render(<TestComponent />);

    // 1. Find the toggle button
    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });

    // 2. Click it
    await user.click(toggleBtn);

    // 3. ASSERT: The text should now show 'light'
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });
});
