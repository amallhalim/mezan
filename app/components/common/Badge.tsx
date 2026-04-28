import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
}

/**
 * Modern Badge component using Tailwind utility classes and design system tokens.
 * Focuses on high-contrast, compact metadata display.
 */
export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md' 
}) => {
  const baseStyles = "inline-flex items-center font-black tracking-widest uppercase rounded-full border";
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[8px]",
    md: "px-3 py-1 text-[10px]",
  };

  const variantStyles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    outline: "bg-transparent text-text-dim border-border",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
