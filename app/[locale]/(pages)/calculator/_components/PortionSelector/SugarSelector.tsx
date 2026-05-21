"use client";
import React from "react";

interface SugarSelectorProps {
  sugarCount: number;
  setSugarCount: (count: number) => void;
  sugarType: string;
  setSugarType: (type: string) => void;
}

const SUGAR_OPTIONS = [
  { id: "s1", label: "Normal", icon: "🥄" },
  { id: "s2", label: "Diet", icon: "🌿" },
  { id: "s3", label: "Honey", icon: "🍯" },
];

export default function SugarSelector({
  sugarCount,
  setSugarCount,
  sugarType,
  setSugarType,
}: SugarSelectorProps) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 space-y-3 rounded-3xl border border-white/5 bg-white/5 p-4 duration-300">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Sugar Addition
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSugarCount(Math.max(0, sugarCount - 1))}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
          >
            -
          </button>
          <span className="text-primary w-8 text-center text-sm font-black tabular-nums">
            {sugarCount}
          </span>
          <button
            onClick={() => setSugarCount(sugarCount + 1)}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
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
            className={`flex-1 rounded-2xl border py-2.5 text-[10px] font-black tracking-tight uppercase transition-all ${
              sugarType === s.id
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                : "border-transparent bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="mb-0.5 block text-lg">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
      {sugarCount > 0 && (
        <div className="flex items-center justify-center gap-1.5 py-1">
          <div className="bg-primary/40 size-1 animate-pulse rounded-full" />
          <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase">
            {sugarCount} spoon(s){" "}
            {SUGAR_OPTIONS.find((o) => o.id === sugarType)?.label} added
          </p>
          <div className="bg-primary/40 size-1 animate-pulse rounded-full" />
        </div>
      )}
    </div>
  );
}
