"use client";
import React from "react";
import { useTranslations } from "next-intl";

interface FoodStateSelectorProps {
  isRaw: boolean;
  setIsRaw: (isRaw: boolean) => void;
}

export default function FoodStateSelector({
  isRaw,
  setIsRaw,
}: FoodStateSelectorProps) {
  const t = useTranslations("HomePage");

  return (
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
  );
}
