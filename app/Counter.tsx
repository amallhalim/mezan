"use client";
import React from "react";
import useCount from "./useCount";

import { useTranslations } from "next-intl";

interface CounterProps {
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onReset?: () => void;
}

export default function Counter({
  count: propsCount,
  onIncrement,
  onDecrement,
  onReset,
}: CounterProps) {
  const t = useTranslations("Counter");
  const hook = useCount();

  const count = propsCount ?? hook.count;
  const increment = onIncrement ?? hook.increment;
  const decrement = onDecrement ?? hook.decrement;
  const reset = onReset ?? hook.reset;

  return (
    <div className="border-primary/20 mb-12 rounded-3xl border-2 bg-white/5 p-8 backdrop-blur-md">
      <h2 className="mb-4 text-2xl font-bold">{t("title")}</h2>
      <p className="mb-6 text-lg">{t("currentCount", { count })}</p>

      <div className="flex flex-wrap gap-4">
        <button
          className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-bold hover:opacity-90"
          onClick={increment}
        >
          {t("increment")}
        </button>
        <button
          className="rounded-xl bg-white/10 px-6 py-3 font-bold hover:bg-white/20"
          onClick={decrement}
        >
          {t("decrement")}
        </button>
        <button
          className="rounded-xl border border-red-500/30 bg-red-500/20 px-6 py-3 font-bold text-red-400 transition-all hover:bg-red-500/30"
          onClick={reset}
        >
          {t("reset")}
        </button>
      </div>
    </div>
  );
}
