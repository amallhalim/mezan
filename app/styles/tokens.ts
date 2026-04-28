// app/styles/tokens.ts

/**
 * Design Tokens for Mizan Health Suite.
 * Typed wrapper for CSS variables defined in globals.css.
 */

export const colors = {
  brand: {
    emerald: "var(--brand-emerald)",
    emeraldGlow: "var(--brand-emerald-glow)",
    dark: "var(--brand-dark)",
  },

  social: {
    twitter: "var(--twitter)",
    facebook: "var(--facebook)",
    whatsapp: "var(--whatsapp)",
  },

  theme: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    surface: "var(--surface)",
    surfaceElevated: "var(--surface-elevated)",
    card: "var(--card)",
    border: "var(--border)",
    primary: "var(--primary)",
    primaryGlow: "var(--primary-glow)",
    muted: "var(--muted)",
    mutedForeground: "var(--muted-foreground)",
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--error)",
    info: "var(--info)",
  }
};

export const spacing = {
  xs: "var(--spacing-xs)",
  sm: "var(--spacing-sm)",
  md: "var(--spacing-md)",
  lg: "var(--spacing-lg)",
  xl: "var(--spacing-xl)",
  xxl: "var(--spacing-xxl)",
};

export const radius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  full: "var(--radius-full)",
};

export const typography = {
  font: {
    sans: "var(--font-sans)",
    arabic: "var(--font-arabic)",
  },
  weight: {
    normal: "var(--weight-normal)",
    medium: "var(--weight-medium)",
    bold: "var(--weight-bold)",
    black: "var(--weight-black)",
  }
};

export const tokens = {
  colors,
  spacing,
  radius,
  typography
};
