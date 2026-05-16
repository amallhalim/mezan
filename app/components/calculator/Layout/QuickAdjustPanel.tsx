"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { X, Calculator } from "lucide-react";
import { Food } from "@/app/lib/data";
import { formatNumber } from "@/app/lib/numberUtils";
import { useFoodCalculator } from "@/app/hooks/useFoodCalculator";
import PortionSizeOptions from "@/app/components/calculator/PortionSelector/PortionSizeOptions";
import QuantitySelector from "@/app/components/calculator/PortionSelector/QuantitySelector";

import MacroNutrientStats from "@/app/components/calculator/PortionSelector/MacroNutrientStats";
import Button from "@/app/components/common/Button";
import WeightInput from "@/app/components/shared/WeightInput";
import SugarSelector from "@/app/components/calculator/PortionSelector/SugarSelector";
import { Plate } from "@/app/store/usePlatesStore";

interface QuickAdjustPanelProps {
  food: Food;
  onClose: () => void;
  onAdd: (calculated: Plate) => void;
  onPreview: (calculated: Plate) => void;
  isEditing?: boolean;
  initialValues?: Partial<Plate>;
}

export default function QuickAdjustPanel({
  food,
  onClose,
  onAdd,
  onPreview,
  isEditing = false,
  initialValues,
}: QuickAdjustPanelProps) {
  const t = useTranslations("HomePage");
  const tAbout = useTranslations("about");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const displayName = isArabic ? food.nameAr : food.name;
  const {
    amount,
    setAmount,
    selectedSizeId,
    setSelectedSizeId,
    isRaw,
    setIsRaw,
    quantity,
    setQuantity,
    sugarCount,
    setSugarCount,
    sugarType,
    setSugarType,
    presets,
    calculated,
    handleSizeSelect,
  } = useFoodCalculator(food, initialValues);

  if (!calculated) return null;

  return (
    <div className="animate-in slide-in-from-bottom-10 fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 duration-500">
      <div className="w-100 rounded-[2.5rem] border border-white/10 bg-zinc-900/95 p-6 backdrop-blur-2xl">
        {/* Pull Handle (Visual only) */}
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/10" />

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-3xl shadow-inner transition-transform group-hover:scale-110">
              {food?.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl leading-tight font-black text-white">
                  {displayName}
                </h3>
              </div>
              <p className="text-primary text-[10px] font-black tracking-widest uppercase opacity-80">
                {formatNumber(amount, locale)}
                {calculated.unit} • {isRaw ? t("raw") : t("cooked")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-primary text-4xl leading-none font-black tabular-nums drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                {formatNumber(calculated.calories, locale)}
              </span>
              <p className="text-[10px] font-black tracking-tighter text-gray-500 uppercase">
                {tAbout("kcal")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 transition-colors hover:text-white"
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
        <div className="mb-6 space-y-4">
          <PortionSizeOptions
            presets={presets}
            selectedId={selectedSizeId}
            onSelect={handleSizeSelect}
            label={t("quickPortions")}
          />

          <div className="flex items-end gap-4">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              label={t("multiplier")}
              isCompact={true}
            />

            {food.isRawCookedToggle && (
              <div className="flex-1 space-y-1.5">
                <label className="ml-1 text-[9px] font-black tracking-[0.15em] text-gray-500 uppercase">
                  {t("state")}
                </label>
                <div className="flex h-10 items-center justify-between rounded-xl border border-white/5 bg-white/5 p-1">
                  <button
                    onClick={() => setIsRaw(false)}
                    className={`h-full flex-1 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all ${!isRaw ? "bg-primary text-secondary" : "text-gray-500 hover:text-white"}`}
                  >
                    {t("cooked")}
                  </button>
                  <button
                    onClick={() => setIsRaw(true)}
                    className={`h-full flex-1 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all ${isRaw ? "bg-primary text-secondary" : "text-gray-500 hover:text-white"}`}
                  >
                    {t("raw")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sugar Selection for Drinks */}
          {food.sizeType === "DRINK" && (
            <SugarSelector
              sugarCount={sugarCount}
              setSugarCount={setSugarCount}
              sugarType={sugarType}
              setSugarType={setSugarType}
            />
          )}

          {/* Compact Custom Input */}
          <WeightInput
            amount={amount}
            unit={calculated.unit}
            label={t("custom")}
            onChange={(val) => {
              setAmount(val);
              setSelectedSizeId("custom");
            }}
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => onAdd(calculated)}>
            {isEditing ? t("updateItem") : t("addToPlate")}
          </Button>

          <Button
            variant="primary"
            leftIcon={<Calculator className="size-5" />}
            onClick={() => onPreview(calculated)}
          >
            {isEditing ? t("savePreview") : t("previewResult")}
          </Button>
        </div>
      </div>
    </div>
  );
}
