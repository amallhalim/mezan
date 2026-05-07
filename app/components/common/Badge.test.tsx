import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

test("renders all food data correctly", () => {
  render(<Badge>Chicken Breast</Badge>);
  expect(screen.getByText('Chicken Breast')).toBeInTheDocument();
})