"use client";

import Button from "../components/common/Button";
import { userProps } from "./InnerCop";

type testProps = {
  children?: React.ReactNode;
  user: { name: string; age: number };
  productList: { name: string; price: number; qty: number }[];
  handleClick: () => void;
  Component: React.ComponentType<userProps>;
};
export default function TestComp({
  children,
  user,
  productList,
  handleClick,
  Component,
}: testProps) {
  console.log(productList);

  return (
    <div className="mt-10" onClick={handleClick}>
      <Button>88888 ghost</Button>
      <div> hello 1</div>
      {productList?.map((p) => (
        <div key={p.name} className="bg-primary">
          <p>{p?.name}</p>
          <p>{p?.price}</p>
          <p>{p?.qty}</p>
        </div>
      ))}
      <p>{user?.name}</p>
      <p>{user.age}</p>
      {children}
      <Component user={user} />
    </div>
  );
}
