"use client";

import React from "react";
import TestComp from "./TestComp";
import InnerComp from "./InnerCop";

export default function Test() {
  return (
    <div>
      <TestComp
        handleClick={() => {
          console.log("hello world");
        }}
        user={{ name: "mohamed", age: 25 }}
        productList={[
          { name: "laptop", price: 1000, qty: 5 },
          { name: "phone", price: 2000, qty: 5 },
        ]}
        Component={InnerComp}
      >
        {/* hello world */}
      </TestComp>
    </div>
  );
}
