"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { Trash2, Edit2, RotateCcw } from "lucide-react";
import { Plate } from "@/app/store/usePlatesStore";
import { formatNumber } from "@/app/lib/numberUtils";

interface AddedFoodsSummaryProps {
  items: Plate[];
  onRemove: (index: number) => void;
  onEdit: (item: Plate, index: number) => void;
  onClearAll: () => void;
}

export default function AddedFoodsSummary({
  items,
  onRemove,
  onEdit,
  onClearAll,
}: AddedFoodsSummaryProps) {
  const t = useTranslations("HomePage");
  const tAbout = useTranslations("about");
  const locale = useLocale();
  const isArabic = locale === "ar";

  if (items.length === 0) return null;

  return (
    <div className="animate-in fade-in space-y-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">
          {t("yourPlate")} ({formatNumber(items.length, locale)})
        </h2>
        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-rose-500/60 uppercase transition-colors hover:text-rose-500"
        >
          <RotateCcw className="size-3" />
          {t("clearAll")}
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={`${item?.id}-${idx}`}
            className={`group animate-in ${isArabic ? "slide-in-from-left" : "slide-in-from-right"} relative flex items-center justify-between rounded-[1.5rem] border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-all duration-500 hover:border-white/10 hover:bg-white/[0.08]`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div
              className="flex flex-1 cursor-pointer items-center gap-4"
              onClick={() => onEdit(item, idx)}
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 text-2xl shadow-inner transition-transform group-hover:scale-110">
                {item?.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-white">
                    {isArabic ? item?.nameAr : item?.name}
                  </p>
                  <Edit2 className="text-primary size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-0.5 text-[10px] font-black tracking-tight text-gray-500 uppercase">
                  {(item?.quantity ?? 0) > 1 ? (
                    <span className="text-primary">
                      {formatNumber(item?.quantity ?? 1, locale)}x{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  {formatNumber(item?.selectedAmount ?? 0, locale)}
                  {item?.unit}
                  {item?.sizeType === "DRINK" &&
                    (item?.sugarCount ?? 0) > 0 && (
                      <span className="text-primary">
                        {" "}
                        + {formatNumber(item?.sugarCount ?? 0, locale)}{" "}
                        {t("sugar")}
                      </span>
                    )}
                  {item?.isRawCookedToggle &&
                    ` • ${item?.isRaw ? t("raw") : t("cooked")}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-primary text-base leading-none font-black tabular-nums">
                  {formatNumber(item?.calories ?? 0, locale)}
                </p>
                <span className="text-[9px] font-bold tracking-tighter text-gray-600 uppercase">
                  {tAbout("kcal")}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(idx);
                }}
                className="flex size-8 items-center justify-center rounded-xl bg-rose-500/5 text-gray-600 transition-all hover:bg-rose-500/10 hover:text-rose-500 active:scale-90"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
