import { useTranslations, useLocale } from "next-intl";
import { formatNumber } from "@/app/lib/numberUtils";
import React from "react";
import { Search, Activity, Zap, ChevronRight } from "lucide-react";
import FoodCategoryTabs from "./FoodCategoryTabs";

interface CalculatorHeaderProps {
  selectedFoodListLength: number;
  setShowMealSummary: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
}

export default function CalculatorHeader({
  selectedFoodListLength,
  setShowMealSummary,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: CalculatorHeaderProps) {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <header className="mb-8">
      {/* Brand row */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="bg-primary/10 border-primary/20 relative flex size-9 items-center justify-center rounded-xl border">
              <Activity className="text-primary size-4" />
              <span className="bg-primary absolute -top-0.5 -right-0.5 size-2 animate-pulse rounded-full" />
            </div>
            <span className="text-primary/60 text-[11px] font-black tracking-[0.25em] uppercase">
              Mezan
            </span>
          </div>
          <h1 className="text-4xl leading-none font-black tracking-tighter text-white">
            Macro
            <span className="text-primary ml-2">Calc</span>
            <span className="ml-2 text-white/10">.</span>
          </h1>
        </div>

        {selectedFoodListLength > 0 && (
          <button
            onClick={() => setShowMealSummary(true)}
            className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:bg-white/10"
          >
            <Zap className="text-primary size-3.5" />
            <span className="text-xs font-black text-white">
              {formatNumber(selectedFoodListLength, locale)} {t("foods")}
            </span>
            <ChevronRight className="size-3.5 text-gray-600 transition-colors group-hover:text-white" />
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <div className="bg-primary/5 absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity group-focus-within:opacity-100" />
        <div className="group relative">
          <Search className="group-focus-within:text-primary absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-gray-500 transition-colors duration-200" />
          <input
            type="text"
            data-testid="search-input"
            aria-label={t("searchPlaceholder")}
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:border-primary/40 w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] py-4 pr-4 pl-12 text-sm font-medium text-white transition-all duration-200 outline-none placeholder:text-gray-600 hover:bg-white/[0.06] focus:bg-white/[0.06]"
          />
          {searchQuery && (
            <button
              data-testid="search-close-button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-4 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xs font-black text-gray-400 transition-all hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div
        className={`overflow-hidden transition-all duration-300 ${searchQuery ? "max-h-0 opacity-0" : "max-h-24 opacity-100"}`}
      >
        <FoodCategoryTabs
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
    </header>
  );
}
