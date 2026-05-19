import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

test("renders all food data correctly", () => {
  render(<Badge>Chicken Breast</Badge>);
  expect(screen.getByText("Chicken Breast")).toBeInTheDocument();
});
// test color and varaint
test("renders variant colors correctly", () => {
  render(<Badge variant="primary">Selected Primary</Badge>);
  expect(screen.getByText("Selected Primary")).toHaveClass(
    "bg-primary/10 text-primary border-primary/20"
  );
});

test("render success variant", () => {
  render(<Badge variant="success">Selected Success</Badge>);
  expect(screen.getByText("Selected Success")).toHaveClass(
    "bg-success/10 text-success border-success/20"
  );
});
test("render warning variant", () => {
  render(<Badge variant="warning">Selected Warning</Badge>);
  expect(screen.getByText("Selected Warning")).toHaveClass(
    "bg-warning/10 text-warning border-warning/20"
  );
});
test("render error varainat", () => {
  render(<Badge variant="error">Selected Error</Badge>);
  expect(screen.getByText("Selected Error")).toHaveClass(
    "bg-error/10 text-error border-error/20"
  );
});
test("render outline variant ", () => {
  render(<Badge variant="outline">Selected Outline</Badge>);
  expect(screen.getByText("Selected Outline")).toHaveClass(
    "bg-transparent text-text-dim border-border"
  );
});
test("render outline variant", () => {
  render(<Badge variant="outline">Selected Outline</Badge>);
  expect(screen.getByText("Selected Outline")).toHaveClass(
    "bg-transparent text-text-dim border-border"
  );
});
//test size
test("renders size correctly", () => {
  render(<Badge size="sm">Selected Primary</Badge>);
  expect(screen.getByText("Selected Primary")).toHaveClass(
    "px-2 py-0.5 text-[8px]"
  );
});
test("renders size correctly", () => {
  render(<Badge size="md">Selected Primary</Badge>);
  expect(screen.getByText("Selected Primary")).toHaveClass(
    "px-3 py-1 text-[10px]"
  );
});
//test baseStyles
test("render baseStyles", () => {
  render(<Badge>Selected based Styles</Badge>);
  expect(screen.getByText("Selected based Styles")).toHaveClass(
    "inline-flex items-center font-black tracking-widest uppercase rounded-full border"
  );
});
