"use client";
import React, { useState } from 'react';
import { X, Scale, Info } from 'lucide-react';
import { SIZE_PRESETS, Food, SizePreset } from '@/app/lib/data';
import { calculateNutrients } from '@/app/lib/calculatorUtils';
import NutrientDisplay from './PortionSelector/NutrientDisplay';
import QuantityStepper from './PortionSelector/QuantityStepper';
import SizePresets from './PortionSelector/SizePresets';
import PreviewCard from './PortionSelector/PreviewCard';

interface PortionSelectorProps {
  food: Food | null;
  onClose: () => void;
  onConfirm: (calculatedFood: any) => void;
}

export default function PortionSelector({ food, onClose, onConfirm }: PortionSelectorProps) {

  const [amount, setAmount] = useState<number>(100);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('small');
  const [isRaw, setIsRaw] = useState(false);
  const [quantity, setQuantity] = useState(1);
  if (!food) return null;

  const presets = SIZE_PRESETS[food.sizeType] || SIZE_PRESETS.FOOD;
  const currentSize = presets.find(p => p.id === selectedSizeId);

  // Calculation Logic
  const nutrients = calculateNutrients(food, amount, quantity, isRaw);

  const calculated = {
    ...food,
    ...nutrients,
    selectedAmount: amount,
    unit: presets[0]?.unit || 'g',
    isRaw,
    quantity
  };

  const handleSizeSelect = (size: SizePreset) => {
    setSelectedSizeId(size.id);
    setAmount(size.amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">

        {/* Header */}
        <div className="relative p-6 border-b border-white/5 bg-white/5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="size-5 text-gray-400" />
          </button>

          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-4xl shadow-inner">
              {food.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{food.name}</h2>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Info className="size-3" /> {food.caloriesPer100} kcal / 100{presets[0]?.unit}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">

          <PreviewCard
            quantity={quantity}
            sizeLabel={currentSize?.label || 'Custom'}
            foodName={food.name}
            totalAmount={amount * quantity}
            unit={presets[0]?.unit || 'g'}
            isRaw={isRaw}
            calories={calculated.calories}
          />

          <NutrientDisplay
            protein={calculated.protein}
            carbs={calculated.carbs}
            fat={calculated.fat}
          />

          <QuantityStepper
            quantity={quantity}
            onChange={setQuantity}
            label={`Number of ${food.sizeType === 'UNIT' ? 'Pieces' : 'Portions'}`}
          />

          {food.isRawCookedToggle && (
            <div className="flex items-center justify-between p-1 bg-white/5 rounded-xl border border-white/5">
              <button
                onClick={() => setIsRaw(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isRaw ? 'bg-primary text-secondary shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Cooked
              </button>
              <button
                onClick={() => setIsRaw(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isRaw ? 'bg-primary text-secondary shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Raw
              </button>
            </div>
          )}

          <SizePresets
            presets={presets}
            selectedId={selectedSizeId}
            onSelect={handleSizeSelect}
            label="Base Portion Size"
          />

          {/* Custom Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Scale className="size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setSelectedSizeId('custom');
              }}
              placeholder="Custom amount..."
              className="w-full bg-white/5 border border-white/5 focus:border-primary focus:bg-white/10 rounded-2xl py-4 pl-12 pr-16 text-white font-bold transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-gray-500 font-bold">{presets[0]?.unit || 'g'}</span>
            </div>
          </div>

          <button
            onClick={() => onConfirm(calculated)}
            className="w-full bg-primary hover:bg-primary/90 text-secondary font-black py-5 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all transform active:scale-[0.98]"
          >
            ADD TO PLATE dd
          </button>
        </div>
      </div>
    </div>
  );
}
