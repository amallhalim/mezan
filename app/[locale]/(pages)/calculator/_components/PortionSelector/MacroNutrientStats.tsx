"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Zap, Flame, Droplets } from "lucide-react";

interface MacroNutrientStatsProps {
  protein: number;
  carbs: number;
  fat: number;
  isCompact?: boolean;
}

export default function MacroNutrientStats({
  protein,
  carbs,
  fat,
  isCompact = false,
}: MacroNutrientStatsProps) {
  const t = useTranslations("HomePage");
  const total = protein + carbs + fat || 1;

  const macros = [
    {
      label: t("proteins"),
      value: protein,
      color: "var(--protein)",
      icon: <Zap className="size-3" />,
      percentage: (protein / total) * 100,
    },
    {
      label: t("carbs"),
      value: carbs,
      color: "var(--carbs)",
      icon: <Flame className="size-3" />,
      percentage: (carbs / total) * 100,
    },
    {
      label: t("fat"),
      value: fat,
      color: "var(--fat)",
      icon: <Droplets className="size-3" />,
      percentage: (fat / total) * 100,
    },
  ];

  return (
    <div className={`grid grid-cols-3 gap-2 ${isCompact ? "mb-4" : "mb-6"}`}>
      {macros.map((macro, i) => (
        <div
          key={i}
          className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-2.5 transition-all hover:bg-white/10"
        >
          <div
            className="mb-1.5 flex items-center gap-1"
            style={{ color: macro.color }}
          >
            {macro.icon}
            <span className="text-[8px] font-black tracking-widest uppercase">
              {macro.label}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base leading-none font-black text-white tabular-nums">
              {macro.value}
              <span className="ml-0.5 text-[8px] font-bold text-gray-500 lowercase">
                g
              </span>
            </span>
            <span className="mt-0.5 text-[7px] font-bold tracking-tighter text-gray-600 uppercase">
              {Math.round(macro.percentage)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
