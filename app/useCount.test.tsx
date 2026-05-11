import { renderHook, act } from "./tests/test-utils";
import useCount from "./useCount";

describe("useCount (Extract After Update Style)", () => {
  test("starts at 0 by default", () => {
    const { result } = renderHook(() => useCount());

    // Extracting data for the assertion
    const { count } = result.current;
    expect(count).toBe(0);
  });

  test("increments the count correctly", () => {
    const { result } = renderHook(() => useCount(0));
    const { increment } = result.current;

    act(() => {
      increment();
    });

    // ✅ Extracting count AFTER the act() so it has the new value
    const { count } = result.current;
    expect(count).toBe(1);
  });

  test("decrements the count correctly", () => {
    const { result } = renderHook(() => useCount(10));
    const { decrement } = result.current;

    act(() => {
      decrement();
    });

    // ✅ Extracting count AFTER the update
    const { count } = result.current;
    expect(count).toBe(9);
  });

  test("increments by a custom step", () => {
    const { result } = renderHook(() => useCount(0, 5));
    const { increment } = result.current;

    act(() => {
      increment();
    });

    // ✅ Extracting count AFTER the update
    const { count } = result.current;
    expect(count).toBe(5);
  });
});
