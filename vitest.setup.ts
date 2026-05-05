import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver which is not available in JSDOM
// It must be a class (constructor)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Alternatively, use a class
class MockResizeObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

global.ResizeObserver = MockResizeObserver as any;
