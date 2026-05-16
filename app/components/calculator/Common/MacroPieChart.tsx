"use client";
import React from "react";

interface MacroPieChartProps {
  protein: number;
  carbs: number;
  fat: number;
  size?: number;
}

export default function MacroPieChart({
  protein,
  carbs,
  fat,
  size = 120,
}: MacroPieChartProps) {
  // Calculate percentages based on grams (standard for simple view)
  // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
  const proteinKcal = protein * 4;
  const carbsKcal = carbs * 4;
  const fatKcal = fat * 9;
  const totalKcal = proteinKcal + carbsKcal + fatKcal;

  if (totalKcal === 0)
    return (
      <div
        className="flex items-center justify-center bg-white/5 rounded-full border border-white/10"
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] text-gray-600 font-black uppercase">
          Empty
        </span>
      </div>
    );

  const pPerc = (proteinKcal / totalKcal) * 100;
  const cPerc = (carbsKcal / totalKcal) * 100;
  const fPerc = (fatKcal / totalKcal) * 100;

  // SVG Pie Chart logic
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  const slices = [
    { percent: pPerc / 100, color: "var(--protein)" },
    { percent: cPerc / 100, color: "var(--carbs)" },
    { percent: fPerc / 100, color: "var(--fat)" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-4">
      <svg
        viewBox="-1 -1 2 2"
        style={{ width: size, height: size, transform: "rotate(-90deg)" }}
        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        {slices.map((slice, i) => {
          if (slice.percent === 0) return null;

          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += slice.percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
          const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
          ].join(" ");

          return (
            <path
              key={i}
              d={pathData}
              fill={slice.color}
              className="transition-all duration-500 hover:opacity-80"
            />
          );
        })}
        {/* Inner hole for donut style */}
        <circle cx="0" cy="0" r="0.75" fill="#09090b" />
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center gap-1">
          <div
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "var(--protein)" }}
          />
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">
            Prot {Math.round(pPerc)}%
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "var(--carbs)" }}
          />
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">
            Carb {Math.round(cPerc)}%
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "var(--fat)" }}
          />
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">
            Fat {Math.round(fPerc)}%
          </span>
        </div>
      </div>
    </div>
  );
}
