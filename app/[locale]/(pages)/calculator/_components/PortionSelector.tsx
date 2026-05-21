"use client";
import React, { useState } from "react";
import { X, Scale, Info } from "lucide-react";
import { SIZE_PRESETS, Food, SizePreset } from "@/app/lib/data";
import { Plate } from "@/app/store/usePlatesStore";
import { calculateNutrients } from "@/app/lib/calculatorUtils";
import MacroNutrientStats from "./PortionSelector/MacroNutrientStats";
import QuantitySelector from "./PortionSelector/QuantitySelector";
import PortionSizeOptions from "./PortionSelector/PortionSizeOptions";
import SelectedPortionPreview from "./PortionSelector/SelectedPortionPreview";

interface PortionSelectorProps {
  food: Food | null;
  onClose: () => void;
  onConfirm: (calculatedFood: Plate) => void;
}

export default function PortionSelector({
  food,
  onClose,
  onConfirm,
}: PortionSelectorProps) {
  const [amount, setAmount] = useState<number>(100);
  const [selectedSizeId, setSelectedSizeId] = useState<string>("small");
  const [isRaw, setIsRaw] = useState(false);
  const [quantity, setQuantity] = useState(1);
  if (!food) return null;

  const presets = SIZE_PRESETS[food.sizeType] || SIZE_PRESETS.FOOD;
  const currentSize = presets.find((p) => p.id === selectedSizeId);

  // Calculation Logic
  const nutrients = calculateNutrients(food, amount, quantity, isRaw);

  const calculated: Plate = {
    ...food,
    ...nutrients,
    id: food.id,
    selectedAmount: amount,
    unit: presets[0]?.unit || "g",
    isRaw,
    quantity,
  };

  const handleSizeSelect = (size: SizePreset) => {
    setSelectedSizeId(size.id);
    setAmount(size.amount);
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm duration-200 sm:items-center sm:p-4">
      <div className="animate-in slide-in-from-bottom w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-zinc-950 shadow-2xl duration-300 sm:rounded-3xl">
        {/* Header */}
        <div className="relative border-b border-white/5 bg-white/5 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
          >
            <X className="size-5 text-gray-400" />
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-primary/20 flex size-16 items-center justify-center rounded-2xl text-4xl shadow-inner">
              {food?.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{food.name}</h2>
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <Info className="size-3" /> {food.caloriesPer100} kcal / 100
                {presets[0]?.unit}
              </p>
            </div>
          </div>
        </div>

        <div className="custom-scrollbar max-h-[80vh] space-y-6 overflow-y-auto p-6">
          <SelectedPortionPreview
            quantity={quantity}
            sizeLabel={currentSize?.label || "Custom"}
            foodName={food.name}
            nameAr={food.nameAr}
            totalAmount={amount * quantity}
            unit={presets[0]?.unit || "g"}
            isRaw={isRaw}
            calories={calculated.calories}
            icon={food.icon}
          />

          <MacroNutrientStats
            protein={calculated.protein}
            carbs={calculated.carbs}
            fat={calculated.fat}
          />

          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            label={`Number of ${food.sizeType === "UNIT" ? "Pieces" : "Portions"}`}
          />

          {food.isRawCookedToggle && (
            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-1">
              <button
                onClick={() => setIsRaw(false)}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${!isRaw ? "bg-primary text-secondary shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                Cooked
              </button>
              <button
                onClick={() => setIsRaw(true)}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${isRaw ? "bg-primary text-secondary shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                Raw
              </button>
            </div>
          )}

          <PortionSizeOptions
            presets={presets}
            selectedId={selectedSizeId}
            onSelect={handleSizeSelect}
            label="Base Portion Size"
          />

          {/* Custom Input */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Scale className="group-focus-within:text-primary size-5 text-gray-500 transition-colors" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setSelectedSizeId("custom");
              }}
              placeholder="Custom amount..."
              className="focus:border-primary w-full rounded-2xl border border-white/5 bg-white/5 py-4 pr-16 pl-12 font-bold text-white transition-all outline-none focus:bg-white/10"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="font-bold text-gray-500">
                {presets[0]?.unit || "g"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onConfirm(calculated)}
            className="bg-primary hover:bg-primary/90 text-secondary w-full transform rounded-2xl py-5 font-black shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
          >
            ADD TO PLATE dd
          </button>
        </div>
      </div>
    </div>
  );
}
