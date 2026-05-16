import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (val: number) => void;
  label?: string;
  isCompact?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  label,
  isCompact = false,
}: QuantitySelectorProps) {
  return (
    <div className={`space-y-1 ${isCompact ? "flex-1" : "w-full"}`}>
      {label && (
        <div className="flex items-center justify-between px-1">
          <label className="text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase">
            {label}
          </label>
          {quantity > 1 && !isCompact && (
            <span className="text-primary text-[8px] font-black tracking-tighter">
              MULTI
            </span>
          )}
        </div>
      )}
      <div className="group focus-within:border-primary/30 flex h-10 items-center justify-between rounded-xl border border-white/5 bg-white/5 p-1 transition-all">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.max(1, quantity - 1));
          }}
          className="flex size-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
        >
          <Minus className="size-3.5" />
        </button>

        <div className="px-2 text-center">
          <span className="text-xl leading-none font-black text-white tabular-nums">
            {quantity}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(quantity + 1);
          }}
          className="bg-primary/20 border-primary/20 text-primary hover:bg-primary/30 flex size-8 items-center justify-center rounded-lg border shadow-sm transition-all active:scale-90"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
