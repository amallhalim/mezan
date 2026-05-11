import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";

/**
 * CUSTOM RENDER FUNCTION
 * This function wraps every component we test inside the ThemeProvider automatically.
 * You can also add other providers here (Auth, Redux, etc.) in the future.
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Export everything from Testing Library, but override the 'render' method
export * from "@testing-library/react";
export { customRender as render };
