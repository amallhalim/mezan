"use client";
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) {
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-[#059669] hover:from-[#10B981] hover:to-primary text-secondary shadow-[0_10px_30px_rgba(16,185,129,0.3)]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    outline: "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px] rounded-xl",
    md: "px-4 py-2.5 text-xs rounded-2xl",
    lg: "px-6 py-3.5 text-sm rounded-2xl",
    xl: "px-8 py-4 text-base rounded-[1.5rem]",
  };

  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        <>
          {leftIcon && <span className="mr-2 group-hover:scale-110 transition-transform">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 group-hover:scale-110 transition-transform">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
