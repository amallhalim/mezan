"use client";
import React from "react";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "category";
export type buttonSizes = "sm" | "md" | "lg" | "xl";
type NoGhost = Exclude<ButtonTypes, "ghost">;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NoGhost;
  size?: buttonSizes;
  isLoading?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSelected?: boolean;
  children: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  isSelected = false,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-emerald-600 hover:from-emerald-400 hover:to-primary text-secondary shadow-[0_10px_30px_rgba(16,185,129,0.3)]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    outline:
      "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",
    category: `border-primary/20 border whitespace-nowrap !tracking-normal !normal-case !font-bold !rounded-full transition-colors ${isSelected ? "bg-primary text-secondary" : "bg-primary/20 text-gray-300"}`,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px] rounded-xl",
    md: "px-4 py-2.5 text-xs rounded-2xl",
    lg: "px-6 py-3.5 text-sm rounded-2xl",
    xl: "px-8 py-4 text-base rounded-[1.5rem]",
  };

  const baseStyles =
    "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${isSelected && variant !== "category" ? "ring-primary ring-offset-background ring-2 ring-offset-2" : ""} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="me-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {leftIcon && (
            <span className="me-2 transition-transform group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="ms-2 transition-transform group-hover:scale-110">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
