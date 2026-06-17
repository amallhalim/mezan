"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { Zap, ChevronRight } from "lucide-react";
import { formatNumber } from "@/app/lib/numberUtils";

interface TotalMacrosFooterProps {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  onClick?: () => void;
}

const GOALS = { calories: 2500, protein: 150, carbs: 300, fat: 80 };

const MACROS = [
  {
    key: "protein" as const,
    label: "Protein",
    short: "PRO",
    color: "var(--protein)",
    glow: "oklch(from var(--protein) l c h / 0.4)",
  },
  {
    key: "carbs" as const,
    label: "Carbs",
    short: "CRB",
    color: "var(--carbs)",
    glow: "oklch(from var(--carbs) l c h / 0.4)",
  },
  {
    key: "fat" as const,
    label: "Fat",
    short: "FAT",
    color: "var(--fat)",
    glow: "oklch(from var(--fat) l c h / 0.4)",
  },
];

function ArcRing({
  percent,
  color,
  glow,
  size = 48,
  stroke = 3.5,
}: {
  percent: number;
  color: string;
  glow: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(percent, 100) / 100) * circ;
  const cx = size / 2,
    cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)" }}
      className="shrink-0"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={stroke}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 4px ${glow})`,
          transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </svg>
  );
}

export default function TotalMacrosFooter({
  totals,
  onClick,
}: TotalMacrosFooterProps) {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const calPct = Math.min((totals.calories / GOALS.calories) * 100, 100);
  const isOver = totals.calories > GOALS.calories;
  const isNear = calPct >= 80 && !isOver;

  const calColor = isOver ? "var(--error)" : "var(--primary)";
  const calGlow = isOver ? "var(--error)" : "var(--primary-glow)";

  const R = 22,
    CIRC = 2 * Math.PI * R;
  const calDash = (calPct / 100) * CIRC;

  return (
    <div className="from-background via-background/90 fixed right-0 bottom-0 left-0 z-40 bg-gradient-to-t to-transparent px-3 pt-2 pb-4 md:px-4 md:pb-5">
      <div className="container mx-auto max-w-2xl">
        <div
          onClick={onClick}
          role="button"
          aria-label="Calculate Meal Summary"
          className="group bg-card/60 hover:bg-card/80 border-border relative cursor-pointer overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-all"
          style={{
            boxShadow: `0 0 0 1px var(--border), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px oklch(from ${calGlow} l c h / 0.12)`,
          }}
        >
          {/* Top shimmer line */}
          <div className="shimmer-horizontal absolute top-0 right-6 left-6 h-px opacity-30" />

          {/* Calorie progress bar — ultra thin */}
          <div className="bg-surface-elevated absolute top-0 right-0 left-0 h-[3px] overflow-hidden rounded-t-3xl">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${calPct}%`,
                background: isOver
                  ? "linear-gradient(90deg, var(--error), var(--warning))"
                  : "linear-gradient(90deg, var(--primary), var(--primary-glow))",
                boxShadow: `0 0 12px ${calColor}`,
              }}
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 md:gap-5 md:px-6 md:py-4">
            {/* ── Big calorie donut ── */}
            <div className="relative flex size-12 shrink-0 items-center justify-center md:size-16">
              {isNear && (
                <span
                  className="absolute inset-0 animate-ping rounded-full border opacity-10"
                  style={{ borderColor: calColor }}
                />
              )}
              <svg
                viewBox="0 0 64 64"
                className="absolute size-full"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="32"
                  cy="32"
                  r={R}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="5"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={R}
                  fill="none"
                  stroke={calColor}
                  strokeWidth="5"
                  strokeDasharray={`${calDash} ${CIRC}`}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 8px ${calGlow})`,
                    transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              </svg>
              <div
                className="relative flex flex-col items-center justify-center"
                style={{ color: calColor }}
              >
                <Zap className="size-4 fill-current md:size-5" />
              </div>
            </div>

            {/* ── Calorie numbers ── */}
            <div className="flex shrink-0 flex-col">
              <span
                className="mb-0.5 text-[8px] font-black tracking-[0.2em] uppercase md:text-[9px]"
                style={{
                  color: isOver ? "var(--error)" : "var(--text-dim)",
                }}
              >
                {isOver ? t("overLimit") : t("calories")}
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  aria-label="Total Calories"
                  className="text-xl leading-none font-black tracking-tighter tabular-nums md:text-[2rem]"
                  style={{ color: calColor, textShadow: `0 0 20px ${calGlow}` }}
                >
                  {formatNumber(totals.calories, locale)}
                </span>
                <span className="text-text-dim text-[10px] font-bold">
                  /{formatNumber(GOALS.calories, locale)}
                </span>
              </div>
              <span className="mt-0.5 text-[8px] font-black tracking-widest uppercase opacity-40 md:text-[9px]">
                {t("kcalLeft", {
                  count: formatNumber(
                    Math.max(GOALS.calories - totals.calories, 0),
                    locale
                  ),
                })}
              </span>
            </div>

            {/* Divider */}
            <div className="bg-border mx-0.5 h-8 w-px shrink-0 md:mx-1 md:h-12" />

            {/* ── Macro rings ── */}
            <div className="flex flex-1 items-center justify-around gap-2 overflow-hidden md:gap-4">
              {MACROS.map((m) => {
                const val = totals[m.key];
                const goal = GOALS[m.key];
                const pct = Math.min((val / goal) * 100, 100);

                return (
                  <div
                    key={m.key}
                    className="flex shrink-0 flex-col items-center gap-1 md:gap-1.5"
                  >
                    <div className="relative flex size-9 items-center justify-center md:size-12">
                      <ArcRing
                        percent={pct}
                        color={m.color}
                        glow={m.glow}
                        size={48}
                        stroke={3}
                      />
                      <div className="absolute flex items-center justify-center">
                        <span
                          className="text-[10px] leading-none font-black tabular-nums md:text-[11px]"
                          style={{ color: m.color }}
                        >
                          {formatNumber(Math.round(val), locale)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[7px] font-black tracking-[0.1em] uppercase opacity-40 md:text-[8px]">
                      {t(m.key)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── CTA button ── */}
            <div className="group-hover:bg-primary/20 border-border bg-surface-elevated flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 md:size-11 md:rounded-2xl">
              <ChevronRight className="group-hover:text-primary text-text-dim size-4 transition-all group-hover:translate-x-0.5 md:size-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
