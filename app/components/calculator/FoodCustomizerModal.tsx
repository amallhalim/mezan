"use client";
import React from 'react';
import { X, Scale, Plus } from 'lucide-react';
import { Food } from '@/app/lib/data';
import MacroNutrientStats from './PortionSelector/MacroNutrientStats';
import QuantitySelector from './PortionSelector/QuantitySelector';
import PortionSizeOptions from './PortionSelector/PortionSizeOptions';
import SelectedPortionPreview from './PortionSelector/SelectedPortionPreview';
import { useFoodCalculator } from '@/app/hooks/useFoodCalculator';

interface FoodCustomizerModalProps {
  food: Food | null;
  onClose: () => void;
  onConfirm: (calculatedFood: any) => void;
}

export default function FoodCustomizerModal({ food, onClose, onConfirm }: FoodCustomizerModalProps) {
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
    currentSize,
    calculated,
    handleSizeSelect
  } = useFoodCalculator(food);

  if (!food || !calculated) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="size-5 text-gray-400" />
        </button>

        <div className="p-5 space-y-3.5 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <SelectedPortionPreview
            quantity={quantity}
            sizeLabel={currentSize?.label || 'Custom'}
            foodName={food.name}
            nameAr={food.nameAr}
            totalAmount={amount * quantity}
            unit={presets[0]?.unit || 'g'}
            isRaw={isRaw}
            calories={calculated.calories}
            icon={food.icon}
          />

          <MacroNutrientStats
            protein={calculated.protein}
            carbs={calculated.carbs}
            fat={calculated.fat}
          />

          <div className="flex gap-3 items-end">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              label="Portions"
              isCompact={true}
            />

            {food.isRawCookedToggle && (
              <div className="flex-1 space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">Food State</label>
                <div className="flex items-center justify-between p-1 bg-white/5 rounded-xl border border-white/5 h-10">
                  <button
                    onClick={() => setIsRaw(false)}
                    className={`flex-1 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${!isRaw ? 'bg-primary text-secondary shadow-md' : 'text-gray-500 hover:text-white'}`}
                  >
                    Cooked
                  </button>
                  <button
                    onClick={() => setIsRaw(true)}
                    className={`flex-1 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isRaw ? 'bg-primary text-secondary shadow-md' : 'text-gray-500 hover:text-white'}`}
                  >
                    Raw
                  </button>
                </div>
              </div>
            )}
          </div>

          <PortionSizeOptions
            presets={presets}
            selectedId={selectedSizeId}
            onSelect={handleSizeSelect}
            label="Base Portion Size"
          />

          {/* Custom Input - More Compact */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Scale className="size-4 text-gray-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setSelectedSizeId('custom');
              }}
              placeholder="Custom..."
              className="w-full bg-white/5 border border-white/5 focus:border-primary/50 focus:bg-white/10 rounded-xl py-3 pl-10 pr-12 text-white font-bold text-sm transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-gray-500 font-bold text-xs uppercase">{presets[0]?.unit || 'g'}</span>
            </div>
          </div>

          <button
            onClick={() => onConfirm(calculated)}
            className="w-full bg-gradient-to-r from-primary to-[#059669] hover:from-[#10B981] hover:to-primary text-secondary font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group text-sm"
          >
            ADD TO PLATE
            <div className="size-4 rounded-full bg-secondary/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <Plus className="size-2.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
