# 🌐 End-to-End (E2E) Testing with Cypress

## ❓ Why Use Cypress for E2E Testing?

End-to-End (E2E) testing ensures that the entire application works together correctly from the user's perspective. While unit tests check individual functions or components, E2E tests simulate a real user clicking through the app, interacting with the backend, and navigating between pages.

We use **Cypress** because:

- **Visual Debugging**: It provides a visual interface to see tests run step-by-step.
- **Real Browser Environment**: Tests run in an actual browser, meaning they interact with the DOM exactly like a user would.
- **Automatic Waiting**: Cypress automatically waits for elements to appear, removing the need for manual timeouts or complicated async logic.
- **Network Control**: Easy to stub or monitor network requests to test different scenarios (e.g., failed API calls).

## 📁 Folder Structure

All Cypress-related files are located in the `cypress/` directory at the root of the project:

- **`cypress/e2e/`**: This is where your actual test files live. You should create your `.cy.ts` or `.cy.js` files here. Group them into subfolders (e.g., `auth/`, `dashboard/`) for better organization.
- **`cypress/fixtures/`**: Store static mock data (JSON files) used to intercept network responses or provide consistent test data.
- **`cypress/support/`**: Contains utility functions and custom Cypress commands (`commands.ts`). This is also where global configuration or setup code runs before every test (`e2e.ts`).
- **`cypress.config.ts`**: The main configuration file for Cypress (Base URL, timeouts, viewport size, etc.). Located at the root of the project.

## 📝 How to Add a New Test File

1. Navigate to the `cypress/e2e/` directory.
2. Create a new file with the `.cy.ts` (or `.cy.js`) extension. For example: `cypress/e2e/loginPage.cy.ts`.
3. Write your test using `describe` and `it` blocks:

```typescript
describe("Login Page", () => {
  beforeEach(() => {
    // Visit the page before each test.
    // Uses the baseUrl defined in cypress.config.ts
    cy.visit("/login");
  });

  it("should display the login form", () => {
    // Check if elements exist and are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Login");
  });

  it("should successfully log in with valid credentials", () => {
    // Type into inputs
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("password123");

    // Click button
    cy.get('button[type="submit"]').click();

    // Assert successful navigation or state change
    cy.url().should("include", "/dashboard");
  });
});
```

## 🧹 Linting & Code Quality (ESLint)

When writing E2E tests, it's important to remember that Cypress tests run in a completely different environment than our Next.js React application. Because of this, we use a dedicated package called **`eslint-plugin-cypress`**.

### ❓ Why do we use `eslint-plugin-cypress`?

1. **Global Variables:** Cypress uses global variables like `cy` and `Cypress`. Standard Next.js linting rules would flag these as "undefined variables" and crash our builds. This plugin tells ESLint that these globals are allowed and expected.
2. **Different Code Styles:** In standard React code, writing an unassigned property (e.g., `myVariable.true;`) is an error ("unused expression"). However, in Cypress, this is exactly how we write assertions (e.g., `expect(value).to.be.true`). This plugin configures ESLint to accept these valid testing patterns.
3. **Best Practices:** It enforces Cypress-specific best practices, such as warning you if you use `cy.wait()` (which is generally discouraged in favor of waiting for elements to appear).

_Note: The configuration for this is handled inside the `eslint.config.mjs` file at the root of the project._

## 🚀 How to Run E2E Tests

**Important:** Make sure your local development server (`npm run dev`) is running in another terminal before starting Cypress, so that Cypress can interact with your application!

### 1. Interactive Dashboard (Recommended for Development)

Opens the Cypress UI where you can choose which browser to use and which tests to run. You can see the tests executing visually, inspect the DOM at each step, and debug errors.

```bash
npm run cy:open
```

### 2. Headless Mode (For CI/CD or Quick Checks)

Runs all tests in the background (terminal) without opening a UI window. This is faster and is exactly what runs in automated CI/CD pipelines (like GitHub Actions).

```bash
npm run cy:run
```
