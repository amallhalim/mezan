import { CheckIcon, Plus } from "lucide-react";
import React from "react";
import { Food } from "@/app/lib/data";
import { useTranslations, useLocale } from "next-intl";

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
  const locale = useLocale();
  const isArabic = locale === "ar";
  const displayName = isArabic ? food?.nameAr : food?.name;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select ${displayName}`}
      onClick={() => onSelect(food)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(food)}
      className={`group hover:border-primary/50 relative m-1 flex cursor-pointer flex-row items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-all hover:bg-white/10 ${isSelected ? "bg-primary/10 border-primary/40" : ""}`}
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
              {food?.caloriesPer100}{" "}
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
                P: {food?.proteinPer100}g
              </span>
              <span className="flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: "var(--carbs)" }}
                />{" "}
                C: {food?.carbsPer100}g
              </span>
              <span className="flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: "var(--fat)" }}
                />{" "}
                F: {food?.fatPer100}g
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
          className={`flex size-8 items-center justify-center rounded-full transition-all ${isSelected ? "bg-primary text-secondary" : "group-hover:bg-primary/20 group-hover:text-primary bg-white/10 text-gray-400"}`}
        >
          {isSelected ? (
            <CheckIcon className="size-5" />
          ) : (
            <Plus className="size-5" />
          )}
        </div>
      </div>
    </div>
  );
}
