"use client";
import React from "react";
import {
  X,
  Zap,
  Share2,
  Heart,
  Send,
  MessageSquare,
  Copy,
  Flame,
  Award,
} from "lucide-react";
import MacroPieChart from "../Common/MacroPieChart";

interface ResultModalProps {
  item: any;
  onClose: () => void;
}

export default function ResultModal({ item, onClose }: ResultModalProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  if (!item) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const shareOptions = [
    {
      name: "X",
      icon: <Send className="size-4" />,
      color: "bg-white/5 text-white",
    },
    {
      name: "WA",
      icon: <MessageSquare className="size-4" />,
      color: "bg-[#25D366]/10 text-[#25D366]",
    },
    {
      name: "Copy",
      icon: <Copy className="size-4" />,
      color: "bg-white/5 text-white",
    },
  ];

  const getBadges = () => {
    const badges = [];
    if (item.protein > 20)
      badges.push({
        text: "High Protein",
        icon: <Award className="size-3" />,
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      });
    if (item.calories < 150)
      badges.push({
        text: "Light Option",
        icon: <Flame className="size-3" />,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      });
    if (item.carbs > 50)
      badges.push({
        text: "Energy Rich",
        icon: <Zap className="size-3" />,
        color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      });
    return badges;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative bg-[#09090b] w-full max-w-[440px] rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -left-24 size-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />

        {/* Header/Banner */}
        <div className="relative h-20 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center border-b border-white/5">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 size-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all z-20"
          >
            <X className="size-5" />
          </button>

          <div className="size-20 absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-[2rem] bg-zinc-900 border-4 border-[#09090b] flex items-center justify-center text-5xl shadow-2xl z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            {item.icon}
          </div>
        </div>

        <div className="p-8 pt-16 space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
              {item.name}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
              <p className="text-primary font-black text-xl" dir="rtl">
                {item.nameAr}
              </p>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {getBadges().map((badge, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${badge.color}`}
                >
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    Total Energy
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-primary tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      {item.calories}
                    </span>
                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest">
                      kcal
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Protein",
                      value: item.protein,
                      color: "var(--protein)",
                    },
                    {
                      label: "Carbs",
                      value: item.carbs,
                      color: "var(--carbs)",
                    },
                    { label: "Fat", value: item.fat, color: "var(--fat)" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                          {m.label}
                        </span>
                      </div>
                      <span
                        className="text-sm font-black tabular-nums"
                        style={{ color: m.color }}
                      >
                        {m.value}g
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center transform hover:scale-105 transition-transform duration-500">
                <MacroPieChart
                  protein={item.protein}
                  carbs={item.carbs}
                  fat={item.fat}
                  size={150}
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-4">
            <button className="size-16 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 group">
              <Share2 className="size-6 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 font-black rounded-3xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                isSaved
                  ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  : "bg-primary text-secondary shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:bg-primary/90 hover:-translate-y-1"
              }`}
            >
              <Heart className={`size-6 ${isSaved ? "fill-white" : ""}`} />
              <span className="text-sm tracking-widest font-black uppercase">
                {isSaved ? "SAVED!" : "SAVE TO DIARY"}
              </span>
            </button>
          </div>

          {/* Social Grid */}
          <div className="flex justify-center gap-4 py-2">
            {shareOptions.map((opt) => (
              <button
                key={opt.name}
                className={`${opt.color} size-12 rounded-2xl border border-transparent hover:border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 group`}
              >
                <div className="group-hover:scale-125 transition-transform">
                  {opt.icon}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
