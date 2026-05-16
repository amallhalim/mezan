"use client";
import { useState } from "react";

/**
 * A simple counter hook.
 * It takes an initial number and returns state + controls.
 */
export default function useCount(initialCount = 0, step = 1) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialCount);

  return { count, increment, decrement, reset };
}
