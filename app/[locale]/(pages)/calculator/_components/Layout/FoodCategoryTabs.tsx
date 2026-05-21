"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useScroller } from "@/app/hooks/useScroller";
import { category } from "@/app/lib/data";
import ScrollArrow from "@/app/components/common/ScrollArrow";
import { CheckIcon } from "lucide-react";
import Button from "@/app/components/common/Button";

interface FoodCategoryTabsProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function FoodCategoryTabs({
  selectedId,
  onSelect,
}: FoodCategoryTabsProps) {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const isArabic = locale === "ar";
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useScroller({ selectedId });

  // Filter categories to only keep popular ones + whichever category is currently active
  // (so if they click a grid category, it dynamically shows on the horizontal bar as active!)
  const visibleCategories = category.filter(
    (c) => c.popular || c.id === selectedId
  );

  // Grid categories are all non-popular ones
  const gridCategories = category.filter((c) => !c.popular);

  return (
    <div className="w-full">
      {/* Premium Swipe Tab-bar with Smooth Fade Overlays */}
      <div className="relative w-full">
        {/* Left Arrow & Fade Overlay */}
        <div
          className={`from-background via-background/90 pointer-events-none absolute top-0 bottom-2 left-0 z-10 flex items-center bg-gradient-to-r to-transparent pr-8 pl-2 transition-all duration-300 ${
            canScrollLeft
              ? "translate-x-0 opacity-100"
              : "-translate-x-2 opacity-0"
          }`}
        >
          <div className="pointer-events-auto">
            <ScrollArrow
              direction="left"
              visible={canScrollLeft}
              onClick={scrollLeft}
            />
          </div>
        </div>

        {/* Right Arrow & Fade Overlay */}
        <div
          className={`from-background via-background/90 pointer-events-none absolute top-0 right-0 bottom-2 z-10 flex items-center bg-gradient-to-l to-transparent pr-2 pl-8 transition-all duration-300 ${
            canScrollRight
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0"
          }`}
        >
          <div className="pointer-events-auto">
            <ScrollArrow
              direction="right"
              visible={canScrollRight}
              onClick={scrollRight}
            />
          </div>
        </div>

        {/* Horizontal Scrollable Row */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth pb-2"
          >
            {visibleCategories.map((item) => {
              const displayName = isArabic ? item.nameAr : item.name;
              return (
                <Button
                  key={item.id}
                  variant="category"
                  isSelected={selectedId === item.id}
                  onClick={() => onSelect(item.id)}
                  leftIcon={item.icon}
                  rightIcon={
                    selectedId === item.id ? (
                      <CheckIcon className="size-4" />
                    ) : undefined
                  }
                >
                  {displayName}
                </Button>
              );
            })}

            {/* 🔍 TOGGLER PILL: "+ المزيد ▾" / "✕ أقل ▴" */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex shrink-0 flex-row items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-black whitespace-nowrap transition-all active:scale-[0.97] ${
                isExpanded
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20"
                  : "border-white/5 bg-white/[0.02] text-gray-400 hover:border-white/10 hover:text-white"
              }`}
            >
              {isExpanded ? (
                <>
                  <span className="rotate-90 text-xs transition-transform duration-300">
                    ✕
                  </span>
                  <span>{t("less")}</span>
                  <span className="text-[10px]">▴</span>
                </>
              ) : (
                <>
                  <span className="text-xs transition-transform duration-300 group-hover:rotate-90">
                    +
                  </span>
                  <span>{t("more")}</span>
                  <span className="text-[10px]">▾</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 EXPANDED INLINE GRID DROPDOWN */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-4 grid grid-cols-4 gap-2 rounded-[1.5rem] border border-white/5 bg-[#0a1e16]/80 p-4 shadow-xl backdrop-blur-md duration-300">
          {gridCategories.map((item) => {
            const isSelected = selectedId === item.id;
            const displayName = isArabic ? item.nameAr : item.name;

            return (
              <Button
                key={item.id}
                variant="category"
                isSelected={selectedId === item.id}
                onClick={() => onSelect(item.id)}
                leftIcon={item.icon}
                rightIcon={
                  selectedId === item.id ? (
                    <CheckIcon className="size-4" />
                  ) : undefined
                }
                data-active={isSelected ? "true" : "false"}
              >
                {displayName}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
