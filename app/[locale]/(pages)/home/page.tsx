import React from "react";

export default function page() {
  function add(a: number, b: number) {
    const result = a + b; // 🔴 breakpoint here
    console.log("result  1", result);
    debugger; // ⛔ pause here
    console.log("result  2", result);

    return result;
  }

  add(2, 3);

  return <div>page</div>;
}
function test() {
  const x = 10;
  const y = 20;
  const sum = x + y;

  debugger;

  return sum;
}

test();
