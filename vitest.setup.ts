import "@testing-library/jest-dom";
import { vi, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./app/mocks/node";

// Mock function used to track router.replace() calls in tests
const mockFu = vi.fn();

// Mock ResizeObserver because JSDOM does not support it by default
// Prevents errors for components/libraries relying on ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Attach mocked ResizeObserver to global test environment
global.ResizeObserver =
  MockResizeObserver as unknown as typeof global.ResizeObserver;

// Mock Next.js navigation hooks used inside components
// Prevents Next.js router errors during testing
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),

  // Mock current pathname
  usePathname: () => "/",

  // Mock URL search params
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-intl hooks/providers
// Avoids translation and locale dependency issues during tests
vi.mock("next-intl", () => ({
  // Default locale returned in tests
  useLocale: () => "en",

  // Returns translation key directly instead of loading translations
  useTranslations: () => (key: string) => key,

  // Mock provider wrapper
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

// Mock custom i18n navigation wrapper
// Used when app wraps next/navigation inside custom helpers
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: mockFu,
    push: vi.fn(),
    refresh: vi.fn(),
  }),

  // Mock active pathname
  usePathname: () => "/",

  // Mock Link component
  Link: "a",

  // Mock redirect helper
  redirect: vi.fn(),

  // Mock pathname helper
  getPathname: vi.fn(),
}));

// Start MSW mock server before all tests
// Intercepts API requests and returns mocked responses
beforeAll(() => server.listen());

// Reset request handlers and mocks after every test
// Prevents test pollution between test cases
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

// Close MSW server after all tests finish
afterAll(() => server.close());
