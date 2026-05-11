"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// --- STEP 1: Define Types ---
// We define exactly what strings are allowed for the theme.
type Theme = "light" | "dark";

// We define the interface (the shape) of the data we want to share.
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// --- STEP 2: Create the Context ---
// Think of this as creating a 'Radio Frequency' that components can tune into.
// We start with 'undefined' because the real data isn't ready yet.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- STEP 3: The Provider Component ---
// This is the component that 'holds' the data and shares it with its children.
export function ThemeProvider({ children }: { children: ReactNode }) {
  // A. Create the actual state inside this component.
  const [theme, setTheme] = useState<Theme>("dark");

  // B. Create the function that modifies that state.
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    // C. Use the .Provider to 'broadcast' the data.
    // Whatever you put in 'value' is what children components will receive.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* We apply a CSS class based on the theme state */}
      <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// --- STEP 4: The Custom Hook ---
// This is the 'Radio Receiver' that components use to get the data.
export function useTheme() {
  const context = useContext(ThemeContext);
  
  // SAFETY CHECK: If someone tries to use useTheme() outside of a <ThemeProvider>,
  // this check will catch the mistake and show a clear error message.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
