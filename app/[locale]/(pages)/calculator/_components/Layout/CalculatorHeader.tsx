import { useTranslations, useLocale } from "next-intl";
import { formatNumber } from "@/app/lib/numberUtils";
import React from "react";
import { Search, Activity, Utensils } from "lucide-react";
import FoodCategoryTabs from "./FoodCategoryTabs";
import { useTheme } from "@/app/context/ThemeContext";
import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";
interface CalculatorHeaderProps {
  selectedFoodListLength: number;
  setShowCart?: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
}

export default function CalculatorHeader({
  selectedFoodListLength,
  setShowCart = () => {},
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: CalculatorHeaderProps) {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();

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
          <h1 className="text-text-heading text-4xl leading-none font-black tracking-tighter">
            Macro
            <span className="text-primary ml-2">Calc</span>
            <span className="text-foreground/10 ml-2">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="border-border bg-surface text-foreground hover:bg-surface-elevated flex items-center justify-center rounded-xl border px-4 py-2 text-sm transition-all"
          >
            {t("mode")}: {theme}
          </button>

          {selectedFoodListLength > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="group border-border bg-surface hover:bg-surface-elevated relative flex size-12 items-center justify-center rounded-2xl border transition-all hover:scale-105"
            >
              <Utensils className="text-primary size-5" />
              <span className="bg-primary text-secondary absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full text-[11px] font-black shadow-lg">
                {formatNumber(selectedFoodListLength, locale)}
              </span>
            </button>
          )}
        </div>
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
            className="focus:border-primary/40 border-border bg-surface text-foreground placeholder:text-text-dim hover:bg-surface-elevated focus:bg-surface-elevated w-full rounded-2xl border py-4 pr-4 pl-12 text-sm font-medium transition-all duration-200 outline-none"
          />
          {searchQuery && (
            <button
              data-testid="search-close-button"
              onClick={() => setSearchQuery("")}
              className="bg-surface-elevated text-foreground hover:bg-primary hover:text-secondary absolute top-1/2 right-4 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-xs font-black transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div
        className={`overflow-hidden transition-all duration-500 ${searchQuery ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"}`}
      >
        <FoodCategoryTabs
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
    </header>
  );
}
