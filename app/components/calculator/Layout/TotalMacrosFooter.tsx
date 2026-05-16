"use client";
import React from "react";
import { Zap, ChevronRight } from "lucide-react";

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
        stroke="rgba(255,255,255,0.05)"
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
  const calPct = Math.min((totals.calories / GOALS.calories) * 100, 100);
  const isOver = totals.calories > GOALS.calories;
  const isNear = calPct >= 80 && !isOver;

  const calColor = isOver ? "var(--error)" : "var(--primary)";
  const calGlow = isOver ? "var(--error)" : "var(--primary-glow)";

  const R = 22,
    CIRC = 2 * Math.PI * R;
  const calDash = (calPct / 100) * CIRC;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 md:px-4 pb-4 md:pb-5 pt-2 bg-gradient-to-t from-background via-background/90 to-transparent">
      <div className="container mx-auto max-w-2xl">
        <div
          onClick={onClick}
          role="button"
          aria-label="Calculate Meal Summary"
          className="relative group bg-card/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden transition-all hover:bg-card/80 cursor-pointer"
          style={{
            boxShadow: `0 0 0 1px var(--border), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px oklch(from ${calGlow} l c h / 0.12)`,
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-6 right-6 h-px shimmer-horizontal opacity-30" />

          {/* Calorie progress bar — ultra thin */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/[0.04] overflow-hidden rounded-t-3xl">
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

          <div className="flex items-center gap-3 md:gap-5 px-4 md:px-6 py-2.5 md:py-4">
            {/* ── Big calorie donut ── */}
            <div className="relative shrink-0 flex items-center justify-center size-12 md:size-16">
              {isNear && (
                <span
                  className="absolute inset-0 rounded-full border animate-ping opacity-10"
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
                  stroke="rgba(255,255,255,0.04)"
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
                <Zap className="size-4 md:size-5 fill-current" />
              </div>
            </div>

            {/* ── Calorie numbers ── */}
            <div className="flex flex-col shrink-0">
              <span
                className="text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase mb-0.5"
                style={{
                  color: isOver ? "var(--error)" : "rgba(255,255,255,0.3)",
                }}
              >
                {isOver ? "⚠ OVER" : "Calories"}
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  aria-label="Total Calories"
                  className="text-xl md:text-[2rem] font-black leading-none tabular-nums tracking-tighter"
                  style={{ color: calColor, textShadow: `0 0 20px ${calGlow}` }}
                >
                  {totals.calories}
                </span>
                <span className="text-[10px] font-bold text-white/20 hidden md:inline">
                  /{GOALS.calories}
                </span>
              </div>
              <span className="text-[8px] md:text-[9px] font-black tracking-widest uppercase mt-0.5 opacity-40 hidden md:block">
                {Math.max(GOALS.calories - totals.calories, 0)} kcal left
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 md:h-12 bg-white/5 mx-0.5 md:mx-1 shrink-0" />

            {/* ── Macro rings ── */}
            <div className="flex-1 flex items-center justify-around gap-2 md:gap-4 overflow-hidden">
              {MACROS.map((m) => {
                const val = totals[m.key];
                const goal = GOALS[m.key];
                const pct = Math.min((val / goal) * 100, 100);

                return (
                  <div
                    key={m.key}
                    className="flex flex-col items-center gap-1 md:gap-1.5 shrink-0"
                  >
                    <div className="relative flex items-center justify-center size-9 md:size-12">
                      <ArcRing
                        percent={pct}
                        color={m.color}
                        glow={m.glow}
                        size={48}
                        stroke={3}
                      />
                      <div className="absolute flex items-center justify-center">
                        <span
                          className="text-[10px] md:text-[11px] font-black leading-none tabular-nums"
                          style={{ color: m.color }}
                        >
                          {Math.round(val)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[7px] md:text-[8px] font-black tracking-[0.1em] uppercase opacity-40">
                      {m.short}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── CTA button ── */}
            <div className="shrink-0 flex items-center justify-center size-9 md:size-11 rounded-xl md:rounded-2xl transition-all duration-200 group-hover:bg-primary/20 bg-white/5 border border-white/10">
              <ChevronRight className="size-4 md:size-5 text-white/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
