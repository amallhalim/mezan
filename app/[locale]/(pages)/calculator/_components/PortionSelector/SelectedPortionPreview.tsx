import React from "react";
import { Share2 } from "lucide-react";
import { getCalorieColor, getHealthInsight } from "@/app/lib/calculatorUtils";

interface SelectedPortionPreviewProps {
  quantity: number;
  sizeLabel: string;
  foodName: string;
  nameAr: string;
  totalAmount: number;
  unit: string;
  isRaw: boolean;
  calories: number;
  icon: string;
}

export default function SelectedPortionPreview({
  foodName,
  nameAr,
  totalAmount,
  unit,
  isRaw,
  calories,
  icon,
}: SelectedPortionPreviewProps) {
  const calorieColor = getCalorieColor(calories);
  const insight = getHealthInsight(calories);
  const InsightIcon = insight.icon;

  const handleShare = async () => {
    const text = `I'm eating ${totalAmount}${unit} of ${foodName} / ${nameAr} (${calories} kcal)! Tracked via MEZAN.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Meal - MEZAN",
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="animate-in zoom-in-95 group relative flex items-center justify-between rounded-[2rem] border border-white/10 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-md transition-all duration-300">
      <div className="from-primary/20 pointer-events-none absolute -inset-1 rounded-[2.1rem] bg-gradient-to-r to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-3xl shadow-inner transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-col">
            <h3 className="truncate text-xl leading-tight font-black text-white">
              {foodName}
            </h3>
            <h4
              className="text-primary/80 text-sm leading-none font-bold"
              dir="rtl"
            >
              {nameAr}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-2 py-0.5 ${insight.color} text-[8px] font-black tracking-widest uppercase`}
            >
              <InsightIcon className="size-3" /> {insight.text}
            </div>
            <p className="text-[9px] font-bold tracking-widest text-gray-500 uppercase opacity-70">
              {totalAmount}
              {unit} • {isRaw ? "RAW" : "COOKED"}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-5">
        <div className="text-right">
          <p
            className={`text-4xl font-black ${calorieColor} flex items-baseline gap-1 drop-shadow-sm`}
          >
            {calories}
            <span className="text-[10px] tracking-tighter text-gray-500 uppercase">
              KCAL
            </span>
          </p>
        </div>

        <button
          onClick={handleShare}
          className="hover:bg-primary hover:text-secondary flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 shadow-lg transition-all active:scale-90"
          title="Share Choice"
        >
          <Share2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
