"use client";
import React from 'react';
import { X, Share2, MessageSquare, Send, Copy, Zap, Flame } from 'lucide-react';
import UnifiedMacroChart from '../Common/UnifiedMacroChart';

interface ResultModalProps {
  item: any;
  onClose: () => void;
}

export default function ResultModal({ item, onClose }: ResultModalProps) {
  if (!item) return null;

  const shareOptions = [
    { name: 'X', icon: <Send className="size-4" />, color: 'bg-twitter/10 text-twitter' },
    { name: 'FB', icon: <Share2 className="size-4" />, color: 'bg-facebook/10 text-facebook' },
    { name: 'WA', icon: <MessageSquare className="size-4" />, color: 'bg-whatsapp/10 text-whatsapp' },
    { name: 'Copy', icon: <Copy className="size-4" />, color: 'bg-white/10 text-white' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-zinc-950 w-full max-w-md rounded-[3rem] p-8 border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden animate-in zoom-in-95 duration-500">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[120px] pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-6 top-6 size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-90"
        >
          <X className="size-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="size-2.5 text-primary fill-primary" />
            </div>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Smart Summary</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Flame className="size-6 text-primary animate-pulse" />
            <h2 className="text-6xl font-black text-white tracking-tighter tabular-nums">
              {item?.calories}
            </h2>
            <span className="text-gray-500 font-black text-[10px] uppercase tracking-widest mt-4">kcal</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-4 border border-white/5 flex items-center justify-between mb-6 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-lg border border-white/5">
              {item?.icon}
            </div>
            <div className="text-left">
              <h4 className="text-white font-black text-base leading-tight">{item?.name}</h4>
              <p className="text-primary/60 font-bold text-[10px]" dir="rtl">{item?.nameAr}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-white font-black text-xs">{item?.selectedAmount}</span>
            <span className="text-gray-500 font-bold text-[9px] uppercase ml-1">{item?.unit}</span>
          </div>
        </div>

        {/* Unified Smart Macro Chart - Sized down */}
        <div className="mb-6">
          <UnifiedMacroChart
            protein={item?.protein}
            carbs={item?.carbs}
            fat={item?.fat}
            size={140}
          />
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="grid grid-cols-4 gap-3">
            {shareOptions.map((opt) => (
              <button key={opt.name} className={`${opt.color} flex flex-col items-center justify-center py-4 rounded-2xl border border-transparent hover:border-white/10 transition-all active:scale-95 group`}>
                <div className="group-hover:scale-110 transition-transform">
                  {opt.icon}
                </div>
                <span className="text-[10px] font-black mt-2 uppercase tracking-tighter opacity-60">{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
