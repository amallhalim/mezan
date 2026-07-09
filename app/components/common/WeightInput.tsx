import React from "react";
import { Scale } from "lucide-react";

/**
 * Props for the WeightInput component.
 */
interface WeightInputProps {
  /** The current numeric weight amount. */
  amount: number;
  /** The unit of measurement (e.g., 'g', 'kg'). Defaults to 'g'. */
  unit?: string;
  /** The label displayed above the input. Defaults to 'Custom'. */
  label?: string;
  /** Callback fired when a valid numeric value is entered. */
  onChange: (amount: number) => void;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A specialized numeric input component for weight measurements.
 * Features an integrated scale icon, unit suffix, and automatic value capping.
 */
export default function WeightInput({
  amount,
  unit = "g",
  label = "Custom",
  onChange,
  className = "",
}: WeightInputProps) {
  return (
    <div className={`flex-1 space-y-1.5 ${className}`}>
      <label className="ml-1 text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase">
        {label}
      </label>
      <div className="relative h-10">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <Scale className="size-3.5 text-gray-500" />
        </div>
        <input
          type="number"
          min="1"
          max="5000"
          value={amount || ""}
          onChange={(e) => {
            let val = Number(e.target.value);
            // FR-009: Cap at 5000g
            if (val > 5000) val = 5000;
            if (val >= 0) {
              onChange(val);
            }
          }}
          className="focus:border-primary/50 h-full w-full rounded-xl border border-white/5 bg-white/5 pr-8 pl-9 text-xs font-bold text-white transition-all outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <span className="text-[9px] font-bold text-gray-500 uppercase">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
