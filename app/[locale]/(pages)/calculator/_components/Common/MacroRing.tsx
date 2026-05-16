"use client";
import React from "react";

interface MacroRingProps {
  percentage: number;
  color: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  size?: "sm" | "md" | "lg";
}

export default function MacroRing({
  percentage,
  color,
  icon,
  label,
  value,
  size = "md",
}: MacroRingProps) {
  const sizeMap = {
    sm: {
      box: "size-14",
      svg: 16,
      radius: 14,
      stroke: 3,
      font: "text-[7px]",
      valFont: "text-xs",
    },
    md: {
      box: "size-20",
      svg: 20,
      radius: 17,
      stroke: 4,
      font: "text-[8px]",
      valFont: "text-sm",
    },
    lg: {
      box: "size-24",
      svg: 24,
      radius: 21,
      stroke: 6,
      font: "text-[10px]",
      valFont: "text-xl",
    },
  };

  const s = sizeMap[size];
  const circumference = 2 * Math.PI * s.radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="group relative flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10">
      <div className={`relative ${s.box} mb-1.5`}>
        <svg className="size-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={s.radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={s.stroke}
            className="text-white/5"
          />
          <circle
            cx="50%"
            cy="50%"
            r={s.radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={s.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex scale-75 items-center justify-center">
          {icon}
        </div>
      </div>
      <span
        className={`leading-none font-black tracking-widest text-gray-500 uppercase ${s.font} mb-1`}
      >
        {label}
      </span>
      <span
        className={`leading-none font-black text-white tabular-nums ${s.valFont}`}
      >
        {value}
        <span className="ml-0.5 text-[7px] font-bold text-gray-600">g</span>
      </span>
    </div>
  );
}
