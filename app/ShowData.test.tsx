import { render, screen } from "./tests/test-utils";
import ShowData from "./ShowData";
import { server } from "./mocks/node"; // 👈 Import the server
import { http, HttpResponse } from "msw"; // 👈 Import MSW tools

describe("ShowData Component (MSW Mocking)", () => {
  test("shows loading state initially", () => {
    render(<ShowData />);
    expect(screen.getByText(/Loading User/i)).toBeInTheDocument();
  });

  test("fetches and displays the user data from MSW", async () => {
    render(<ShowData />);

    // 🕵️‍♂️ MSW will intercept the request and return "John Maverick"
    // We use 'findByText' because it waits for the async update!
    const userName = await screen.findByText(/John Maverick/i);

    expect(userName).toBeInTheDocument();
    expect(screen.getByText(/ID: abc-123/i)).toBeInTheDocument();

    // Ensure loading text is gone
    expect(screen.queryByText(/Loading User/i)).not.toBeInTheDocument();
  });

  test("handles API errors correctly", async () => {
    // 🧪 DYNAMIC OVERRIDE: Tell MSW to fail just for this test
    server.use(
      http.get("https://api.example.com/user", ({ request, params }) => {
        // You can now access 'request.url' or 'params' here if needed!
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<ShowData />);

    // Check if our error message appeared
    const errorMessage = await screen.findByText(/Failed to load user/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });
});
