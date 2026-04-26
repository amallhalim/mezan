import React from 'react';
import { Search, Activity, Zap, ChevronRight } from 'lucide-react';
import FoodCategoryTabs from '@/app/components/calculator/Layout/FoodCategoryTabs';

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
  setSelectedCategory
}: CalculatorHeaderProps) {
  return (
    <header className="mb-8">
      {/* Brand row */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="relative flex items-center justify-center size-9 rounded-xl bg-primary/10 border border-primary/20">
              <Activity className="text-primary size-4" />
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-[11px] font-black tracking-[0.25em] text-primary/60 uppercase">Mezan</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
            Macro
            <span className="text-primary ml-2">Calc</span>
            <span className="text-white/10 ml-2">.</span>
          </h1>
        </div>

        {selectedFoodListLength > 0 && (
          <button
            onClick={() => setShowMealSummary(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-4 py-2.5 transition-all group"
          >
            <Zap className="size-3.5 text-primary" />
            <span className="text-xs font-black text-white">{selectedFoodListLength} foods</span>
            <ChevronRight className="size-3.5 text-gray-600 group-hover:text-white transition-colors" />
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-primary transition-colors duration-200 z-10" />
          <input
            type="text"
            placeholder="Search 1000+ foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.06]
              border border-white/[0.06] focus:border-primary/40
              rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600
              font-medium transition-all duration-200 outline-none text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-gray-400 hover:text-white text-xs font-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className={`transition-all duration-300 overflow-hidden ${searchQuery ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
        <FoodCategoryTabs selectedId={selectedCategory} onSelect={setSelectedCategory} />
      </div>
    </header>
  );
}
