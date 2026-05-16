"use client";
import React from "react";
import { X, Scale, Plus } from "lucide-react";
import { Food } from "@/app/lib/data";
import MacroNutrientStats from "./PortionSelector/MacroNutrientStats";
import QuantitySelector from "./PortionSelector/QuantitySelector";
import PortionSizeOptions from "./PortionSelector/PortionSizeOptions";
import SelectedPortionPreview from "./PortionSelector/SelectedPortionPreview";
import { useFoodCalculator } from "@/app/hooks/useFoodCalculator";
import { Plate } from "@/app/store/usePlatesStore";

interface FoodCustomizerModalProps {
  food: Food | null;
  onClose: () => void;
  onConfirm: (calculatedFood: Plate) => void;
}

export default function FoodCustomizerModal({
  food,
  onClose,
  onConfirm,
}: FoodCustomizerModalProps) {
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
    handleSizeSelect,
  } = useFoodCalculator(food);

  if (!food || !calculated) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm duration-200 sm:items-center sm:p-4">
      <div className="animate-in slide-in-from-bottom w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-zinc-950 shadow-2xl duration-300 sm:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
        >
          <X className="size-5 text-gray-400" />
        </button>

        <div className="custom-scrollbar max-h-[85vh] space-y-3.5 overflow-y-auto p-5">
          <SelectedPortionPreview
            quantity={quantity}
            sizeLabel={currentSize?.label || "Custom"}
            foodName={food.name}
            nameAr={food.nameAr}
            totalAmount={amount * quantity}
            unit={presets[0]?.unit || "g"}
            isRaw={isRaw}
            calories={calculated.calories}
            icon={food?.icon}
          />

          <MacroNutrientStats
            protein={calculated.protein}
            carbs={calculated.carbs}
            fat={calculated.fat}
          />

          <div className="flex items-end gap-3">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              label="Portions"
              isCompact={true}
            />

            {food.isRawCookedToggle && (
              <div className="flex-1 space-y-1">
                <label className="ml-1 text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase">
                  Food State
                </label>
                <div className="flex h-10 items-center justify-between rounded-xl border border-white/5 bg-white/5 p-1">
                  <button
                    onClick={() => setIsRaw(false)}
                    className={`h-full flex-1 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all ${!isRaw ? "bg-primary text-secondary shadow-md" : "text-gray-500 hover:text-white"}`}
                  >
                    Cooked
                  </button>
                  <button
                    onClick={() => setIsRaw(true)}
                    className={`h-full flex-1 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all ${isRaw ? "bg-primary text-secondary shadow-md" : "text-gray-500 hover:text-white"}`}
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
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Scale className="group-focus-within:text-primary size-4 text-gray-500 transition-colors" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setSelectedSizeId("custom");
              }}
              placeholder="Custom..."
              className="focus:border-primary/50 w-full rounded-xl border border-white/5 bg-white/5 py-3 pr-12 pl-10 text-sm font-bold text-white transition-all outline-none focus:bg-white/10"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-xs font-bold text-gray-500 uppercase">
                {presets[0]?.unit || "g"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onConfirm(calculated)}
            className="from-primary hover:to-primary text-secondary group flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r to-emerald-600 py-4 text-sm font-black shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all hover:from-emerald-400 active:scale-[0.98]"
          >
            ADD TO PLATE
            <div className="bg-secondary/20 flex size-4 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5">
              <Plus className="size-2.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
