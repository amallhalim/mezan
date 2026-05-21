import React from "react";
import { SizePreset } from "@/app/lib/data";

interface PortionSizeOptionsProps {
  presets: SizePreset[];
  selectedId: string;
  onSelect: (preset: SizePreset) => void;
  label?: string;
}

export default function PortionSizeOptions({
  presets,
  selectedId,
  onSelect,
  label = "Select Portion",
}: PortionSizeOptionsProps) {
  return (
    <div className="space-y-1.5">
      <label className="ml-1 text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase">
        {label}
      </label>
      <div className="grid grid-cols-5 gap-1.5">
        {presets.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={`flex flex-col items-center justify-center rounded-xl border px-1 py-2 transition-all ${
              selectedId === size.id
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <span className="mb-0.5 text-base">{size.icon}</span>
            <span className="text-[8px] leading-none font-black tracking-tighter uppercase">
              {size.label}
            </span>
            <span className="mt-0.5 text-[8px] opacity-50">
              {size.amount}
              {size.unit}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
