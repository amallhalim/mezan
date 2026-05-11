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
  let x = 10;
  let y = 20;
  let sum = x + y;

  debugger;

  return sum;
}

test();
