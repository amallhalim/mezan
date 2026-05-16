import { render, screen } from "@/app/tests/test-utils";
import Button from "./Button";
// import { screen } from "@testing-library/react";

describe("main btn", () => {
  test("test click labal", () => {
    render(<Button> click </Button>);
    expect(screen.getByText("click").toBeInTheDocument);
    render(<Button> 🐔 </Button>);
    expect(screen.getByText("🐔")).toBeInTheDocument();
  });
});
