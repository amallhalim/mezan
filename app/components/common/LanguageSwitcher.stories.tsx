"use client";
import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

// Mock implementation that doesn't rely on Next.js router
// The real component requires Next.js app router which isn't available in Storybook
// This replicates the visual appearance and behavior of LanguageSwitcher
function MockedLanguageSwitcher({ locale = "en" }: { locale?: "en" | "ar" }) {
  const [currentLocale, setCurrentLocale] = React.useState(locale);

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "en" ? "ar" : "en";
    setCurrentLocale(nextLocale);
    fn()(`Language toggled to: ${nextLocale}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold backdrop-blur-xl transition-all hover:bg-white/10"
    >
      {currentLocale === "en" ? "العربية" : "English"}
    </button>
  );
}

const meta = {
  title: "UI/LanguageSwitcher",
  component: MockedLanguageSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    locale: {
      control: "radio",
      options: ["en", "ar"],
      description: "Initial locale for demonstration",
    },
  },
  args: {
    locale: "en",
  },
} satisfies Meta<typeof MockedLanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    locale: "en",
  },
};

export const English: Story = {
  args: {
    locale: "en",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1rem",
          background: "#0d1f14",
          borderRadius: "12px",
          display: "inline-block",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            fontSize: "11px",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          English Mode
        </p>
        <Story />
      </div>
    ),
  ],
};

export const Arabic: Story = {
  args: {
    locale: "ar",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1rem",
          background: "#0d1f14",
          borderRadius: "12px",
          display: "inline-block",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            fontSize: "11px",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Arabic Mode
        </p>
        <Story />
      </div>
    ),
  ],
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    locale: "en",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          padding: "2rem",
          background: "#0d1f14",
          borderRadius: "16px",
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
          Click to toggle language
        </p>
        <Story />
      </div>
    ),
  ],
};
