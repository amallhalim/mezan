import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";

test("renders counter", () => {
  render(<Counter />);
  expect(screen.getByText("Counter Interaction")).toBeInTheDocument();
});
test("handlderl are called on click", () => {
  const func = vi.fn();
  render(<Counter onIncrement={func} onDecrement={func} />);
  const incrementBtn = screen.getByText("Increment");
  // const decrementBtn = screen.getByText("Decrement")
  fireEvent.click(incrementBtn);
  // fireEvent.click(decrementBtn)
  expect(func).toHaveBeenCalledTimes(1);
});

test("counter displays props", () => {
  render(<Counter count={999} />);
  expect(screen.getByText("999")).toBeInTheDocument();
});

test("click increment button", () => {
  render(<Counter />);
  const incrementBtn = screen.getByText("Increment");
  fireEvent.click(incrementBtn);
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("click decrement button", () => {
  render(<Counter />);
  const decrementBtn = screen.getByText("Decrement");
  fireEvent.click(decrementBtn);
  expect(screen.getByText("-1")).toBeInTheDocument();
});

test("click reset button", () => {
  render(<Counter />);
  const resetBtn = screen.getByText("Reset");
  fireEvent.click(resetBtn);
  expect(screen.getByText("0")).toBeInTheDocument();
});
test("user click", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByText(/Increment/i));
  expect(screen.getByText("1")).toBeInTheDocument();
});
