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

import { Plate } from "@/app/store/usePlatesStore";

interface ResultModalProps {
  item: Plate;
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
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl duration-500">
      <div className="animate-in zoom-in-95 relative w-full max-w-[440px] overflow-hidden rounded-[3.5rem] border border-white/10 bg-[#09090b] shadow-[0_0_100px_rgba(16,185,129,0.1)] duration-500">
        {/* Animated Background Glow */}
        <div className="bg-primary/20 absolute -top-24 -left-24 size-64 animate-pulse rounded-full blur-[100px]" />

        {/* Header/Banner */}
        <div className="relative flex h-20 items-center justify-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition-all hover:scale-110 hover:bg-black/60"
          >
            <X className="size-5" />
          </button>

          <div className="absolute -bottom-10 left-1/2 z-10 flex size-20 -translate-x-1/2 rotate-3 transform items-center justify-center rounded-[2rem] border-4 border-[#09090b] bg-zinc-900 text-5xl shadow-2xl transition-transform duration-500 hover:rotate-0">
            {item.icon}
          </div>
        </div>

        <div className="space-y-8 p-8 pt-16">
          {/* Title Section */}
          <div className="space-y-2 text-center">
            <h2 className="text-4xl leading-none font-black tracking-tighter text-white">
              {item.name}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="to-primary/40 h-px w-8 bg-gradient-to-r from-transparent" />
              <p className="text-primary text-xl font-black" dir="rtl">
                {item.nameAr}
              </p>
              <span className="to-primary/40 h-px w-8 bg-gradient-to-l from-transparent" />
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {getBadges().map((badge, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-black tracking-widest uppercase ${badge.color}`}
                >
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="space-y-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-6">
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">
                    Total Energy
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary text-6xl font-black tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      {item.calories}
                    </span>
                    <span className="text-xs font-black tracking-widest text-gray-600 uppercase">
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
                      className="group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase transition-colors group-hover:text-white">
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

              <div className="flex transform justify-center transition-transform duration-500 hover:scale-105">
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
            <button className="group flex size-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90">
              <Share2 className="size-6 transition-transform group-hover:rotate-12" />
            </button>
            <button
              onClick={handleSave}
              className={`flex flex-1 items-center justify-center gap-3 rounded-3xl font-black transition-all active:scale-[0.98] ${
                isSaved
                  ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  : "bg-primary text-secondary hover:bg-primary/90 shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:-translate-y-1"
              }`}
            >
              <Heart className={`size-6 ${isSaved ? "fill-white" : ""}`} />
              <span className="text-sm font-black tracking-widest uppercase">
                {isSaved ? "SAVED!" : "SAVE TO DIARY"}
              </span>
            </button>
          </div>

          {/* Social Grid */}
          <div className="flex justify-center gap-4 py-2">
            {shareOptions.map((opt) => (
              <button
                key={opt.name}
                className={`${opt.color} group flex size-12 items-center justify-center rounded-2xl border border-transparent transition-all hover:-translate-y-1 hover:border-white/10 active:scale-95`}
              >
                <div className="transition-transform group-hover:scale-125">
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
