import { logRoles, prettyDOM, render, screen } from "@testing-library/react"

import Home from "./page"
import userEvent from "@testing-library/user-event"


/** 
 * 🟢 getByRole: THE BEST WAY (Priority #1)
 * Use this for anything a user can interact with (Buttons, Links, Headings).
 * It tests accessibility by checking the "role" in the accessibility tree.
 */
test("renders by Role (Heading and Buttons)", () => {
    const { container } = render(<Home />)
    // Logs a URL to the console that opens the current UI state in Testing Playground.
    // Use this for visual debugging and finding the best queries (roles, labels, etc.).


    // console.log("prettyDOM-----------------------")
    // console.log("prettyDOM", prettyDOM())
    // console.log("prettyDOM-----------------------")
    // console.log(" screen.debug-----------------------")
    // screen.debug(container)
    // console.log(" screen.debug-----------------------")
    // console.log("logRoles--11---------------------")
    // logRoles(container);
    // console.log("logRoles---33--------------------")



    const heading = screen.getByRole("heading", { name: /Testing Sandbox/i })
    expect(heading).toBeInTheDocument()

    const submitBtn = screen.getByRole("button", { name: /Submit Plate/i })
    expect(submitBtn).toBeInTheDocument()
})





describe("renders by ALL", () => {
    test("renders by ALL (Heading and Buttons)", () => {
        render(<Home />)
        const heading = screen.getByRole("heading", { name: /Testing Sandbox/i })
        expect(heading).toBeInTheDocument()

        const submitBtn = screen.getByRole("button", { name: /Submit Plate/i })
        expect(submitBtn).toBeInTheDocument()
    })

    /** 
 * 🟢 getByLabelText: Best for Form Fields
 * Use this for inputs that have a corresponding <label> tag. 
 * This ensures your forms are properly labeled and accessible.
 */
    test("renders by Label Text (Form Input)", () => {
        render(<Home />)
        const usernameInput = screen.getByLabelText(/Username/i)
        expect(usernameInput).toBeInTheDocument()
    })

    /** 
     * 🟢 getByPlaceholderText: Good for Search/Inputs
     * Use this for inputs that use 'placeholder="..."' instead of a label.
     */
    test("renders by Placeholder Text (Form Input)", () => {
        render(<Home />)
        const searchInput = screen.getByPlaceholderText(/e\.g\. Chicken Breast/i)
        expect(searchInput).toBeInTheDocument()
    })

    /** 
     * 🟢 getByDisplayValue: Good for checking current values
     * Use this to verify what is currently typed or selected in a form field.
     */
    test("renders by Display Value (Pre-filled Input)", () => {
        render(<Home />)
        const displayValue = screen.getByDisplayValue(/JohnDoe/i)
        expect(displayValue).toBeInTheDocument()
    })
    /** 
     * 🟢 getByAltText: Best for Images
     * Use this to check if an image is showing correctly using its 'alt' description.
     */
    test("renders by Alt Text (Image)", () => {
        render(<Home />)
        const logo = screen.getByAltText(/Mizan Logo/i)
        expect(logo).toBeInTheDocument()
    })

    /** 
     * 🟢 getByTitle: Best for Tooltips/SVGs
     * Use this for elements that have a 'title' attribute (extra info on hover).
     */
    test("renders by Title (Tooltip/System Info)", () => {
        render(<Home />)
        const statusDiv = screen.getByTitle(/System Status: Operational/i)
        expect(statusDiv).toBeInTheDocument()
    })
    /** 
 * 🔴 getByTestId: THE LAST RESORT
 * Use this ONLY when you cannot find the element any other way.
 * It requires adding 'data-testid' directly into your HTML code.
 */
    test("renders by Test ID (Last Resort)", () => {
        render(<Home />)
        const versionTag = screen.getByTestId("version-tag")
        expect(versionTag).toBeInTheDocument()
        expect(versionTag).toHaveTextContent(/v1\.0\.4/i)
    })
})

describe("Navigation", () => {
    test("calculator link has correct href", () => {
        render(<Home />)
        // Find the link by role and name
        const link = screen.getByRole("link", { name: /Open Calculator/i })

        // Verify the href attribute
        expect(link).toHaveAttribute("href", "/calculator")
    })
})

describe("Interactions", () => {
    test("increments count when increment button is clicked", async () => {
        const user = userEvent.setup();
        render(<Home />);

        // Find the specific button by its name (the text inside it)
        const incrementBtn = screen.getByRole("button", { name: /increment/i });

        // Perform the click
        await user.click(incrementBtn);

        // ASSERT: Check if the count updated in the UI
        expect(screen.getByText(/count is 1/i)).toBeInTheDocument();

    });
    test("trible clicl", async () => {
        const user = userEvent.setup();
        render(<Home />);
        const incrementBtn = screen.getByRole("button", { name: /increment/i });
        await user.tripleClick(incrementBtn);

        expect(screen.getByText(/count is 3/i)).toBeInTheDocument();
    })
});