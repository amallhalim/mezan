"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { formatNumber } from "@/app/lib/numberUtils";

interface SugarSelectorProps {
  sugarCount: number;
  setSugarCount: (count: number) => void;
  sugarType: string;
  setSugarType: (type: string) => void;
  locale: string;
}

export default function SugarSelector({
  sugarCount,
  setSugarCount,
  sugarType,
  setSugarType,
  locale,
}: SugarSelectorProps) {
  const t = useTranslations("HomePage");

  return (
    <div className="mt-4 space-y-3 rounded-[2rem] border border-emerald-500/5 bg-white/[0.01] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-black text-emerald-400">
            ?
          </span>
          <span className="text-xs font-black text-gray-300">
            {t("addSugar")}
          </span>
        </div>

        {/* Spoon Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSugarCount(Math.max(0, sugarCount - 1))}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-black text-emerald-400 tabular-nums">
            {formatNumber(sugarCount, locale)}
          </span>
          <button
            onClick={() => setSugarCount(sugarCount + 1)}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      {/* Sugar Options Pills */}
      <div className="flex gap-2">
        {[
          { id: "s1", icon: "🥄" },
          { id: "s2", icon: "🌿" },
          { id: "s3", icon: "🍯" },
        ].map((s) => {
          const isActive = sugarType === s.id;
          const label = t(s.id);
          return (
            <button
              key={s.id}
              onClick={() => setSugarType(s.id)}
              className={`flex-1 rounded-2xl border py-2.5 text-[11px] font-black transition-all ${
                isActive
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "border-white/5 bg-white/[0.02] text-gray-400 hover:border-white/10 hover:text-white"
              }`}
            >
              <span className="mb-0.5 block text-lg">{s.icon}</span>
              {label}
            </button>
          );
        })}
      </div>

      {sugarCount > 0 && (
        <div className="flex items-center justify-center gap-1.5 py-1">
          <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-[10px] font-bold text-emerald-400">
            {t("addedSugarMsg", {
              count: formatNumber(sugarCount, locale),
              type: t(sugarType),
            })}
          </p>
          <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
        </div>
      )}
    </div>
  );
}
