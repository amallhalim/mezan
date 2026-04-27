"use client";
import React from 'react';
import { Trash2, Edit2, RotateCcw } from 'lucide-react';
import Button from '../Common/Button';

interface AddedFoodsSummaryProps {
  items: any[];
  onRemove: (index: number) => void;
  onEdit: (item: any, index: number) => void;
  onClearAll: () => void;
}

export default function AddedFoodsSummary({ items, onRemove, onEdit, onClearAll }: AddedFoodsSummaryProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Your Plate ({items.length})</h2>
        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 text-[10px] font-black text-rose-500/60 hover:text-rose-500 transition-colors uppercase tracking-widest"
        >
          <RotateCcw className="size-3" />
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={`${item?.id}-${idx}`}
            className="group relative flex items-center justify-between bg-white/5 hover:bg-white/[0.08] p-4 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all animate-in slide-in-from-right duration-500"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div
              className="flex items-center gap-4 flex-1 cursor-pointer"
              onClick={() => onEdit(item, idx)}
            >
              <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {item?.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-black text-sm">{item?.name}</p>
                  <Edit2 className="size-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-tight mt-0.5">
                  {item?.quantity > 1 ? <span className="text-primary">{item?.quantity}x </span> : ''}
                  {item?.selectedAmount}{item?.unit} • {item?.isRaw ? 'Raw' : 'Cooked'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-primary font-black text-base tabular-nums leading-none">
                  {item?.calories}
                </p>
                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">kcal</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                className="size-8 rounded-xl bg-rose-500/5 flex items-center justify-center text-gray-600 hover:bg-rose-500/10 hover:text-rose-500 transition-all active:scale-90"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
