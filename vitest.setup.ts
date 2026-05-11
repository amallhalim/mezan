import "@testing-library/jest-dom";
import { vi, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./app/mocks/node";

// Mock ResizeObserver which is not available in JSDOM
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver =
  MockResizeObserver as unknown as typeof global.ResizeObserver;

// ✅ Start the interceptor before all tests
beforeAll(() => server.listen());
// ✅ Reset any handlers between tests so they don't bleed over
afterEach(() => server.resetHandlers());
// ✅ Clean up once the entire test suite is finished
afterAll(() => server.close());
