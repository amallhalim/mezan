import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (val: number) => void;
  label?: string;
  isCompact?: boolean;
}

export default function QuantitySelector({ quantity, onChange, label, isCompact = false }: QuantitySelectorProps) {
  return (
    <div className={`space-y-1 ${isCompact ? 'flex-1' : 'w-full'}`}>
      {label && (
        <div className="flex items-center justify-between px-1">
          <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em]">{label}</label>
          {quantity > 1 && !isCompact && (
            <span className="text-[8px] font-black text-primary tracking-tighter">MULTI</span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between bg-white/5 p-1 rounded-xl border border-white/5 group focus-within:border-primary/30 transition-all h-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onChange(Math.max(1, quantity - 1)); }}
          className="size-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <Minus className="size-3.5" />
        </button>
        
        <div className="text-center px-2">
          <span className="text-xl font-black text-white leading-none tabular-nums">{quantity}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onChange(quantity + 1); }}
          className="size-8 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-all active:scale-90 shadow-sm"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
