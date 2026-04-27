import React from 'react';
import { Scale } from 'lucide-react';

interface WeightInputProps {
  amount: number;
  unit?: string;
  label?: string;
  onChange: (amount: number) => void;
  className?: string;
}

export default function WeightInput({
  amount,
  unit = 'g',
  label = 'Custom',
  onChange,
  className = ''
}: WeightInputProps) {
  return (
    <div className={`flex-1 space-y-1.5 ${className}`}>
      <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">
        {label}
      </label>
      <div className="relative h-10">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Scale className="size-3.5 text-gray-500" />
        </div>
        <input
          type="number"
          min="1"
          value={amount || ''}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) {
              onChange(val);
            }
          }}
          className="w-full h-full bg-white/5 border border-white/5 focus:border-primary/50 rounded-xl pl-9 pr-8 text-white font-bold text-xs outline-none transition-all"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <span className="text-[9px] text-gray-500 font-bold uppercase">{unit}</span>
        </div>
      </div>
    </div>
  );
}
