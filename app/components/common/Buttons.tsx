import { CheckIcon } from "lucide-react";
import React from "react";

interface ButtonsProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function Buttons({
  title,
  icon,
  isSelected = false,
  className = "",
  onClick,
  props,
}: ButtonsProps) {
  return (
    <button
      onClick={onClick}
      data-active={isSelected ? "true" : "false"}
      {...props}
      className={`border-primary/20 flex flex-row items-center justify-center gap-2 rounded-full border px-4 py-2 font-bold whitespace-nowrap ${isSelected ? "bg-primary text-secondary" : "bg-primary/20 text-gray-300"} ${className}`}
    >
      {icon}
      {title}
      {isSelected && <CheckIcon className="size-4" />}
    </button>
  );
}
