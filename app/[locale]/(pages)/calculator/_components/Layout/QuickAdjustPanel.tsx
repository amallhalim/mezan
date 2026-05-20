"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { X, Calculator } from "lucide-react";
import { Food } from "@/app/lib/data";
import { formatNumber } from "@/app/lib/numberUtils";
import { useFoodCalculator } from "@/app/hooks/useFoodCalculator";
import Button from "@/app/components/common/Button";
import { Plate } from "@/app/store/usePlatesStore";
import PresetSelector from "./PresetSelector";
import SugarSelector from "./SugarSelector";

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
    <div
      aria-label="Food details"
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-300"
    >
      {/* Premium Forest-Green Card Dialog */}
      <div className="animate-in zoom-in-95 w-100 rounded-[2.5rem] border border-emerald-500/10 bg-[#04120c] p-6 shadow-2xl shadow-emerald-950/20 duration-300">
        {/* Header Row (Close left, details middle, icon right in RTL) */}
        <div className="mb-6 flex items-center justify-between gap-4">
          {/* Food Icon Card */}
          <div className="flex size-14 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-500/5 text-3xl shadow-inner shadow-emerald-500/10">
            {food?.icon}
          </div>

          {/* Title & Subtitle */}
          <div className="flex-1 text-right">
            <h3 className="text-xl leading-tight font-black text-white">
              {displayName}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-emerald-400">
              {isRaw ? t("raw") : t("cooked")}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Controls Column */}
        <div className="space-y-4">
          {/* 1. Food State (حالة الطعام) Row */}
          {food.isRawCookedToggle && (
            <div className="flex items-center justify-between border-b border-white/5 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-gray-300">
                  {t("foodState")}
                </span>
              </div>

              {/* Toggle Switch */}
              <div className="flex h-10 w-44 items-center rounded-xl border border-white/5 bg-white/[0.02] p-1">
                <button
                  onClick={() => setIsRaw(true)}
                  className={`h-full flex-1 rounded-lg text-xs font-black transition-all ${
                    isRaw
                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-sm"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {t("raw")}
                </button>
                <button
                  onClick={() => setIsRaw(false)}
                  className={`h-full flex-1 rounded-lg text-xs font-black transition-all ${
                    !isRaw
                      ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {t("cooked")}
                </button>
              </div>
            </div>
          )}

          {/* 2. Quantity (الكمية) Row */}
          <div className="space-y-4 border-b border-white/5 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-gray-300">
                  {t("quantity")}
                </span>
              </div>
            </div>

            {/* Custom Weight Input */}
            <div className="relative flex h-14 w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 transition-all focus-within:border-emerald-500/30">
              <span className="text-lg font-black text-emerald-500 select-none">
                {calculated.unit}
              </span>
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setAmount(val);
                  setSelectedSizeId("custom");
                }}
                className="w-1/2 bg-transparent text-right text-2xl font-black text-white placeholder:text-gray-600 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Preset Servings Picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-gray-600">
                  {t("orChoosePreset")}
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              {/* Horizontal Presets List */}
              <PresetSelector
                presets={presets}
                selectedSizeId={selectedSizeId}
                onSizeSelect={handleSizeSelect}
              />
            </div>

            {/* Sugar Selection for Drinks (Beautiful Forest Green style) */}
            {food.sizeType === "DRINK" &&
              sugarCount !== undefined &&
              setSugarCount &&
              sugarType !== undefined &&
              setSugarType && (
                <SugarSelector
                  sugarCount={sugarCount}
                  setSugarCount={setSugarCount}
                  sugarType={sugarType}
                  setSugarType={setSugarType}
                  locale={locale}
                />
              )}
          </div>

          {/* 3. Number of Servings (عدد الحصص) Row */}
          <div className="space-y-3 border-b border-white/5 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-gray-300">
                  {t("servingsNumber")}
                </span>
              </div>
            </div>

            {/* Serving Counter */}
            <div className="flex h-16 w-full items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-full w-16 items-center justify-center rounded-xl bg-white/5 text-xl font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                —
              </button>

              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">
                  {formatNumber(quantity, locale)}
                </span>
                <span className="text-[10px] font-black text-emerald-500">
                  {t("servingUnit")}
                </span>
              </div>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-full w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* 4. Calories Summary Section */}
          <div className="space-y-1 py-2">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <span className="block text-xs font-black text-gray-400">
                  {t("totalCalories")}
                </span>
                <span className="text-[10px] font-bold text-gray-500">
                  {t("servingUnit")} · {isRaw ? t("raw") : t("cooked")}{" "}
                  {formatNumber(quantity, locale)} x{" "}
                  {formatNumber(amount, locale)}
                  {calculated.unit}
                </span>
              </div>

              <div className="flex items-baseline gap-1 text-emerald-400">
                <span className="text-4xl font-black tabular-nums">
                  {formatNumber(calculated.calories * quantity, locale)}
                </span>
                <span className="text-xs font-bold">{t("kcal")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-4 flex gap-4">
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
