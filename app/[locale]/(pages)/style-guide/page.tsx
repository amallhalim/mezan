"use client";
import React, { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/app/components/common/Button";
import {
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Layers,
  Type,
  Maximize,
  LayoutGrid,
  ShieldAlert,
} from "lucide-react";

export default function StyleGuidePage() {
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // State for interactive spacing visualizer
  const [hoveredSpacing, setHoveredSpacing] = useState<string | null>(null);

  // Spacing Scale mapping
  const spacings = [
    {
      name: "xs",
      value: "4px",
      desc: "Extra small spacing (margins/padding of sub-elements)",
    },
    {
      name: "sm",
      value: "8px",
      desc: "Small spacing (inner padding, list item gaps)",
    },
    {
      name: "md",
      value: "16px",
      desc: "Medium spacing (standard grid gaps, card padding)",
    },
    {
      name: "lg",
      value: "24px",
      desc: "Large spacing (page margins, section divisions)",
    },
    {
      name: "xl",
      value: "32px",
      desc: "Extra large spacing (hero padding, main containers)",
    },
    {
      name: "xxl",
      value: "48px",
      desc: "Double extra large spacing (large hero sections)",
    },
  ];

  // Border Radius mapping
  const radii = [
    {
      name: "sm",
      value: "12px",
      desc: "Small utility elements (badges, sub-inputs)",
      class: "rounded-sm",
    },
    {
      name: "md",
      value: "14px",
      desc: "Medium components (small inputs, tabs)",
      class: "rounded-md",
    },
    {
      name: "lg",
      value: "16px",
      desc: "Large core components (standard cards, modals)",
      class: "rounded-lg",
    },
    {
      name: "xl",
      value: "20px",
      desc: "Extra large layouts (main wrappers, panels)",
      class: "rounded-xl",
    },
    {
      name: "full",
      value: "9999px",
      desc: "Pills, tags, circles, and action pills",
      class: "rounded-full",
    },
  ];

  // Colors mapping
  const colorSystem = {
    brand: [
      {
        name: "--brand-emerald",
        value: "oklch(0.72 0.18 165)",
        label: isArabic ? "الزمردي البراند" : "Brand Emerald",
        bg: "bg-primary",
      },
      {
        name: "--brand-emerald-glow",
        value: "oklch(0.82 0.2 162)",
        label: isArabic ? "توهج الزمردي" : "Emerald Glow",
        bg: "bg-[var(--brand-emerald-glow)]",
      },
      {
        name: "--brand-dark",
        value: "oklch(0.18 0.04 200)",
        label: isArabic ? "الداكن البراند" : "Brand Dark",
        bg: "bg-[#04120c]",
      },
    ],
    theme: [
      {
        name: "--background",
        label: isArabic ? "الخلفية الأساسية" : "Background",
        bg: "bg-background",
      },
      {
        name: "--foreground",
        label: isArabic ? "النص والخط" : "Foreground",
        bg: "bg-foreground text-background flex items-center justify-center font-bold",
      },
      {
        name: "--surface",
        label: isArabic ? "الخلفية الثانوية" : "Surface",
        bg: "bg-surface",
      },
      {
        name: "--surface-elevated",
        label: isArabic ? "الطبقة المرفوعة" : "Surface Elevated",
        bg: "bg-surface-elevated",
      },
      {
        name: "--card",
        label: isArabic ? "البطاقة الزجاجية" : "Glass Card",
        bg: "bg-card backdrop-blur-xl",
      },
      {
        name: "--border",
        label: isArabic ? "الحدود والفواصل" : "Border",
        bg: "bg-transparent border border-border",
      },
    ],
    macros: [
      {
        name: "--macro-protein",
        value: "oklch(0.7 0.12 230)",
        label: isArabic ? "بروتين" : "Protein",
        bg: "bg-[var(--macro-protein)]",
      },
      {
        name: "--macro-carbs",
        value: "oklch(0.8 0.15 75)",
        label: isArabic ? "نشويات" : "Carbs",
        bg: "bg-[var(--macro-carbs)]",
      },
      {
        name: "--macro-fat",
        value: "oklch(0.65 0.18 15)",
        label: isArabic ? "دهون" : "Fat",
        bg: "bg-[var(--macro-fat)]",
      },
    ],
    status: [
      {
        name: "--success",
        label: isArabic ? "نجاح" : "Success",
        bg: "bg-success",
        icon: <CheckCircle className="size-5" />,
      },
      {
        name: "--warning",
        label: isArabic ? "تحذير" : "Warning",
        bg: "bg-warning",
        icon: <AlertTriangle className="size-5 text-zinc-950" />,
      },
      {
        name: "--error",
        label: isArabic ? "خطأ" : "Error",
        bg: "bg-error",
        icon: <XCircle className="size-5" />,
      },
      {
        name: "--info",
        label: isArabic ? "معلومات" : "Info",
        bg: "bg-info",
        icon: <Info className="size-5" />,
      },
    ],
  };

  return (
    <div
      className={`selection:bg-primary/30 min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-12 lg:py-24">
        {/* Navigation & Controls */}
        <header className="mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition-all hover:bg-white/10"
            >
              {isArabic ? (
                <ArrowRight className="size-4" />
              ) : (
                <ArrowLeft className="size-4" />
              )}
              {isArabic ? "الرجوع للرئيسية" : "Back to Home"}
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                leftIcon={
                  theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )
                }
              >
                {isArabic ? "تغيير المظهر" : "Toggle Theme"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
              {isArabic ? "دليل الهوية البصرية" : "Design Style Guide"}
            </h1>
            <p className="text-text-dim max-w-2xl text-lg">
              {isArabic
                ? "دليل تفاعلي للتحقق من الاتساق البصري، الألوان، الخطوط، المسافات، والحواف الخاصة بـ Mizan Health Suite."
                : "An interactive workspace to verify visual consistency, colors, typography, spacing, and UI primitives for Mizan Health Suite."}
            </p>
          </div>
        </header>

        {/* 1. COLOR SYSTEMS */}
        <section className="mb-16 space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
              <Layers className="text-primary size-5" />
            </div>
            <h2 className="text-2xl font-black">
              {isArabic ? "١. نظام الألوان" : "1. Color Systems"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Brand & Theme Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                {isArabic ? "ألوان البراند والهوية" : "Brand & Base Layers"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {colorSystem.brand.map((c) => (
                  <div
                    key={c.name}
                    className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-3"
                  >
                    <div className={`h-16 w-full rounded-xl ${c.bg} mb-3`} />
                    <span className="block text-sm font-bold">{c.label}</span>
                    <span className="block font-mono text-[10px] text-gray-500">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic & Status Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                {isArabic
                  ? "الألوان الدلالية والحالات"
                  : "Semantic & Status Colors"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {colorSystem.status.map((c) => (
                  <div
                    key={c.name}
                    className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-3"
                  >
                    <div
                      className={`flex h-16 w-full items-center justify-center rounded-xl ${c.bg} mb-3 text-white shadow-lg`}
                    >
                      {c.icon}
                    </div>
                    <span className="block text-sm font-bold">{c.label}</span>
                    <span className="block font-mono text-[10px] text-gray-500">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Macro Nutrient Colors */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              {isArabic ? "ألوان الماكروز الغذائية" : "Macro-Nutrient Colors"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {colorSystem.macros.map((c) => (
                <div
                  key={c.name}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-3"
                >
                  <div className={`h-16 w-full rounded-xl ${c.bg} mb-3`} />
                  <span className="block text-sm font-bold">{c.label}</span>
                  <span className="block font-mono text-[10px] text-gray-500">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Semantic Variable Grids */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              {isArabic
                ? "المتغيرات الهيكلية والدلالية للمظهر"
                : "Theme Structural Variables"}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {colorSystem.theme.map((c) => (
                <div
                  key={c.name}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-3"
                >
                  <div className={`h-12 w-full rounded-xl ${c.bg} mb-2`}>
                    {c.name === "--foreground" && (
                      <span className="text-[10px]">Text</span>
                    )}
                  </div>
                  <span className="block truncate text-xs font-bold">
                    {c.label}
                  </span>
                  <span className="block font-mono text-[9px] text-gray-500">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHY */}
        <section className="mb-16 space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
              <Type className="text-primary size-5" />
            </div>
            <h2 className="text-2xl font-black">
              {isArabic ? "٢. نظام النصوص والخطوط" : "2. Typography Hierarchy"}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Headers Hierarchy */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                {isArabic ? "التسلسل الهرمي للعناوين" : "Headings Hierarchy"}
              </h3>
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-3">
                  <span className="mb-1 block font-mono text-[10px] text-gray-500">
                    H1 - Bold / Extrabold (text-4xl to 7xl)
                  </span>
                  <p className="text-4xl font-extrabold tracking-tight">
                    {isArabic
                      ? "الجمال يكمن في البساطة والدقة"
                      : "Beautiful & Precise Designs"}
                  </p>
                </div>
                <div className="border-b border-white/5 pb-3">
                  <span className="mb-1 block font-mono text-[10px] text-gray-500">
                    H2 - Black / Bold (text-2xl to 4xl)
                  </span>
                  <p className="text-2xl font-black">
                    {isArabic
                      ? "حاسبة السعرات الحرارية والماكروز"
                      : "Food Calorie Calculator"}
                  </p>
                </div>
                <div className="border-b border-white/5 pb-3">
                  <span className="mb-1 block font-mono text-[10px] text-gray-500">
                    H3 - Bold / Medium (text-xl to 2xl)
                  </span>
                  <p className="text-xl font-bold">
                    {isArabic
                      ? "تعديل المكونات والحصص الغذائية"
                      : "Adjust Portions & Nutrition Details"}
                  </p>
                </div>
                <div>
                  <span className="mb-1 block font-mono text-[10px] text-gray-500">
                    Body - Medium / Normal (text-sm to base)
                  </span>
                  <p className="text-text-body text-sm">
                    {isArabic
                      ? "هذا النص يوضح حجم الخط العادي المخصص للقراءة والفقرات الطويلة. الخط المختار يدعم العربية والإنجليزية بوضوح تام."
                      : "This is a standard body paragraph text showing visual reading scaling, spacing, line heights, and clarity."}
                  </p>
                </div>
              </div>
            </div>

            {/* Font Family comparison */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                {isArabic
                  ? "عائلات الخطوط المدعومة"
                  : "Typography & Font Families"}
              </h3>
              <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6">
                <div>
                  <h4 className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
                    Geist Sans (Latin/English)
                  </h4>
                  <p className="font-sans text-lg font-bold">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    1234567890 &hearts;
                  </p>
                </div>
                <hr className="border-white/5" />
                <div>
                  <h4 className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
                    Tajawal / Cairo (Arabic Font)
                  </h4>
                  <p className="font-arabic text-xl leading-relaxed font-bold">
                    أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
                    <br />
                    حاسبة ميزان الذكية للوجبات الغذائية والمحافظة على الصحة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SPACING SCALE */}
        <section className="mb-16 space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
              <Maximize className="text-primary size-5" />
            </div>
            <h2 className="text-2xl font-black">
              {isArabic ? "٣. سلم المسافات والتقسيم" : "3. Spacing Scale"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Spacing List */}
            <div className="space-y-3">
              {spacings.map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHoveredSpacing(s.name)}
                  onMouseLeave={() => setHoveredSpacing(null)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-300 ${
                    hoveredSpacing === s.name
                      ? "border-primary bg-primary/5 translate-x-2"
                      : "border-white/5 bg-white/5"
                  }`}
                >
                  <div>
                    <span className="block font-mono text-sm font-bold text-white">
                      var(--spacing-{s.name})
                    </span>
                    <span className="text-[10px] text-gray-500">{s.desc}</span>
                  </div>
                  <span className="text-primary rounded-lg bg-white/10 px-3 py-1 font-mono text-xs font-bold">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Visualizer */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#030d08] p-6">
              <div className="space-y-4">
                <span className="block text-xs font-bold tracking-widest text-gray-500 uppercase">
                  {isArabic
                    ? "معاينة المسافات المرئية"
                    : "Visualizing Spacing Scales"}
                </span>
                <div className="space-y-4 py-4">
                  {spacings.map((s) => {
                    const sizes = {
                      xs: "h-1 w-[4px]",
                      sm: "h-2 w-[8px]",
                      md: "h-4 w-[16px]",
                      lg: "h-6 w-[24px]",
                      xl: "h-8 w-[32px]",
                      xxl: "h-12 w-[48px]",
                    };
                    const isCurrent = hoveredSpacing === s.name;
                    return (
                      <div key={s.name} className="flex items-center gap-4">
                        <div className="w-28 font-mono text-[11px] text-gray-400">
                          {s.name} ({s.value})
                        </div>
                        <div className="flex-1">
                          <div
                            className={`rounded-full transition-all duration-300 ${
                              isCurrent
                                ? "bg-primary shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                                : "bg-white/20"
                            } ${sizes[s.name as keyof typeof sizes]}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[10px] leading-relaxed text-gray-500">
                {isArabic
                  ? "💡 نقوم باستخدام مضاعفات الرقم ٤ و ٨ للحفاظ على اتساق الصفحة وسلاسة القراءة بجميع الشاشات."
                  : "💡 Utilizing increments of 4px & 8px preserves logical layout blocks across multiple device dimensions."}
              </p>
            </div>
          </div>
        </section>

        {/* 4. BORDER RADIUS & SHADOWS */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          {/* Border Radii */}
          <div className="space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
                <LayoutGrid className="text-primary size-5" />
              </div>
              <h2 className="text-2xl font-black">
                {isArabic ? "٤. انحناء الحواف" : "4. Border Radius Scale"}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {radii.map((r) => (
                <div
                  key={r.name}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <span className="block font-mono text-xs font-bold text-white">
                        radius-{r.name}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {r.value}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`bg-primary/20 border-primary/40 flex h-16 w-full items-center justify-center border-2 ${r.class}`}
                  >
                    <span className="text-primary text-[10px] font-bold uppercase">
                      {r.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Depth & Elevation Shadows */}
          <div className="space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
                <Layers className="text-primary size-5" />
              </div>
              <h2 className="text-2xl font-black">
                {isArabic ? "٥. تأثيرات الظل والعمق" : "5. Depth & Shadows"}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-none transition-shadow duration-300">
                <span className="block font-mono text-xs text-gray-500">
                  shadow-none
                </span>
                <p className="mt-1 text-xs text-white">
                  Flat container - Used for low priority layouts
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-md">
                <span className="block font-mono text-xs text-gray-500">
                  shadow-md
                </span>
                <p className="mt-1 text-xs text-white">
                  Standard card shadow - Adds clean depth separation
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5 shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                <span className="block font-mono text-xs text-emerald-400">
                  shadow-glow (custom)
                </span>
                <p className="mt-1 text-xs text-white">
                  Brand glow shadow - Highlights active primary actions
                </p>
              </div>

              <div className="border-primary/20 bg-primary/10 shadow-glow-strong rounded-2xl border p-5">
                <span className="text-primary-glow block font-mono text-xs font-black">
                  shadow-glow-strong
                </span>
                <p className="mt-1 text-xs text-white">
                  Intense glowing element - High importance indicators
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE BUTTON COMPONENT GALLERY */}
        <section className="mb-16 space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
              <ShieldAlert className="text-primary size-5" />
            </div>
            <h2 className="text-2xl font-black">
              {isArabic
                ? "٦. الأزرار وعناصر التحكم تفاعلية"
                : "6. Button Component Gallery"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Button Variants */}
            <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6">
              <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {isArabic ? "أنواع وتصاميم الأزرار" : "Button Variants"}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gray-400">
                    {'variant="primary"'}
                  </span>
                  <Button variant="primary">Primary Button</Button>
                </div>
                <hr className="border-white/5" />
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gray-400">
                    {'variant="secondary"'}
                  </span>
                  <Button variant="secondary">Secondary Button</Button>
                </div>
                <hr className="border-white/5" />
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gray-400">
                    {'variant="outline"'}
                  </span>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <hr className="border-white/5" />
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gray-400">
                    {'variant="category"'}
                  </span>
                  <Button variant="category" isSelected={true}>
                    Category Active
                  </Button>
                </div>
              </div>
            </div>

            {/* Button Sizes & States */}
            <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6">
              <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {isArabic
                  ? "الأحجام والحالات الخاصة"
                  : "Sizes & Interactive States"}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">
                    {'size="sm"'}
                  </Button>
                  <Button variant="primary" size="md">
                    {'size="md"'}
                  </Button>
                  <Button variant="primary" size="lg">
                    {'size="lg"'}
                  </Button>
                </div>
                <hr className="border-white/5" />
                {/* <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary" size="xl">
                    {'size="xl"'} Large Action
                  </Button>
                </div> */}
                <hr className="border-white/5" />
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" isLoading={true}>
                    Loading State
                  </Button>
                  <Button variant="secondary" disabled={true}>
                    Disabled state
                  </Button>
                </div>
                <hr className="border-white/5" />
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    leftIcon={
                      isArabic ? (
                        <ArrowLeft className="size-4" />
                      ) : (
                        <ArrowRight className="size-4" />
                      )
                    }
                  >
                    Button with Icon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
