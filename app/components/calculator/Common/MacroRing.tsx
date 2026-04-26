"use client";
import React from 'react';

interface MacroRingProps {
  percentage: number;
  color: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function MacroRing({ 
  percentage, 
  color, 
  icon, 
  label, 
  value,
  size = 'md' 
}: MacroRingProps) {
  
  const sizeMap = {
    sm: { box: 'size-14', svg: 16, radius: 14, stroke: 3, font: 'text-[7px]', valFont: 'text-xs' },
    md: { box: 'size-20', svg: 20, radius: 17, stroke: 4, font: 'text-[8px]', valFont: 'text-sm' },
    lg: { box: 'size-24', svg: 24, radius: 21, stroke: 6, font: 'text-[10px]', valFont: 'text-xl' },
  };

  const s = sizeMap[size];
  const circumference = 2 * Math.PI * s.radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center relative group hover:bg-white/10 transition-all flex-1 min-w-0">
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
        <div className="absolute inset-0 flex items-center justify-center scale-75">
          {icon}
        </div>
      </div>
      <span className={`font-black text-gray-500 uppercase tracking-widest leading-none ${s.font} mb-1`}>{label}</span>
      <span className={`font-black text-white tabular-nums leading-none ${s.valFont}`}>
        {value}<span className="text-[7px] text-gray-600 ml-0.5 font-bold">g</span>
      </span>
    </div>
  );
}
