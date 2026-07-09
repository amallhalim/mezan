# 🎨 Milestone 1 — Design Fundamentals

This document outlines the design fundamentals, systems thinking, and visual consistency principles studied and implemented during Milestone 1.

---

## 🎯 Goal

Learn design system thinking and establish visual consistency across the entire **Mizan Health Suite** application.

---

## 📚 Syllabus

### 1. Key Concepts Learned

- **Design Systems**: Reusable components guided by clear standards and combined into structured patterns.
- **Spacing Scale**: Establishing a consistent layout rhythm using a 4px/8px incremental scale to guide user focus and clean layouts.
- **Typography Hierarchy**: Utilizing responsive headings, body sizing, and readable line heights. Incorporates font families tailored for different scripts (e.g., _Geist Sans_ for English, _Tajawal_ for Arabic).
- **Color Systems**: Categorized colors including Brand, Social, Semantic (Success, Warning, Info, Error), and Theme (Background, Foreground, Surface, Borders).
- **Visual Hierarchy**: Guiding user focus through contrast, sizing, positioning, weight, and whitespace.
- **Grid & Layout**: Modular flex layouts and CSS grid positioning that adapt to different screen sizes.
- **Design Tokens Basics**: Centralizing design decisions (colors, sizes, spacing, shadows) in variables (`tokens.css` / `tokens.ts`) for unified updates.

### 2. Learning Resources

- **Material Design**: Google's open-source design system.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI composition.
- **Refactoring UI**: Practical techniques for UI design by Adam Wathan & Steve Schoger.
- **Laws of UX**: Visual psychology rules (e.g., Fitts's Law, Jakob's Law, Hick's Law).

---

## 🛠️ Style Guide Implementations in Mizan

We have implemented design tokens, standard utility styles, and custom themes to adhere strictly to Milestone 1 design fundamentals. You can see these in action by visiting the interactive `/style-guide` route in the application.

### 1. Spacing Scale (4px / 8px Increments)

Defined in `app/styles/tokens.css` and mapped to CSS variables:

- `var(--spacing-xs)` = `4px`
- `var(--spacing-sm)` = `8px`
- `var(--spacing-md)` = `16px`
- `var(--spacing-lg)` = `24px`
- `var(--spacing-xl)` = `32px`
- `var(--spacing-xxl)` = `48px`

### 2. Typography Hierarchy

Optimized for high readability in both English and Arabic layouts:

- **Sans-Serif Font Family**: `Geist` (Modern English typography)
- **Arabic Font Family**: `Tajawal` / `Cairo` (Ensuring premium rendering for RTL text)
- **Visual Weights**: Light, Normal, Medium, Bold, and Black.

### 3. Color Systems

Implemented semantic maps that adapt dynamically to Dark and Light modes:

- **Brand Colors**: Emerald (`oklch(0.72 0.18 165)`), Dark background (`oklch(0.18 0.04 200)`).
- **Macros Colors**: Protein (Sky Blue), Carbs (Amber), Fat (Rose).
- **Semantic States**: Success, Warning, Error, and Info.

### 4. Borders & Radius Scale

Smooth, premium aesthetics utilizing calc offsets:

- `var(--radius-sm)` = `12px` (Radius - 4px)
- `var(--radius-md)` = `14px` (Radius - 2px)
- `var(--radius-lg)` = `16px` (Standard Base Radius)
- `var(--radius-xl)` = `20px` (Radius + 4px)
- `var(--radius-full)` = `9999px` (Circles & Capsules)

### 5. Custom Elevation & Shadows

Applied using ambient shadows to give components a distinct elevation level over page backgrounds.

---

## 🚀 Practice Project: Interactive Style Guide

As the practical output of this milestone, we built an **Interactive Style Guide Page** inside the Next.js application at `/style-guide`.

This page allows developers to visually inspect:

1. **Color Swatches** (Theme, Brand, and Macro-Nutrient color variables in Light/Dark modes).
2. **Typography Hierarchy** (Headings, Body paragraphs, and font comparisons).
3. **Spacing Scales** (Visualizing widths and heights with label values).
4. **Border Radii** (Interactive cards displaying curvature).
5. **Component Shadows** (Visualizing card elevations).
6. **Button Variations** (Primary, Secondary, Outline, States: Hover, Active, Disabled, and Loading).

👉 **Try it locally**: Run `npm run dev` and navigate to `http://localhost:3000/en/style-guide` (or `/ar/style-guide` for RTL mode).
