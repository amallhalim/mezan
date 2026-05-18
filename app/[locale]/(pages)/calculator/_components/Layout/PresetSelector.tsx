"use client";
import React from "react";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SizePreset } from "@/app/lib/data";
import { useScroller } from "@/app/hooks/useScroller";
import ScrollArrow from "@/app/components/common/ScrollArrow";

interface PresetSelectorProps {
  presets: SizePreset[];
  selectedSizeId: string;
  onSizeSelect: (preset: SizePreset) => void;
}

export default function PresetSelector({
  presets,
  selectedSizeId,
  onSizeSelect,
}: PresetSelectorProps) {
  const t = useTranslations("HomePage");

  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useScroller({ selectedId: selectedSizeId });

  return (
    <div className="group relative">
      {/* Left/Right Scroll Arrows */}
      <div className="absolute top-1/2 -left-3 z-10 -translate-y-1/2">
        <ScrollArrow
          direction="left"
          visible={canScrollLeft}
          onClick={scrollLeft}
        />
      </div>
      <div className="absolute top-1/2 -right-3 z-10 -translate-y-1/2">
        <ScrollArrow
          direction="right"
          visible={canScrollRight}
          onClick={scrollRight}
        />
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {presets.map((preset) => {
          const isSelected = selectedSizeId === preset.id;
          const presetLabel = t(preset.id);

          return (
            <button
              key={preset.id}
              data-active={isSelected}
              onClick={() => onSizeSelect(preset)}
              className={`flex min-w-[76px] flex-col items-center justify-center rounded-2xl border px-4 py-2.5 transition-all ${
                isSelected
                  ? "scale-[0.98] border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "border-white/5 bg-white/[0.02] text-gray-400 hover:border-white/10 hover:text-white"
              }`}
            >
              <span className="text-[11px] font-bold">
                {isSelected ? <CheckIcon className="size-4" /> : presetLabel}
              </span>
              <span className="text-[9px] opacity-75">
                {preset.amount}
                {preset.unit}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
