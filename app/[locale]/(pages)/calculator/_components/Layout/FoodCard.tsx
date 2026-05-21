import { CheckIcon, Plus } from "lucide-react";
import React from "react";
import { Food } from "@/app/lib/data";
import { useTranslations, useLocale } from "next-intl";
import { formatNumber } from "@/app/lib/numberUtils";
import { usePlatesStore } from "@/app/store/usePlatesStore";

interface FoodCardProps {
  food: Food;
  onSelect: (food: Food) => void;
  isSelected: boolean;
}

export default function FoodCard({
  food,
  onSelect,
  isSelected,
}: FoodCardProps) {
  const t = useTranslations("about");
  const tHome = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const displayName = isArabic ? food?.nameAr : food?.name;

  const plates = usePlatesStore((state) => state.plates);
  const isAdded = plates.some((p) => p.id === food.id);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select ${displayName}`}
      onClick={() => onSelect(food)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(food)}
      className={`group hover:border-primary/50 relative m-1 flex cursor-pointer flex-row items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-all hover:bg-white/10 ${isSelected ? "ring-primary/60 border-primary/60 bg-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-2" : ""} ${isAdded && !isSelected ? "border-emerald-500/20 bg-emerald-500/5" : ""}`}
    >
      <div className="flex items-center gap-4">
        {food?.icon && (
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 text-2xl shadow-inner transition-transform group-hover:scale-110">
            {food?.icon}
          </div>
        )}

        <div className="flex flex-col">
          <h3 className="text-base leading-tight font-black text-white">
            {displayName}
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <span className="text-primary text-sm font-bold">
              {formatNumber(food?.caloriesPer100, locale)}{" "}
              <span className="text-[10px] tracking-tighter uppercase opacity-70">
                {t("kcal")}
              </span>
            </span>
            <div className="flex gap-2 text-[10px] font-bold text-gray-500 uppercase">
              <span className="flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: "var(--protein)" }}
                />{" "}
                {tHome("proteinAbbr")}:{" "}
                {formatNumber(food?.proteinPer100, locale)}g
              </span>
              <span className="flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: "var(--carbs)" }}
                />{" "}
                {tHome("carbsAbbr")}: {formatNumber(food?.carbsPer100, locale)}g
              </span>
              <span className="flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: "var(--fat)" }}
                />{" "}
                {tHome("fatAbbr")}: {formatNumber(food?.fatPer100, locale)}g
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-bold text-gray-500 uppercase">
            {t("per100g")}
          </p>
        </div>
        <div
          role="button"
          aria-label="Add food"
          tabIndex={0}
          onClick={() => onSelect(food)}
          className={`flex size-8 items-center justify-center rounded-full transition-all ${isAdded ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "group-hover:bg-primary/20 group-hover:text-primary bg-white/10 text-gray-400"}`}
        >
          {isAdded ? (
            <CheckIcon
              data-testid="added-icon"
              aria-label="added"
              className="size-5"
            />
          ) : (
            <Plus role="icon" aria-label="add" className="size-5" />
          )}
        </div>
      </div>
    </div>
  );
}
