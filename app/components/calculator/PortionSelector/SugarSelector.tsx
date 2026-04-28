"use client";
import React from 'react';

interface SugarSelectorProps {
  sugarCount: number;
  setSugarCount: (count: number) => void;
  sugarType: string;
  setSugarType: (type: string) => void;
}

const SUGAR_OPTIONS = [
  { id: 's1', label: 'Normal', icon: '🥄' },
  { id: 's2', label: 'Diet', icon: '🌿' },
  { id: 's3', label: 'Honey', icon: '🍯' }
];

export default function SugarSelector({
  sugarCount,
  setSugarCount,
  sugarType,
  setSugarType
}: SugarSelectorProps) {
  return (
    <div className="space-y-3 p-4 bg-white/5 rounded-3xl border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sugar Addition</label>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSugarCount(Math.max(0, sugarCount - 1))}
            className="size-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all"
          >
            -
          </button>
          <span className="text-sm font-black text-primary w-8 text-center tabular-nums">{sugarCount}</span>
          <button 
            onClick={() => setSugarCount(sugarCount + 1)}
            className="size-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {SUGAR_OPTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSugarType(s.id)}
            className={`flex-1 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border ${
              sugarType === s.id 
                ? 'bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                : 'bg-white/5 border-transparent text-gray-500 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="block text-lg mb-0.5">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
      {sugarCount > 0 && (
        <div className="flex items-center justify-center gap-1.5 py-1">
          <div className="size-1 rounded-full bg-primary/40 animate-pulse" />
          <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
            {sugarCount} spoon(s) {SUGAR_OPTIONS.find(o => o.id === sugarType)?.label} added
          </p>
          <div className="size-1 rounded-full bg-primary/40 animate-pulse" />
        </div>
      )}
    </div>
  );
}
