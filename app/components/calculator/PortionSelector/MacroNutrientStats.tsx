"use client";
import React from 'react';
import { Zap, Flame, Droplets } from 'lucide-react';

interface MacroNutrientStatsProps {
  protein: number;
  carbs: number;
  fat: number;
  isCompact?: boolean;
}

export default function MacroNutrientStats({ protein, carbs, fat, isCompact = false }: MacroNutrientStatsProps) {
  const total = protein + carbs + fat || 1;
  
  const macros = [
    { label: 'Protein', value: protein, color: 'text-emerald-400', icon: <Zap className="size-3" />, percentage: (protein / total) * 100 },
    { label: 'Carbs', value: carbs, color: 'text-amber-400', icon: <Flame className="size-3" />, percentage: (carbs / total) * 100 },
    { label: 'Fat', value: fat, color: 'text-rose-400', icon: <Droplets className="size-3" />, percentage: (fat / total) * 100 },
  ];

  return (
    <div className={`grid grid-cols-3 gap-2 ${isCompact ? 'mb-4' : 'mb-6'}`}>
      {macros.map((macro, i) => (
        <div key={i} className="bg-white/5 rounded-2xl p-2.5 border border-white/5 flex flex-col items-center justify-center group hover:bg-white/10 transition-all">
          <div className={`flex items-center gap-1 mb-1.5 ${macro.color}`}>
            {macro.icon}
            <span className="text-[8px] font-black uppercase tracking-widest">{macro.label}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-black text-white leading-none tabular-nums">
              {macro.value}
              <span className="text-[8px] text-gray-500 ml-0.5 lowercase font-bold">g</span>
            </span>
            <span className="text-[7px] font-bold text-gray-600 mt-0.5 uppercase tracking-tighter">
              {Math.round(macro.percentage)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
