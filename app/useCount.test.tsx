import { renderHook, act } from "@/app/tests/test-utils";
import useCount from "./useCount";

describe("useCount (Correct Live Updates)", () => {

    test("starts at 0 by default", () => {
        const { result } = renderHook(() => useCount());
        // ✅ Access 'current' at the moment of assertion
        expect(result.current.count).toBe(0);
    });

    test("increments the count correctly", () => {
        const { result } = renderHook(() => useCount(0));

        // You can destructure the function safely...
        const { increment } = result.current;

        act(() => {
            increment();
        });

        // ❌ DON'T use a destructured 'count' variable here!
        // ✅ ALWAYS use result.current.count to see the update
        expect(result.current.count).toBe(1);
    });

    test("decrements the count correctly", () => {
        const { result } = renderHook(() => useCount(10));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(9);
    });

    test("increments by a custom step", () => {
        const { result } = renderHook(() => useCount(0, 5));

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(5);
    });
});