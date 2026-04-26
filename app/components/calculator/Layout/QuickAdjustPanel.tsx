"use client";
import React from 'react';
import { X, Calculator, Scale } from 'lucide-react';
import { Food } from '@/app/lib/data';
import { useFoodCalculator } from '@/app/hooks/useFoodCalculator';
import PortionSizeOptions from '@/app/components/calculator/PortionSelector/PortionSizeOptions';
import QuantitySelector from '@/app/components/calculator/PortionSelector/QuantitySelector';

import MacroNutrientStats from '@/app/components/calculator/PortionSelector/MacroNutrientStats';
import Button from '@/app/components/Common/Button';

interface QuickAdjustPanelProps {
  food: Food;
  onClose: () => void;
  onAdd: (calculated: any) => void;
  onPreview: (calculated: any) => void;
  isEditing?: boolean;
  initialValues?: any;
}

export default function QuickAdjustPanel({ 
  food, 
  onClose, 
  onAdd, 
  onPreview,
  isEditing = false,
  initialValues
}: QuickAdjustPanelProps) {
  const {
    amount,
    setAmount,
    selectedSizeId,
    setSelectedSizeId,
    isRaw,
    setIsRaw,
    quantity,
    setQuantity,
    presets,
    calculated,
    handleSizeSelect
  } = useFoodCalculator(food, initialValues);

  if (!calculated) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-[#161B21]/95 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] p-6 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">

        {/* Pull Handle (Visual only) */}
        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
              {food.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white leading-tight">{food.name}</h3>
                <span className="text-primary/60 font-bold text-sm" dir="rtl">{food.nameAr}</span>
              </div>
              <p className="text-primary font-black text-[10px] uppercase tracking-widest opacity-80">
                {amount}{calculated.unit} • {isRaw ? 'RAW' : 'COOKED'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-4xl font-black text-primary leading-none tabular-nums drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                {calculated.calories}
              </span>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">kcal</p>
            </div>
            <button
              onClick={onClose}
              className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Live Macros Reveal */}
        <MacroNutrientStats
          protein={calculated.protein}
          carbs={calculated.carbs}
          fat={calculated.fat}
          isCompact={true}
        />

        {/* Controls Row */}
        <div className="space-y-4 mb-6">
          <PortionSizeOptions
            presets={presets}
            selectedId={selectedSizeId}
            onSelect={handleSizeSelect}
            label="Quick Portions"
          />

          <div className="flex gap-4 items-end">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              label="Multiplier"
              isCompact={true}
            />

            {food.isRawCookedToggle && (
              <div className="flex-1 space-y-1.5">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">State</label>
                <div className="flex items-center justify-between p-1 bg-white/5 rounded-xl border border-white/5 h-10">
                  <button
                    onClick={() => setIsRaw(false)}
                    className={`flex-1 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${!isRaw ? 'bg-primary text-secondary' : 'text-gray-500 hover:text-white'}`}
                  >
                    Cooked
                  </button>
                  <button
                    onClick={() => setIsRaw(true)}
                    className={`flex-1 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isRaw ? 'bg-primary text-secondary' : 'text-gray-500 hover:text-white'}`}
                  >
                    Raw
                  </button>
                </div>
              </div>
            )}


          </div>

          {/* Compact Custom Input */}
          <div className="flex-1 space-y-1.5">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">Custom</label>
            <div className="relative h-10">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Scale className="size-3.5 text-gray-500" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setSelectedSizeId('custom');
                }}
                className="w-full h-full bg-white/5 border border-white/5 focus:border-primary/50 rounded-xl pl-9 pr-8 text-white font-bold text-xs outline-none transition-all"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-[9px] text-gray-500 font-bold uppercase">{calculated.unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => onAdd(calculated)}
          >
            {isEditing ? 'UPDATE ITEM' : 'ADD TO PLATE'}
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="flex-[1.5]"
            leftIcon={<Calculator className="size-5" />}
            onClick={() => onPreview(calculated)}
          >
            {isEditing ? 'SAVE & PREVIEW' : 'PREVIEW RESULT'}
          </Button>
        </div>
      </div>
    </div>
  );
}
