"use client";
import React from "react";

interface Macro {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface UnifiedMacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
  size?: number;
}

export default function UnifiedMacroChart({
  protein,
  carbs,
  fat,
  size = 160,
}: UnifiedMacroChartProps) {
  const total = protein + carbs + fat || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const macros: Macro[] = [
    {
      label: "Protein",
      value: protein,
      color: "var(--success)",
      percentage: (protein / total) * 100,
    },
    {
      label: "Carbs",
      value: carbs,
      color: "var(--warning)",
      percentage: (carbs / total) * 100,
    },
    {
      label: "Fat",
      value: fat,
      color: "var(--error)",
      percentage: (fat / total) * 100,
    },
  ];

  let currentOffset = 0;

  return (
    <div className="animate-in fade-in zoom-in flex flex-col items-center duration-700">
      <div className="group relative" style={{ width: size, height: size }}>
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

        <svg
          className="size-full -rotate-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          viewBox="0 0 140 140"
        >
          <defs>
            {macros.map((m, i) => (
              <filter key={`glow-${i}`} id={`glow-${i}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            ))}
          </defs>

          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="14"
          />

          {macros.map((macro, i) => {
            const dashArray = (macro.percentage / 100) * circumference;
            const strokeOffset = -currentOffset;
            currentOffset += dashArray;

            return (
              <circle
                key={i}
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={macro.color}
                strokeWidth="14"
                strokeDasharray={`${dashArray} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 5px ${macro.color}88)`,
                  opacity: macro.percentage > 0 ? 1 : 0,
                }}
              />
            );
          })}
        </svg>

        {/* Center Text with Inner Shadow */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex size-[75%] flex-col items-center justify-center rounded-full border border-white/5 bg-zinc-950 shadow-inner">
            <span className="mb-1 text-[8px] leading-none font-black tracking-[0.3em] text-gray-500 uppercase">
              Balance
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black tracking-tighter text-white">
                100
              </span>
              <span className="text-primary text-[10px] font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid w-full grid-cols-3 gap-6">
        {macros.map((macro, i) => (
          <div key={i} className="group flex flex-col items-center">
            <div className="mb-1.5 flex items-center gap-2">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: macro.color }}
              />
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                {macro.label}
              </span>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-1.5 transition-all group-hover:bg-white/10">
              <span className="text-sm font-black text-white">
                {macro.value}
                <span className="ml-0.5 text-[8px] text-gray-500">g</span>
              </span>
            </div>
            <span className="mt-1 text-[8px] font-bold text-gray-600">
              {Math.round(macro.percentage)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
